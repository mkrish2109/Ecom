const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { sendErrorResponse } = require("../utils/serverUtils");
const mongoose = require("mongoose");

const getUserCart = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return sendErrorResponse(res, "User ID not provided", 400);
    }
 
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    res.status(200).json({ success: true, data: cart || { items: [] } });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const addToCart = async (req, res) => {
  // Add a product to the cart
  console.log("Adding to cart");
  console.log(req.body);
  
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return sendErrorResponse(res, "Invalid product or quantity", 400);
    }

    const product = await Product.findById(productId);
    if (!product) {
      return sendErrorResponse(res, "Product not found", 404);
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ userId }).populate("items.productId");

    res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const updateCartItem = async (req, res) => {
  console.log("Updating cart item");
  
  try {
    const userId = req.user.userId;
    const { productId } = req.params;
    const  {quantity } = req.body;

    if (!productId || typeof quantity !== "number") {
      return sendErrorResponse(res, "Invalid input", 400);
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return sendErrorResponse(res, "Cart not found", 404);
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return sendErrorResponse(res, "Item not found in cart", 404);
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ userId }).populate("items.productId");

    res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const removeItemFromCart  = async (req, res) => {
  console.log("Removing item from cart");
  console.log(req.params);
  
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the product from the cart
    const updatedItems = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    cart.items = updatedItems;
    await cart.save();

    return res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



const clearCart = async (req, res) => {
  // Clear the cart for the user
  console.log("Clearing cart");
  try {
    const userId = req.user.userId;

    await Cart.findOneAndDelete({ userId });

    res.status(200).json({ success: true, msg: "Cart cleared successfully!" });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  getUserCart,
  addToCart,
  updateCartItem,
  removeItemFromCart,
  clearCart,
};
