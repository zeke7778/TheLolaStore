import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Load full user including isAdmin
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Attach to req so admin middleware can use it
      req.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,   // ⭐ IMPORTANT
      };

      return next();
    }

    return res.status(401).json({ message: "Not authorized, no token provided" });
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};
