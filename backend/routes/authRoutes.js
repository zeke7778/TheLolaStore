import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// -----------------------------
// ⭐ PUBLIC AUTH ROUTES
// -----------------------------
router.post("/register", registerUser);
router.post("/login", loginUser);

// -----------------------------
// ⭐ PROTECTED USER ROUTES
// -----------------------------
router.get("/me", protect, getUserProfile);

export default router;
