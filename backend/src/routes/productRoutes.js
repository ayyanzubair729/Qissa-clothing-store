import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.js";
import { validate } from "../middlewares/validate.js";
import { productSchema } from "../validations/product.validation.js";

const router = express.Router();

// Public Routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin Routes
router.post("/", protect, adminOnly, validate(productSchema), createProduct);

router.put("/:id", protect, adminOnly, validate(productSchema), updateProduct);

router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;