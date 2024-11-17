const express = require("express");
const noteRouter = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  addNote,
  editNote,
  getNotes,
  deleteNote,
  pinNote,
  searchNotes,
} = require("../controllers/NoteController");

// POST /api/users/register - Register a new user
noteRouter.post("/add-note", verifyToken, addNote);

noteRouter.put("/edit-note/:noteId", verifyToken, editNote);

noteRouter.get("/get-all-notes", verifyToken, getNotes);

noteRouter.delete("/delete-note/:noteId", verifyToken, deleteNote);

noteRouter.put("/update-pinned-note/:noteId", verifyToken, pinNote);

noteRouter.get("/search-notes/", verifyToken, searchNotes);

module.exports = noteRouter;
