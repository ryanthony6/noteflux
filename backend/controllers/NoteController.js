const Note = require("../models/Note");
const { JSDOM } = require('jsdom');
const DOMPurify = require('dompurify')(new JSDOM().window);

const addNote = async (req, res) => {
  const { title, content } = req.body;
  const { user } = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  const sanitizedContent = DOMPurify.sanitize(content); 

  try {
    const note = await Note.create({
      title,
      content: sanitizedContent,
      userId: user._id,
    });
    return res.status(201).json({ error: false, message: "Note created successfully", note });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
};

const editNote = async (req, res) => {
  const { title, content} = req.body;
  const { user } = req.user;
  const { noteId } = req.params;

  if (!title && !content) {
    return res.status(400).json({ error: true, message: "Nothing to update" });
  }

  try {
    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId: user._id },
      { title, content }
    );

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    await note.save();

    return res
      .status(200)
      .json({ error: false, message: "Note updated successfully", note });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
};

const getNotes = async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
    return res.status(200).json({
      error: false,
      message: "Notes fetched successfully",
      notes,
    });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
};

const deleteNote = async (req, res) => {
  const { user } = req.user;
  const { noteId } = req.params;

  try {
    const note = await Note.findOneAndDelete({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }
    return res
      .status(200)
      .json({ error: false, message: "Note deleted successfully", note });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
};

const pinNote = async (req, res) => {
  const { user } = req.user;
  const { noteId } = req.params;
  const { isPinned } = req.body;

  try {
    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId: user._id },
      { $set: { isPinned: isPinned } },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    return res.status(200).json({
      error: false,
      message: isPinned
        ? "Note pinned successfully"
        : "Note unpinned successfully",
      notes: note,
    });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
};

const searchNotes = async (req, res) => {
  const { user } = req.user;
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: true, message: "Query is required" });
  }

  try {
    const matchingNotes = await Note.find({
      userId: user._id,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    });

    return res.status(200).json({
      error: false,

      notes: matchingNotes,
      message: "Notes fetched successfully",
    });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
};

module.exports = {
  addNote,
  editNote,
  getNotes,
  deleteNote,
  pinNote,
  searchNotes,
};
