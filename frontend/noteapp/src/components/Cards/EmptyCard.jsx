import React from "react";

const EmptyCard = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-2">
      <img src="/images/empty.svg" alt="empty" loading="lazy" height={128} width={128}/>
      <h1 className="text-2xl font-bold">Start Writing your note</h1>
    </div>
  );
};

export default EmptyCard;
