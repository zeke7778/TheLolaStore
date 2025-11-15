import express from "express";
import upload from "../middleware/upload.js";  // <-- multer middleware
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

router.get("/", getProducts);
router.get("/:id", getProductById);

// ⬇️ Add "upload.single('image')" for product image upload
router.post("/", protect, admin, upload.single("image"), createProduct);

// ⬇️ Also for updating a product image
router.put("/:id", protect, admin, upload.single("image"), updateProduct);

router.delete("/:id", protect, admin, deleteProduct);

export default router;
