// routes/cartRoutes.js
const express = require("express");
const cartRouter = express.Router();
const {
  getUserCart,
  addToCart,
  updateCartItem,
  removeItemFromCart,
  clearCart,
} = require("../controllers/cartController");
const { authMiddleware } = require("../middlewares/authMiddleware");

// Middleware to protect routes (assuming you have auth middleware)
// const { authenticateUser } = require("../middlewares/authMiddleware");

// cartRouter.use(authenticateUser);

cartRouter.get("/",authMiddleware, getUserCart);
cartRouter.post("/",authMiddleware, addToCart);
cartRouter.patch("/:productId",authMiddleware, updateCartItem);
cartRouter.delete("/item/:productId",authMiddleware, removeItemFromCart);
cartRouter.delete("/",authMiddleware, clearCart);

module.exports = cartRouter;
