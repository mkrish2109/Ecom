const { sendErrorResponse } = require("../utils/serverUtils");
const { verifyJWT } = require("../utils/tokenUtils");

const authMiddleware = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return sendErrorResponse(res, "Token not provided.", 401);
    }

    const tokenUser = verifyJWT(accessToken);

    req.user = tokenUser;
    if (!req.user) {
      return sendErrorResponse(res, "Invalid token.", 401);
    }
    
    next();
  } catch (error) {
    sendErrorResponse(res, "Authentication failed.", 401);
  }
};

const isAdminMiddleware = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return sendErrorResponse(res, "Forbidden.", 403);
    }
    next();
  } catch (error) {
    sendErrorResponse(res, "Something went wrong.", 500);
  }
};

module.exports = { authMiddleware, isAdminMiddleware };
