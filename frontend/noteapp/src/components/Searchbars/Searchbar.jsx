// Searchbar.jsx
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Searchbar = ({ value, onChange, onClearSearch }) => {

  return (
    <div className="w-80 flex items-center px-4 bg-slate-100">
      <input
        type="text"
        placeholder="Search notes..."
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="text-xl text-slate-500 cursor-pointer hover:text-black-700 mr-3"
          onClick={onClearSearch}
        />
      )}
      <FaMagnifyingGlass className="text-slate-400 cursor-pointer hover:text-black-700" />
    </div>
  );
};

export default Searchbar;