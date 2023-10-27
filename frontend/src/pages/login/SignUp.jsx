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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import React from "react";

const defaultTheme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
  };

  const [role, setRole] = React.useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
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
            sx={{ mt: 2 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="User ID"
              name="id"
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
            />

            <Grid>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Role"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>HR Manager</MenuItem>
                  <MenuItem value={2}>Supervisor</MenuItem>
                  <MenuItem value={3}>Employee</MenuItem>
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
          </Box>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
