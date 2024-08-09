const Order = require("../models/Order");
const Product = require("../models/Product");
const {
  sendErrorResponse,
  sendSuccessResponse,
  sendDataResponse,
} = require("../utils/serverUtils");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    sendDataResponse(res, orders);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getSingleOrder = async (req, res) => {
  res.send("getSingleOrder");
};

const getCurrentUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId });
    sendDataResponse(res, orders);
  } catch (error) {
    return sendErrorResponse(res, error.message);
  }
};

const createOrder = async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || !cartItems.length) {
      return sendErrorResponse(res, "Cart items are required!");
    }

    let orderItems = [];
    let tax = 0;
    let deliveryCharges = 0;
    let subtotal = 0;

    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return sendErrorResponse(res, "No such cart item exists!");
      }

      const singleOrderItem = {
        name: product.name,
        image: product.images[0],
        price: product.price,
        qty: item.qty,
        product: product._id,
      };

      orderItems = [...orderItems, singleOrderItem];

      tax += (product.taxRate * product.price) / 100;
      deliveryCharges += product.deliveryCharges;
      subtotal += product.price;
    }

    const total = subtotal + tax + deliveryCharges;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: "inr",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const order = await Order.create({
      tax,
      deliveryCharges,
      subtotal,
      total,
      orderItems,
      user: req.user.userId,
      clientSecret: paymentIntent.client_secret,
    });

    res.status(200).json({
      success: true,
      order: order,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentIntentId } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return sendErrorResponse(res, "No such order found.");
    }

    await Order.findByIdAndUpdate(id, { paymentIntentId, status: "paid" });
    sendSuccessResponse(res, "Order updated successfully.");
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return sendErrorResponse(res, "No such order found.");
    }

    if (order.status === "paid") {
      if (status === "pending" || status === "failed") {
        return sendErrorResponse(res, "Invalid status");
      }
    }

    await Order.findByIdAndUpdate(id, { status });
    sendSuccessResponse(res, "Order updated successfully.");
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
  updateOrderStatus,
};
