import React, { useState } from "react";
import {
  TextField,
  Grid,
  Paper,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const RegisterForm = () => {
  function handleSubmit(event) {
    event.preventDefault();
    console.log(firstName, lastName, email, dateOfBirth, password);
  }
  const [department, setdepartment] = React.useState("");

  const handleChange1 = (event) => {
    setdepartment(event.target.value);
  };

  const [role, setrole] = React.useState("");

  const handleChange2 = (event) => {
    setrole(event.target.value);
  };

  const [paygrade, setpaygrade] = React.useState("");

  const handleChange3 = (event) => {
    setpaygrade(event.target.value);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="id"
                name="id"
                label="Employee ID"
                fullWidth
                //autoComplete="given-name"
                variant="standard"
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="name"
                name="name"
                label="Name"
                fullWidth
                //autoComplete="shipping address-line2"
                variant="standard"
              />
            </Grid>

            <FormControl sx={{ minWidth: "25%", mt: 3, ml: 3 }}>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={department}
                label="Department"
                onChange={handleChange1}
              >
                <MenuItem value={1}>HR</MenuItem>
                <MenuItem value={2}>IT</MenuItem>
                <MenuItem value={3}>Head Office</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: "21.5%", mt: 3, ml: 3 }}>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Role"
                onChange={handleChange2}
              >
                <MenuItem value={1}>HR</MenuItem>
                <MenuItem value={2}>IT</MenuItem>
                <MenuItem value={3}>Head Office</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: "21.5%", mt: 3, ml: 3 }}>
              <InputLabel id="demo-simple-select-label">Pay grade</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Pay gRade"
                onChange={handleChange3}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="role"
                name="role"
                label="Role"
                fullWidth
                //autoComplete="shipping address-line1"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="address"
                name="address"
                label="Address"
                fullWidth
                autoComplete="shipping address"
                variant="standard"
              />
            </Grid>

            <stack spacing={2}>
              <Box sx={{ mt: 3, ml: 3 }}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box sx={{ mt: 3, ml: 3 }}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Marital Status
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="unmarried"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="unmarried"
                      control={<Radio />}
                      label="Unmarried"
                    />
                    <FormControlLabel
                      value="married"
                      control={<Radio />}
                      label="Married"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </stack>

            <Box sx={{ mt: 2, ml: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker label="Birth Date" />
                </DemoContainer>
              </LocalizationProvider>
            </Box>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="mobilenumber"
                name="mobilenumber"
                label="Mobile Number"
                fullWidth
                autoComplete="shipping number"
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="worklocation"
                name="worklocation"
                label="Work Location"
                fullWidth
                autoComplete="shipping worklocation"
                variant="standard"
              />
            </Grid>

            <Box sx={{ mt: 2, ml: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker label="Date Of Join" />
                </DemoContainer>
              </LocalizationProvider>
            </Box>

            <Stack direction="row" spacing={2} sx={{ mt: 2, p: 3 }}>
              <Button
                variant="outlined"
                startIcon={<DeleteOutlineOutlinedIcon />}
              >
                Cancel
              </Button>
              <Button variant="contained" endIcon={<SendOutlinedIcon />}>
                Submit
              </Button>
            </Stack>
          </Grid>
        </Paper>
      </form>
    </React.Fragment>
  );
};

export default RegisterForm;

/** @type {import("@mui/material").SxProps} */
const styles = {
  pdepartmentTitle: {
    mb: 2,
  },
};
