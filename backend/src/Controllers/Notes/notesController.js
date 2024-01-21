// controllers/note.controller.js
const Notes = require("../../Models/NotesModel/notesModel");
const Categories = require("../../Models/CategoryModel/categoryModel");

const notesController = () => {};

notesController.createNote = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const newNote = await Notes.create({ title, content, userId });
    res.status(201).json({ note: newNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating Notes",
      error: "Internal Server Error",
    });
  }
};

notesController.getNotes = async (req, res) => {
  try {
    if (!req?.params?.userId) {
      return res.status(400).json({ message: "User id is required" });
    }
    const { userId } = req.params;
    const notes = await Notes.findAll({
      include: Categories,
      where: { userId },
    });

    res.status(200).json({ notes, message: "Notes retrieved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

notesController.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.destroy({ where: { id } });
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

notesController.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, categories: newCategories } = req.body;

    const note = await Notes.findByPk(id);
    await note.update({ title, content });
    const categories = await note.getCategories();
    const categoriesId = categories.map((category) => category.id);
    const categoriesToAdd = newCategories.filter(
      (category) => !categoriesId.includes(category)
    );
    const categoriesToRemove = categoriesId.filter(
      (category) => !newCategories.includes(category)
    );
    await note.addCategories(categoriesToAdd);
    await note.removeCategories(categoriesToRemove);
    res.status(200).json({ message: "Note updated successfully", note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

notesController.archiveNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.update(
      { archived: true },
      { where: { id }, returning: true }
    );
    res.status(200).json(note[1][0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

notesController.unarchiveNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.update(
      { archived: false },
      { where: { id }, returning: true }
    );

    res.status(200).json(note[1][0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

notesController.getArchivedNotes = async (req, res) => {
  try {
    const userId = req.params.userId;
    const notes = await Notes.findAll({
      where: { archived: true, userId: userId },
    });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

notesController.addCategory = async (req, res) => {
  try {
    const { noteId, categoryId } = req.body;
    const note = await Notes.findByPk(noteId);
    const category = await Categories.findByPk(categoryId);
    await note.addCategory(category);
    res.status(200).json({ message: "Category added to note successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

notesController.removeCategory = async (req, res) => {
  try {
    const { noteId, categoryId } = req.body;
    const note = await Notes.findByPk(noteId);
    const category = await Categories.findByPk(categoryId);
    await note.removeCategory(category);
    res
      .status(200)
      .json({ message: "Category removed from note successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = notesController;
