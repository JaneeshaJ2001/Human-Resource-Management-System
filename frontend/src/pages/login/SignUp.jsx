import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    emp_id: "",
    password: "",
    confirm_password: "",
    role_id: "",
  });

  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(userDetails);
    if (userDetails.password !== userDetails.confirm_password) {
      alert("Wrong password confirm-password combination");
    } else {
      axios
        .post("http://localhost:1234/auth/register", userDetails)
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
            if (response.data.error.code === "ER_DUP_ENTRY") {
              alert("User already exists, Login instead !");
              navigate("/login");
            } else {
              alert("Fill all the forms correctly");
            }
          } else {
            // console.log(response.data);
            alert(
              `User registered successfully, Username : ${response.data.username}`
            );
            navigate("/login");
          }
        });
    }
  };

  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (!authState.adminAuth) {
      navigate("/login");
    }
  }, [authState]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url("https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CssBaseline />
        <Grid
          //item
          bgcolor="background.paper"
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ p: 5, m: 70 }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome to Jupyter
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 2 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="emp_id"
              label="Employee ID"
              name="emp_id"
              value={userDetails.emp_id}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={userDetails.password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm_password"
              label="Confirm Password"
              type="password"
              id="confirm_password"
              value={userDetails.confirm_password}
              onChange={handleChange}
            />
            <Grid>
              <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userDetails.role_id}
                  label="Role"
                  name="role_id"
                  onChange={handleChange}
                >
                  <MenuItem value={"r-002"}>HR Manager</MenuItem>
                  <MenuItem value={"r-003"}>Supervisor</MenuItem>
                  <MenuItem value={"r-004"}>Employee</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 1 }}
            >
              Sign Up
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  Already have an account ?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
