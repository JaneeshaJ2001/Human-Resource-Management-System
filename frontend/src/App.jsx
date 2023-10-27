import React from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ProSidebarProvider } from "react-pro-sidebar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import theme from "./config/theme";
import AppHeader from "./components/AppHeader";
import SideNav from "./components/SideNav";
import AppRoutes from "./router/AppRoutes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login"

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
          <CssBaseline />
          <AppHeader />
          <Box sx={styles.container}>
            <SideNav />
            <Box component={"main"} sx={styles.mainSection}>
              <AppRoutes />
            </Box>
          </Box>
        </ProSidebarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  container: {
    display: "flex",
    bgcolor: "neutral.light",
    height: "calc(100% - 70px) ",
  },

  mainSection: {
    p: 4,
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
};

export default App;
