const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { getUser } = require("../controllers/usersControllers");
const userRouter = express.Router();

userRouter.get("/getUser", authMiddleware, getUser);

module.exports = userRouter;
