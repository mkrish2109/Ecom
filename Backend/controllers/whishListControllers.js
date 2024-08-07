const Product = require("../models/Product");
const WhishList = require("../models/WhishList");
const { sendErrorResponse } = require("../utils/serverUtils");

const getAllWhishList = async (req, res) => {
  try {
    const whishList = await WhishList.find(req.user.userId);
    console.log("whishList", whishList);
    const products = await Promise.all(
      whishList.map((item) => Product.findById({ _id: item.productId }))
    );

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const addWhishList = async (req, res) => {
  try {
    const { productId, isAdded } = req.body;
    console.log(req.user.userId);
    const result = await WhishList.create({
      user: req.user.userId,
      productId,
      isAdded,
    });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};
const deleteWhishList = async (req, res) => {
  try {
    const result = await WhishList.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = { getAllWhishList, addWhishList, deleteWhishList };
