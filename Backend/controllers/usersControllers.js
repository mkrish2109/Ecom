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

module.exports = { getUser };
