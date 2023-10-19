import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { SidebarItem } from "../components/Sidebar";
import "../index.css";
// import { Boxes, LayoutDashboard, Package, UserCircle } from "lucide-react";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
// import
// import Navbar from "../components/Navbar";
// import { useSelector } from "react-redux";

export default function Layout() {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const userId = useSelector((state) => state.global.userId);
  return (
    // <>
    //   <Sidebar />
    //   <Outlet />
    // </>
    <div className="flex flex-row bg-slate-700 h-screen w-screen ">
      <Sidebar>
        <SidebarItem
          icon={<SpaceDashboardOutlinedIcon size={20} />}
          text="Dashboard"
          to="/dashboard"
        />
        <SidebarItem
          icon={<UploadOutlinedIcon size={20} />}
          text="Upload"
          to="/performance"
        />
      </Sidebar>
      <Box flexGrow={1}>
        {/* <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        /> */}
        <Outlet />
      </Box>
    </div>
  );
}
