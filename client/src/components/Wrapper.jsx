import React from "react";

const Wrapper = ({ title }) => {
  return (
    <div className="p-4 bg-slate-800 w-1/4 rounded-lg text-gray-300 gap-2">
      <span className="font-bold">{title}</span>
    </div>
  );
};

export default Wrapper;
