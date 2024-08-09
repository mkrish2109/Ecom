const express = require("express");
const {
  authMiddleware,
  isAdminMiddleware,
} = require("../middlewares/authMiddleware");
const { getUser, getAllUsers } = require("../controllers/usersControllers");
const userRouter = express.Router();

userRouter.get("/", authMiddleware, isAdminMiddleware, getAllUsers);
userRouter.get("/getUser", authMiddleware, getUser);

module.exports = userRouter;
