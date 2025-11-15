import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    if (user) {
      res.json({
  _id: user._id,
  name: user.name,
  email: user.email,
  isAdmin: user.isAdmin, // ✅ add this
  token: generateToken(user._id, user.isAdmin),
});
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
  _id: user._id,
  name: user.name,
  email: user.email,
  isAdmin: user.isAdmin, // ✅ add this
  token: generateToken(user._id, user.isAdmin),
});
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Logged In User Info
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
