import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Email, PointOfSale, PersonAdd, Traffic } from "@mui/icons-material";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import FlexBetween from "../../components/FlexBetween";
import StatBox from "../../components/StatBox";

const PerformanceIndex = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
    <Box m="1.5rem 2.5rem">
      <Typography
        fontWeight="bold"
        fontSize="32px"
        color="alt"
        textAlign="center"
      >
        PERFORMANCE OVERVIEW
      </Typography>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Service Requests"
          // value={data && data.totalCustomers}
          increase="+14%"
          description="Since last month"
          icon={
            <InsightsOutlinedIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Incident Requests"
          //value={data && data.todayStats.totalSales}
          increase="+21%"
          description="Since last month"
          icon={
            <InsightsOutlinedIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          {/* // <OverviewChart view="sales" isDashboard={true} /> */}
        </Box>
        <StatBox
          title="Change Requests"
          //value={data && data.thisMonthStats.totalSales}
          increase="+5%"
          description="Since last month"
          icon={
            <InsightsOutlinedIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Project Requests"
          //value={data && data.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={
            <InsightsOutlinedIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
      </Box>
    </Box>
  );
};

export default PerformanceIndex;
