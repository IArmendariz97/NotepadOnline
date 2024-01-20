const Categories = require("../../Models/CategoryModel/categoryModel");

const categoryController = () => {};

categoryController.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = await Categories.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating Categories",
      error: "Internal Server Error",
    });
  }
};

categoryController.getCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll();
    res
      .status(200)
      .json({ categories, message: "Categories retrieved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

categoryController.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.destroy({ where: { id } });
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = categoryController;
