import React, { useEffect, useState } from "react";
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
import { useLocation } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";

function App() {
  const location = useLocation();

  /** @type {import("@mui/material").SxProps} */
  const styles = {
    container: {
      display: "flex",
      bgcolor: "neutral.light",
      height: "calc(100% - 70px) ",
    },

    mainSection: {
      p:
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/forgotpassword"
          ? 0
          : 4,
      width: "100%",
      height: "100%",
      overflow: "auto",
    },
  };

  const [authState, setAuthState] = useState({
    username: "",
    emp_id: "",
    role_id: "",
    personal_details: {},
    status: localStorage.getItem("accessToken") ? true : false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:1234/auth/validateAuth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({
            username: "",
            emp_id: "",
            role_id: "",
            personal_details: {},
            status: false,
          });
        } else {
          setAuthState({
            username: response.data.username,
            emp_id: response.data.emp_id,
            role_id: response.data.role_id,
            status: true,
          });
          axios
            .get(
              `http://localhost:1234/employee/byId/${response.data.emp_id}`,
              {
                headers: { accessToken: localStorage.getItem("accessToken") },
              }
            )
            .then((response) => {
              if (response.data.error) {
                console.log(response.data.error);
              } else {
                setAuthState((prevAuthState) => {
                  return {
                    ...prevAuthState,
                    personal_details: response.data[0],
                  };
                });
              }
            });
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
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
    </AuthContext.Provider>
  );
}

export default App;
