const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { getUser } = require("../controllers/usersControllers");
const {
  getAllWhishList,
  deleteWhishList,
  addWhishList,
} = require("../controllers/whishListControllers");
const whishListRouter = express.Router();

whishListRouter.get("/", authMiddleware, getAllWhishList);
whishListRouter.post("/:id", authMiddleware, addWhishList);
whishListRouter.delete("/:id", authMiddleware, deleteWhishList);

module.exports = whishListRouter;
