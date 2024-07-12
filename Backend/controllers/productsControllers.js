const Product = require("../models/Product");
const { sendErrorResponse } = require("../utils/serverUtils");

const getAllProducts = async (req, res) => {
  try {
    // Filters
    const products = await Product.find();
    res.status(200).send({ success: true, data: products });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const product = await Product.findById(id);

    if (!product) {
      return sendErrorResponse(res, "No such product found.", 404);
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const addProduct = async (req, res) => {
  try {
    const body = req.body;
    const files = req.files.images;

    console.log(body);

    const images = [];

    if (Array.isArray(files)) {
      for (const img of files) {
        const fileName = Date.now() + "-" + img.name;
        await img.mv("uploads/" + fileName);
        images.push("http://localhost:5000/uploads/" + fileName);
      }
    } else {
      const fileName = Date.now() + "-" + files.name;
      await files.mv("uploads/" + fileName);
      images.push("http://localhost:5000/uploads/" + fileName);
    }

    const product = await Product.create({ ...body, images });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
