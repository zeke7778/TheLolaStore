export const admin = (req, res, next) => {
  try {
    // Check if user exists AND is admin
    if (req.user && req.user.isAdmin) {
      return next();
    }

    return res.status(403).json({ message: "Access denied — Admin only" });
  } catch (error) {
    console.error("Admin Middleware Error:", error);
    return res.status(500).json({ message: "Server error in admin check" });
  }
};
