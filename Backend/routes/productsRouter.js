const express = require("express");
const productsRouter = express.Router();
const {
  authMiddleware,
  isAdminMiddleware,
} = require("../middlewares/authMiddleware");

const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsControllers");
const { getSingleProduct } = require("../controllers/productsControllers");

productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getSingleProduct);
productsRouter.post("/", authMiddleware, isAdminMiddleware, addProduct);
productsRouter.patch("/:id", authMiddleware, isAdminMiddleware, updateProduct);
productsRouter.delete("/:id", authMiddleware, isAdminMiddleware, deleteProduct);

module.exports = productsRouter;
