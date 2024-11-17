import express from "express";

import {
  listOrders,
  placeOrder,
  userOrders,
  verifyOrder,
  updateStatus,
} from "../controllers/order-controller.js";

import auth from "../middleware/auth.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);

orderRouter.post("/verify", verifyOrder);

orderRouter.post("/userorders", authMiddleware, userOrders);

orderRouter.get("/list", listOrders);

orderRouter.post("/status", updateStatus);

export default orderRouter;
