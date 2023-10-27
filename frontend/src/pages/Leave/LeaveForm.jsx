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

function LeaveForm() {
  const [startDate, setStartDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(startDate, lastDate, leaveType, reason);
  }

  const handleChange = (event) => {
    setLeaveType(event.target.value);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Set Start Date" />
            </DemoContainer>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Set End Date" />
            </DemoContainer>
          </LocalizationProvider>
        </Stack>

        <FormControl sx={{ width: "45%", mb: 2 }}>
          <InputLabel id="demo-simple-select-label">leaveType</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={leaveType}
            label="SelectLeave Type"
            onChange={handleChange}
          >
            <MenuItem value={1}>Casual</MenuItem>
            <MenuItem value={2}>Maternity</MenuItem>
            <MenuItem value={3}>No Pay</MenuItem>
            <MenuItem value={4}>Annual</MenuItem>
          </Select>
        </FormControl>

        <TextField
          type="reason"
          variant="outlined"
          color="secondary"
          label="Reason"
          onChange={(e) => setReason(e.target.value)}
          value={reason}
          required
          fullWidth
          sx={{ mb: 5 }}
        />

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<DeleteOutlineOutlinedIcon />}>
            Cancel
          </Button>
          <Button variant="contained" endIcon={<SendOutlinedIcon />}>
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
