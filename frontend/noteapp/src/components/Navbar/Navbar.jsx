import React, { useState } from "react";
import ProfileCard from "../Cards/ProfileCard";
import { useNavigate } from "react-router-dom";
import Searchbar from "../Searchbars/Searchbar";

const Navbar = ({ userInfo, onSearch, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearch(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="bg-white flex items-center justify-between px-7 lg:px-10 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">NoteFlux</h2>

      <Searchbar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileCard userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
