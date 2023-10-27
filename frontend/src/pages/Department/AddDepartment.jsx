import React from "react";
import {
  Grid,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function AddDepartment() {
  const [name, setname] = React.useState("");

  const handleChange = (event) => {
    setname(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ p: 3 }}>
        <Grid>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="id"
            label="Department ID"
            name="id"
            autoFocus
          />
        </Grid>

        <Grid>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="noOfEmployees"
            label="No Of Employees"
            name="noOfEmployees"
          />
        </Grid>

        <FormControl sx={{ minWidth: 210 }}>
          <InputLabel id="demo-simple-select-label">Department Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={name}
            label="Department Name"
            onChange={handleChange}
          >
            <MenuItem value={1}>HR</MenuItem>
            <MenuItem value={2}>IT</MenuItem>
            <MenuItem value={3}>Financial</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </form>
  );
}
