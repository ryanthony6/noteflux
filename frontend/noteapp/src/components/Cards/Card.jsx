// Card.jsx
import React, { useEffect, useState } from "react";
import { MdDelete, MdOutlinePushPin } from "react-icons/md";
import moment from "moment";

const Card = ({
  title,
  date,
  content,
  isPinned,
  onDelete,
  onPinNote,
  onClick,
  isActive,
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-full p-4 hover:bg-slate-100 cursor-pointer 
  ${isActive ? "bg-slate-100" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-slate-500">
            {" "}
            {moment(date).format("Do MMM YYYY")}
          </span>
          <h6 className="text-xl font-bold">{title}</h6>
        </div>
        <div className="flex items-center gap-2">
          <MdOutlinePushPin
            className={`icon-btn ${
              isPinned ? "text-primary" : "text-slate-300"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onPinNote();
            }}
          />
          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          />
        </div>
      </div>
      <div
        className="text-xs text-slate-600 overflow-hidden text-ellipsis line-clamp-3"
        dangerouslySetInnerHTML={{
          __html:
            content && content.length > 30
              ? `${content.slice(0, 30)}...`
              : content,
        }}
      />
    </div>
  );
};

export default Card;
