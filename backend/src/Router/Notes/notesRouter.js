// routes/note.routes.js
const express = require("express");
const noteController = require("../../Controllers/Notes/notesController");

const noteRouter = express.Router();

noteRouter.post("/", noteController.createNote);
noteRouter.get("/:userId", noteController.getNotes);
noteRouter.delete("/:id", noteController.deleteNote);
noteRouter.put("/:id", noteController.updateNote);
noteRouter.put("/archive/:id", noteController.archiveNote);
noteRouter.put("/unarchive/:id", noteController.unarchiveNote);
noteRouter.get("/archives", noteController.getArchivedNotes);

module.exports = noteRouter;
