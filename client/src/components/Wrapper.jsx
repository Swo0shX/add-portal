import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

// const Wrapper = ({ title }) => {
//   return (
//     <div className="p-4 bg-slate-800 min-h-fit rounded-lg text-gray-300 gap-2 overflow-hidden">
//       <span className="font-bold">{title}</span>
//     </div>
//   );
// };

const Wrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: "rgb(30 41 59)",
  borderRadius: "0.75rem",
}));

export default Wrapper;
