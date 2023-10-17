import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
// import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import profileImage from "assets/profile.jpeg";

import {
  AssessmentOutlined,
  BlurOnOutlined,
  BorderClearOutlined,
  EventNoteOutlined,
} from "@mui/icons-material";
import DynamicFormOutlinedIcon from "@mui/icons-material/DynamicFormOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  // const theme.palette = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: theme.palette.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>

    // <IconButton onClick={() => setSelected(title)} icon={icon}></IconButton>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = theme.palette;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-menu-item": {
          color: `${colors.primary[100]} !important`,
        },
        "& .pro-sidebar-inner": {
          background: `${colors.primary.main} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#f7c548 !important",
          backgroundColor: "#191F45 !important",
        },
        "& .pro-menu-item.active": {
          color: "#cca752 !important",
          backgroundColor: "#191F45 !important",
          fontWeight: "bold",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: theme.palette.secondary[300],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={theme.palette.primary[100]}>
                  DASH
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={profileImage}
                  style={{ cursor: "pointer", borderRadius: "55%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.primary[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Mark Ozaeta
                </Typography>
                <Typography variant="h5" color={colors.primary[100]}>
                  Developer
                </Typography>
              </Box>
            </Box>
          )} */}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              fontWeight="bold"
            />

            <Typography
              variant="h6"
              color={colors.primary[100]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Defects
            </Typography>
            <Item
              title="Manage Logs"
              to="/defects/create"
              icon={<BorderColorOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Defects Dashboard"
              to="/defects"
              icon={<AssessmentOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={theme.palette.primary[100]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Projects Dashboard"
              to="/projects"
              icon={<DynamicFormOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Project View"
              to="/projectview"
              icon={<EventNoteOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={theme.palette.primary[100]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Performance Monitoring
            </Typography>
            <Item
              title="Performance Overview"
              to="/performance"
              icon={<AnalyticsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="File Upload"
              to="/performance/upload"
              icon={<ArrowCircleUpOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
