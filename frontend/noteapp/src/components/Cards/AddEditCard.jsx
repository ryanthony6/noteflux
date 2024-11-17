import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-hot-toast";

const AddEditCard = ({ noteData, type, getAllNotes, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  const showToast = (message, type) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };
  // Function to add a new note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/api/notes/add-note", {
        title,
        content,
      });
      if (response.data && response.data.note) {
        getAllNotes(); // Refresh notes list
        onClose();

        showToast("Note added successfully!", "success"); // Trigger success toast
      }
    } catch (error) {
      setError("Failed to add note. Please try again.");
      showToast("Failed to add note. Please try again.", "error"); // Trigger error toast
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(
        `/api/notes/edit-note/${noteId}`,
        {
          title,
          content,
        }
      );
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
        showToast("Note updated successfully!", "success");
      }
    } catch (error) {
      setError("Failed to update note. Please try again.");
      showToast("Failed to update note. Please try again.", "error");
    }
  };
  // Function to handle adding or editing a note
  const handleAddNote = () => {
    if (!title) {
      setError("Please enter a title");
    } else if (!content) {
      setError("Please enter content");
    } else {
      setError("");
      if (type === "edit") {
        editNote();
      } else {
        addNewNote();
      }
    }
  };

  useEffect(() => {
    if (type === "edit" && noteData) {
      setTitle(noteData.title || "");
      setContent(noteData.content || "");
    } else if (type === "add") {
      setTitle("");
      setContent("");
    }
  }, [noteData, type]);

  return (
    <>
      <div className="md:flex md:flex-col w-full">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Title of your note "
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          required
        />
      </div>
      <div className="w-full h-full flex flex-col gap-2">
        <label className="input-label">Content</label>
        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Write something..."
          className="h-80 "
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link"],
              ["clean"],
            ],
          }}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "edit" ? "Update" : "Add"}
      </button>
    </>
  );
};

export default AddEditCard;
