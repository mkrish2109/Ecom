const User = require("../models/User");
const { sendDataResponse, sendErrorResponse } = require("../utils/serverUtils");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    sendDataResponse(res, users);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getUser = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = { getAllUsers, getUser };
