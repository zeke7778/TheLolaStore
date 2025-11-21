import express from "express";
import upload from "../middleware/upload.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// -----------------------------
// ⭐ PUBLIC ROUTES
// -----------------------------
router.get("/", getProducts);
router.get("/:id", getProductById);

// -----------------------------
// ⭐ ADMIN ONLY ROUTES
// -----------------------------
// Create product (supports image)
router.post(
  "/",
  protect,
  admin,
  upload.fields([
    { name: "image", maxCount: 1 },      // main image
    { name: "images", maxCount: 5 },     // extra images
  ]),
  createProduct
);

// Update product (supports image change)
router.put(
  "/:id",
  protect,
  admin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  updateProduct
);

// Delete product
router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);

export default router;
