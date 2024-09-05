const Product = require("../models/Product");
const WhishList = require("../models/WhishList");
const { sendErrorResponse } = require("../utils/serverUtils");

const getAllWhishList = async (req, res) => {
  try {
    const whishList = await WhishList.find({ user: req.user.userId });

    const productsData = [];

    for (const productId of whishList) {
      const product = await Product.findById(productId.productId);

      productsData.push(product);
    }

    res.status(200).json({ success: true, data: productsData });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const addWhishList = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const result = await WhishList.create({
      user: req.user.userId,
      productId: id,
      isAdded: true,
    });
    res
      .status(200)
      .json({ success: true, data: result, msg: "product Added in Whishlist" });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};
const deleteWhishList = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await WhishList.findOneAndDelete({ productId: id });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = { getAllWhishList, addWhishList, deleteWhishList };
