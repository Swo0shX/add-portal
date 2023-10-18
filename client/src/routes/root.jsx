import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import { useSelector } from "react-redux";

export default function Root() {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const userId = useSelector((state) => state.global.userId);
  return (
    // <>
    //   <Sidebar />
    //   <Outlet />
    // </>

    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <div className="bg-blue-900">
        <Sidebar
          // user={data || {}}
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      <Box flexGrow={1}>
        <Outlet />
      </Box>
    </Box>
  );
}
