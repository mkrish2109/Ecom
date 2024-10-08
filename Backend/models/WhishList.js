const mongoose = require("mongoose");

const whishListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: [String],
    required: true,
  },
  isAdded: { type: Boolean, default: false },
});

module.exports = mongoose.model("WhishList", whishListSchema);
