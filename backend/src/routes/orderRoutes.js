import express from "express";

import {
  checkoutOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.js";
import { validate } from "../middlewares/validate.js";
import {
  checkoutSchema,
  updateOrderStatusSchema,
} from "../validations/order.validation.js";

const router = express.Router();

router.use(protect);

router.post("/checkout", validate(checkoutSchema), checkoutOrder);

router.get("/my", getMyOrders);

router.get("/:id", getOrderById);

router.get("/", adminOnly, getAllOrders);

router.put("/:id/status", adminOnly, validate(updateOrderStatusSchema), updateOrderStatus);

export default router;
