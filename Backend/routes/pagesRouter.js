const express = require("express");
const {
  getAllPages,
  getSinglePage,
  addPage,
  updatePage,
  deletePage,
} = require("../controllers/pagesControllers");
const {
  authMiddleware,
  isAdminMiddleware,
} = require("../middlewares/authMiddleware");
const pagesRouter = express.Router();

pagesRouter.get("/", getAllPages);
pagesRouter.get("/:id", getSinglePage);
pagesRouter.post("/", authMiddleware, isAdminMiddleware, addPage);
pagesRouter.patch("/:id", authMiddleware, isAdminMiddleware, updatePage);
pagesRouter.delete("/:id", authMiddleware, isAdminMiddleware, deletePage);

module.exports = pagesRouter;
