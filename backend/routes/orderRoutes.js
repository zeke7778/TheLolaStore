import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  getMyOrders ,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// -----------------------------
// ⭐ PUBLIC: PLACE ORDER
// -----------------------------
router.post("/", createOrder);

// -----------------------------
// ⭐ ADMIN: VIEW ALL ORDERS
// -----------------------------
router.get("/", protect, admin, getOrders);

// -----------------------------
// ⭐ ADMIN: UPDATE ORDER STATUS
// -----------------------------
router.put("/:id", protect, admin, updateOrderStatus);

router.get("/my", protect, getMyOrders);

export default router;
