import React, { useState } from "react";
import {
  Grid,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddDepartment({ departments }) {
  const [data, setData] = useState({
    name: "",
    no_of_employees: 1,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (departments.includes(data.name)) {
      alert("Department already exists");
      setData({
        name: "",
        no_of_employees: 1,
      });
    } else {
      axios
        .post(
          "http://localhost:1234/department",
          { dept_name: data.name, no_of_employees: data.no_of_employees },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        )
        .then((response) => {
          if (response.data.error) {
            alert("Some error occured!");
          } else if (response.data.success) {
            alert(response.data.success);
            window.location.reload();
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ p: 3 }}>
        <Grid>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="name"
            label="Department Name"
            name="name"
            autoFocus
            value={data.name}
            onChange={handleChange}
          />
        </Grid>

        <Grid>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="no_of_employees"
            label="Capacity"
            name="no_of_employees"
            type="number"
            inputProps={{ min: 1 }}
            value={data.no_of_employees}
            onChange={handleChange}
          />
        </Grid>

        <Grid>
          <Button type="submit" style={{ width: "100%" }} variant="contained">
            Add
          </Button>
        </Grid>

        {/* <FormControl sx={{ minWidth: 210 }}>
          <InputLabel id="demo-simple-select-label">Department Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={data.name}
            label="Department Name"
            onChange={handleChange}
            name="name"
          >
            <MenuItem value={1}>HR</MenuItem>
            <MenuItem value={2}>IT</MenuItem>
            <MenuItem value={3}>Financial</MenuItem>
          </Select>
        </FormControl> */}
      </Box>
    </form>
  );
}
