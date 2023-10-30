import * as React from "react";
import {
  TextField,
  Stack,
  FormControl,
  Paper,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import axios from "axios";

function LeaveForm() {
  let today = new Date().toISOString().slice(0, 10);
  const [leaveDetails, setLeaveDetails] = useState({
    leave_type_name: "",
    reason: "",
    start_date: today,
    end_date: today,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(leaveDetails);
    axios
      .post("http://localhost:1234/leaveApplication", leaveDetails, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          alert("Leave applied successfully!");
          handleReset();
          window.location.reload();
        }
      });
  };

  const handleChange = (event) => {
    setLeaveDetails({
      ...leaveDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleReset = () => {
    setLeaveDetails({
      leave_type_name: "",
      reason: "",
      start_date: today,
      end_date: today,
    });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
          <TextField
            type="date"
            variant="outlined"
            color="secondary"
            label="Start Date"
            name="start_date"
            onChange={handleChange}
            value={leaveDetails.start_date}
            required
            fullWidth
            sx={{ mb: 5 }}
          />
          <TextField
            type="date"
            variant="outlined"
            color="secondary"
            label="End Date"
            name="end_date"
            onChange={handleChange}
            value={leaveDetails.end_date}
            required
            fullWidth
            sx={{ mb: 5 }}
          />
        </Stack>

        <FormControl required sx={{ width: "45%", mb: 2 }}>
          <InputLabel id="leave_type_label">leaveType</InputLabel>
          <Select
            labelId="leave_type_label"
            id="leave_type"
            name="leave_type_name"
            value={leaveDetails.leave_type_name}
            label="Select Leave Type"
            onChange={handleChange}
          >
            <MenuItem value={"Casual"}>Casual</MenuItem>
            <MenuItem value={"Maternity"}>Maternity</MenuItem>
            <MenuItem value={"No-Pay"}>No-Pay</MenuItem>
            <MenuItem value={"Annual"}>Annual</MenuItem>
          </Select>
        </FormControl>

        <TextField
          type="reason"
          variant="outlined"
          color="secondary"
          label="Reason"
          name="reason"
          onChange={handleChange}
          value={leaveDetails.reason}
          required
          fullWidth
          sx={{ mb: 5 }}
        />

        <Stack direction="row" spacing={2}>
          <Button
            onClick={handleReset}
            variant="outlined"
            startIcon={<DeleteOutlineOutlinedIcon />}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendOutlinedIcon />}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default LeaveForm;

/** @type {import("@mui/material").SxProps} */
const styles = {
  pleaveTypeTitle: {
    mb: 2,
  },
};

{
  /* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Set Start Date"
                value={leaveDetails.start_date}
                onChange={(newValue) =>
                  setLeaveDetails({ ...leaveDetails, start_date: newValue })
                }
              />
            </DemoContainer>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]} >
              <DatePicker
                label="Set End Date"
                value={leaveDetails.end_date}
                onChange={(newValue) =>
                  setLeaveDetails({ ...leaveDetails, end_date: newValue })
                }
              />
            </DemoContainer>
          </LocalizationProvider> */
}
