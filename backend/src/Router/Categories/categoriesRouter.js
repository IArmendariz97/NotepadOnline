const express = require("express");
const categoryController = require("../../Controllers/Categories/CategoryController");

const categoryRouter = express.Router();

categoryRouter.post("/", categoryController.createCategory);
categoryRouter.get("/", categoryController.getCategories);
categoryRouter.delete("/:id", categoryController.deleteCategory);

module.exports = categoryRouter;
