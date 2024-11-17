import React, { memo } from "react";
import { getInitials } from "../../utils/helper";
import { BiLogOutCircle } from "react-icons/bi";

const Sidebar = memo(({ userInfo, onLogout }) => {
  return (
    userInfo && (
      <div className="hidden md:flex md:flex-col items-center justify-between bg-primary p-4 rounded-br-3xl rounded-tr-3xl">
        <div className="w-8 h-8 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 text-sm">
          {getInitials(userInfo.name)}
        </div>
        <BiLogOutCircle
          className="text-3xl text-light cursor-pointer"
          onClick={onLogout}
        />
      </div>
    )
  );
});

export default Sidebar;
