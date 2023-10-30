import { AppBar, Badge, Box, IconButton, Toolbar } from "@mui/material";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useProSidebar } from "react-pro-sidebar";
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function AppHeader() {
  const { collapseSidebar, toggleSidebar, broken } = useProSidebar();

  const location = useLocation();

  const { setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();

  if (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgotpassword"
  ) {
    return null;
  }

  const LogOut = () => {
    setAuthState({
      username: "",
      emp_id: "",
      role_id: "",
      status: false,
    });
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar>
        <IconButton
          onClick={() => (broken ? toggleSidebar() : collapseSidebar())}
          color="secondary"
        >
          <MenuTwoToneIcon />
        </IconButton>

        <Box component="img" sx={styles.appLogo} src="/src/assets/logo.png" />

        <Box sx={{ flexGrow: 1 }} />

        <IconButton title="AdminPanel" color="secondary">
          <AdminPanelSettingsIcon />
        </IconButton>

        <IconButton title="Notifications" color="secondary">
          <Badge badgeContent={14} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton title="Settings" color="secondary">
          <SettingsIcon />
        </IconButton>

        <IconButton title="Sign Out" color="secondary" onClick={LogOut}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  appBar: {
    bgcolor: "neutral.main",
  },

  appLogo: {
    width: 80,
    height: 35,
    ml: 2,
    cursor: "pointer",
  },
};

export default AppHeader;
