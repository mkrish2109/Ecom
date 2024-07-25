const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const pageSchema = new mongoose.Schema({
  name: { type: String, require: true },
  carouselImages: {
    type: [String],
    validate: {
      validator: (value) => {
        if (!value || !value.length) {
          return false;
        }
        return true;
      },
      message: "At least one image is required!",
    },
  },
  categories: {
    type: [categorySchema],
    validate: {
      validator: (value) => {
        if (!value || !value.length) {
          return false;
        }
        return true;
      },
      message: "At least one category is required!",
    },
  },
});

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
