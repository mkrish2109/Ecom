const express = require("express");
const ordersRouter = express.Router();
const {
  createOrder,
  getAllOrders,
  getCurrentUserOrders,
  getSingleOrder,
  updateOrder,
  updateOrderStatus,
} = require("../controllers/ordersControllersRevised");
const {
  authMiddleware,
  isAdminMiddleware,
} = require("../middlewares/authMiddleware");

ordersRouter.get("/", authMiddleware, isAdminMiddleware, getAllOrders);
ordersRouter.post("/", authMiddleware, createOrder);
ordersRouter.get("/showAllMyOrders", authMiddleware, getCurrentUserOrders);
ordersRouter.patch("/updateStatus/:id", authMiddleware, updateOrderStatus);
ordersRouter.get("/:id", authMiddleware, getSingleOrder);
ordersRouter.patch("/:id", authMiddleware, updateOrder);

module.exports = ordersRouter;
