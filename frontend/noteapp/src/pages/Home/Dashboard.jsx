import React, { useEffect, useState } from "react";
import { MdAdd, MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Card from "../../components/Cards/Card";
import Searchbar from "../../components/Searchbars/Searchbar";
import EmptyCard from "../../components/Cards/EmptyCard";
import AddEditCard from "../../components/Cards/AddEditCard";
import Sidebar from "../../components/Sidebars/Sidebar";
import Loader from "../../components/Loaders/Loading";
import { toast, Toaster } from "react-hot-toast";
import useToggleView from "../../hooks/useToggleView";

const Dashboard = () => {
  const [openEditModal, setOpenEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [allNotes, setAllNotes] = useState([]);
  const {
    isMobileView,
    isShowingAddEdit,
    toggleAddEditView,
    closeAddEditView,
  } = useToggleView();
  const [userInfo, setUserInfo] = useState(null);
  const [selectedCard, setSelectedCard] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // Fetch user information
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/users/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      onSearch(query);
    } else {
      onClearSearch();
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    getAllNotes();
  };

  // Fetch all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/api/notes/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  // Show Add/Edit Note Card
  const handleSelectCard = (noteDetails) => {
    setSelectedCard(noteDetails); // Set the selected card
    setOpenEditModal({ isShown: true, type: "edit", data: noteDetails });
  };

  // Function to delete a note
  const handleDeleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(
        `/api/notes/delete-note/${noteId}`
      );
      if (response.status === 200) {
        setOpenEditModal({ isShown: false, type: "edit", data: null });
        setSelectedCard(null);
        getAllNotes(); // Refresh the notes list

        // Show custom red toast with trash icon
        toast.custom(
          (t) => (
            <div
              className={`flex items-center bg-white p-3 text-white rounded-lg shadow-lg ${
                t.visible ? "animate-enter" : "animate-leave"
              }`}
            >
              <MdDelete className="text-2xl mr-2 text-red-500" />
              <div>
                <p className="text-black">Note deleted successfully</p>
              </div>
            </div>
          ),
          { duration: 3000 } // Optional: Set duration for how long the toast stays
        );
      }
    } catch (error) {
      console.error("Failed to delete note:", error);

      // Show error toast
      toast.error("Failed to delete note. Please try again.");
    }
  };

  const updateIsPinned = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.put(
        `/api/notes/update-pinned-note/${noteId}`,
        {
          isPinned: !data.isPinned,
        }
      );
      if (response.data && response.data.notes) {
        const message = data.isPinned
          ? "Note unpinned successfully!"
          : "Note pinned successfully!";
        toast.success(message); // Show appropriate toast message
        getAllNotes();
      }
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  const handleLogOut = async () => {
    try {
      await axiosInstance.post("/api/users/logout");
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const onSearch = async (query) => {
    try {
      const response = await axiosInstance.get("/api/notes/search-notes", {
        params: {
          query: query,
        },
      });
      if (response.data && response.data.notes) {
        setOpenEditModal({ isShown: false, type: "edit", data: null });
        setSelectedCard(null);

        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getUserInfo();
      await getAllNotes();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <Toaster />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid md:grid-cols-[0.1fr_2fr_3fr] gap-2 bg-white w-full h-screen overflow-hidden">
          {/* LEFT: Sidebar */}
          {userInfo && <Sidebar userInfo={userInfo} onLogout={handleLogOut} />}

          {/* MIDDLE MENU: Note Cards */}
          <div className="flex flex-col items-center px-0 space-y-5 overflow-hidden relative md:border rounded-lg m-5">
            {/* Add Button Inside Card Container */}
            <button
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-primary absolute right-5 md:right-6 bottom-6 md:bottom-4"
              onClick={() => {
                setSelectedCard(null);
                setOpenEditModal({ isShown: true, type: "add", data: null });
              }}
            >
              <MdAdd className="text-[24px] md:text-[32px] text-white" />
            </button>

            <Searchbar
              value={searchQuery}
              onChange={handleSearch}
              onClearSearch={onClearSearch}
            />
            <div className="overflow-y-auto w-full">
              {/* Note Cards */}
              {allNotes.map((note) => (
                <Card
                  key={note._id}
                  title={note.title}
                  date={note.createdOn}
                  content={note.content}
                  isPinned={note.isPinned}
                  onDelete={() => handleDeleteNote(note)}
                  onPinNote={() => updateIsPinned(note)}
                  onClick={() => handleSelectCard(note)} // Select card on click
                  isActive={selectedCard?._id === note._id}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Add/Edit Note Form or Empty Card */}
          <div className="hidden md:flex flex-col justify-start items-center p-4 rounded-lg m-5 ml-0 space-y-2 overflow-hidden border">
            {openEditModal.isShown ? (
              <AddEditCard
                type={openEditModal.type}
                noteData={openEditModal.data}
                onClose={() =>
                  setOpenEditModal({
                    isShown: false,
                    type: "add",
                    data: "null",
                  })
                }
                getAllNotes={getAllNotes}
              />
            ) : (
              <EmptyCard />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
