import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Email, PointOfSale, PersonAdd, Traffic } from "@mui/icons-material";

const Dashboard = () => {
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
    <div>
      {/* //
      <Header title="DASHBOARD" subtitle="Welcome to the Dashboard" /> */}

      <div className="bg-pink-500">Hellow</div>
    </div>
  );
};

export default Dashboard;
