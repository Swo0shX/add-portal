import * as React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./scenes/layout";
import Header from "../src/components/Header";
import Home from "../src/components/Home";
import PerformanceIndex from "./scenes/kra";
import Peofrmance from "./scenes/kra";
function App() {
  // const mode = useSelector((state) => state.global.mode);
  // const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
            <Route path="/performance" element={<PerformanceIndex />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
