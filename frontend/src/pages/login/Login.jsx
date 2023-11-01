import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await axios
      .post("http://localhost:1234/auth/login", {
        username: data.get("username"),
        password: data.get("password"),
      })
      .then(async (response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.accessToken);
          // console.log(response.data);
          await setAuthState({
            username: response.data.username,
            emp_id: response.data.emp_id,
            role_id: response.data.role_id,
            status: true,
            personal_details: {},
          });
          await axios
            .get(
              `http://localhost:1234/employee/byId/${response.data.emp_id}`,
              {
                headers: { accessToken: localStorage.getItem("accessToken") },
              }
            )
            .then(async (res) => {
              if (res.data.error) {
                console.log(res.data.error);
              } else {
                // console.log(res.data);
                await setAuthState((prevAuthState) => {
                  return { ...prevAuthState, personal_details: res.data[0] };
                });
              }
            });
          navigate("/");
        }
      });
  };

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
            sx={{ mt: 5 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              //autoComplete="email"
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
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  component="button"
                  variant="body2"
                  onClick={(e) => {
                    e.preventDefault();
                    if (prompt("Enter admin password") === "0000") {
                      setAuthState({ ...authState, adminAuth: true });
                      navigate("/signup");
                    } else {
                      alert("Invalid admin auth");
                      navigate("/login");
                    }
                  }}
                >
                  Create Account !
                </Link>
                {/* <Link href="/signup" variant="body2">
                  Create Account !
                </Link> */}
              </Grid>
              <Grid item xs>
                <Link
                  component="button"
                  variant="body2"
                  onClick={(e) => {
                    e.preventDefault();
                    if (prompt("Enter admin password") === "0000") {
                      setAuthState({ ...authState, adminAuth: true });
                      navigate("/forgotpassword");
                    } else {
                      alert("Invalid admin auth");
                      navigate("/login");
                    }
                  }}
                >
                  Forgot password?
                </Link>
                {/* <Link href="/forgotpassword" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
