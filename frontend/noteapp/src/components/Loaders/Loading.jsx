import React from "react";

const Loading = () => {
  return (
    /* From Uiverse.io by mahendrameghwal */
    <div className="min-h-screen gap-x-2 flex justify-center items-center">
      <div className="w-5 bg-[#2a2a2a] h-5 rounded-full animate-bounce"></div>
      <div className="w-5 h-5 bg-[#3d3d3d] rounded-full animate-bounce"></div>
      <div className="w-5 h-5 bg-primary rounded-full animate-bounce"></div>
    </div>
  );
};

export default Loading;
