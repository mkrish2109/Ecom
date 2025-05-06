const express = require("express");
const {
  register,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/authControllers");
const {authMiddleware} = require("../middlewares/authMiddleware");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/login", login);
authRouter.get("/logout", authMiddleware, logout);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);

module.exports = authRouter;
