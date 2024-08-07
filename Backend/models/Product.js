const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, trim: true, minLength: 2, required: true },
  desc: { type: String, trim: true, maxLength: 500 },
  price: { type: Number, min: 0, required: true },
  taxRate: { type: Number, min: 0, required: true },
  deliveryCharges: { type: Number, min: 0, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  images: {
    type: [String],
    validate: {
      validator: (images) => {
        if (images.length > 0) {
          return true;
        } else {
          return false;
        }
      },
      message: "At least one image is required!",
    },
  },
  category: {
    type: String,

    required: true,
  },
  gender: { type: String, required: true },
  stock: { type: Number, requried: true },
  sizes: {
    type: [String],
    validate: {
      validator: (sizes) => {
        const acceptedSizes = ["xs", "s", "m", "l", "xl", "xxl", "xxxl"];
        for (const s of sizes) {
          const hasSize = acceptedSizes.includes(s);
          if (!hasSize) {
            return false;
          }
        }
        return true;
      },
      message: (props) => {
        return `${props.value} does not have valid sizes!`;
      },
    },
    required: true,
  },
  colors: {
    type: [String],
    validate: {
      validator: (colors) => {
        const acceptedColors = [
          "red",
          "yellow",
          "blue",
          "purple",
          "green",
          "orange",
          "crimson",
          "turquoise",
          "lavender",
          "navy",
          "black",
        ];

        for (const c of colors) {
          const hasColor = acceptedColors.includes(c);
          if (!hasColor) {
            return false;
          }
        }
        return true;
      },
      message: (props) => {
        return `${props.value} does not have valid colors!`;
      },
    },
    required: true,
  },
  isTrending: { type: Boolean, default: false },
  userId: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
