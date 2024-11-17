import React from "react";
import { useNavigate, Link } from "react-router-dom";
import useScrollPosition from "../../hooks/useScrollPosition";

const HomeNavbar = () => {
  const navigate = useNavigate();
  const isScrolled = useScrollPosition();

  const onLogout = () => {
    navigate("/login");
  };

  return (
    <nav
      className={`top-0 left-0 w-full flex items-center justify-center px-8 lg:px-20 py-3 md:py-4 z-10 fixed ${
        isScrolled ? "bg-white border-b border-slate-300" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="text-xl lg:text-xl font-medium text-black">
          NoteFlux
        </Link>
        <div>
          <button
            className="bg-primary text-sm text-white font-medium px-3 py-[6px] md:py-[5.5px] md:px-3 rounded-md shadow-sm hover:bg-white hover:text-primary hover:outline transition-all"
            onClick={onLogout}
          >
            Have an Account?
          </button>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
