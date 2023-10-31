import { Typography, Avatar, Box } from "@mui/material";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import {
  DashboardCustomizeOutlined,
  PermIdentityOutlined,
  ExitToAppOutlined,
  PeopleOutlineOutlined,
  BusinessOutlined,
  DescriptionOutlined,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

function SideNav() {
  const { collapsed } = useProSidebar();

  const theme = useTheme();

  const location = useLocation();

  const { authState } = useContext(AuthContext);
  const [employeeDetails, setEmployeeDetails] = useState({});

  if (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgotpassword"
  ) {
    return null;
  }

  // console.log(authState);
  // console.log("from sidenav")

  return (
    <Sidebar
      style={{
        height: "100%",
        top: "auto",
      }}
      breakPoint="md"
      backgroundColor={theme.palette.neutral.light}
    >
      <Box sx={styles.avatarContainer}>
        <Avatar
          sx={styles.avatar}
          alt="Profile name"
          src="/src/assets/user.png"
          // src="../src/assets/user.png"
        />
        {!collapsed ? (
          <Typography variant="body2" sx={styles.profileName}>
            {authState.personal_details &&
              `${authState.personal_details.first_name} ${authState.personal_details.last_name}`}
          </Typography>
        ) : null}
        {!collapsed ? (
          <Typography variant="body2" fontWeight={"bold"}>
            {" "}
            {authState.personal_details && authState.personal_details.job_title}
          </Typography>
        ) : null}
      </Box>

      <Menu
        menuItemStyles={{
          button: ({ active }) => {
            return {
              backgroundColor: active
                ? theme.palette.neutral.normal
                : undefined,
              color: active ? "#fff" : theme.palette.text.secondary,
              //borderRadius: theme.shape.borderRadius,
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: "#fff",
              },
            };
          },
        }}
      >
        <MenuItem
          active={location.pathname === "/"}
          component={<Link to="/" />}
          icon={<DashboardCustomizeOutlined />}
        >
          <Typography variant="body2"> Dashboard </Typography>
        </MenuItem>

        <MenuItem
          active={location.pathname === "/profile"}
          component={<Link to="/profile" />}
          icon={<PermIdentityOutlined />}
        >
          <Typography variant="body2"> Profile </Typography>
        </MenuItem>

        {authState.role_id === "r-004" && (
          <MenuItem
            active={location.pathname === "/leave"}
            component={<Link to="/leave" />}
            icon={<ExitToAppOutlined />}
          >
            <Typography variant="body2"> Leave Section </Typography>
          </MenuItem>
        )}

        {(authState.role_id === "r-002" || authState.role_id === "r-003") && (
          <MenuItem
            active={location.pathname === "/employee"}
            component={<Link to="/employee" />}
            icon={<PeopleOutlineOutlined />}
          >
            <Typography variant="body2">
              {" "}
              {authState.role_id === "r-002"
                ? "Employees"
                : "Subordinates"}{" "}
            </Typography>
          </MenuItem>
        )}

        {authState.role_id === "r-002" && (
          <MenuItem
            active={location.pathname === "/department"}
            component={<Link to="/department" />}
            icon={<BusinessOutlined />}
          >
            <Typography variant="body2"> Department </Typography>
          </MenuItem>
        )}

        <MenuItem
          active={location.pathname === "/document"}
          component={<Link to="/document" />}
          icon={<DescriptionOutlined />}
        >
          <Typography variant="body2"> Documents </Typography>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    my: 5,
  },

  avatar: {
    width: "50%",
    height: "auto",
  },

  profileName: {
    mt: 1,
    fontWeight: "bold",
  },
};

export default SideNav;
