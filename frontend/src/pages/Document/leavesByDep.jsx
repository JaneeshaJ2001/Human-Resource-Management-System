import * as React from "react";
import {
  TextField,
  Stack,
  FormControl,
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PieChart1 from "./PieChart1";
import { useState } from "react";

function LeavesByDep() {
  const [openPopupTotalLeaveGroupedByDep, setOpenPopupTotalLeaveGroupedByDep] =
    useState(false);

  let today = new Date().toISOString().slice(0, 10);
  const [leaveDetails, setLeaveDetails] = useState({
    leave_type_name: "",
    department_name: "",
    start_date: today,
    end_date: today,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
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
      department_name: "",
      start_date: today,
      end_date: today,
    });
  };

  return (
    <Box sx={{ p: 2, ml: 10 }}>
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
            style={{ width: 400 }}
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
            style={{ width: 400 }}
          />
        </Stack>

        <FormControl required sx={{ width: 400, mb: 5 }}>
          <InputLabel id="department_label">Select Department</InputLabel>
          <Select
            labelId="department_label"
            id="department_type"
            name="department_name"
            value={leaveDetails.department_name}
            label="Select Department"
            onChange={handleChange}
          >
            <MenuItem value={"HR"}>HR</MenuItem>
            <MenuItem value={"Accounting"}>Accounting</MenuItem>
            <MenuItem value={"IT"}>IT</MenuItem>
            <MenuItem value={"Computer"}>Computer</MenuItem>
          </Select>
        </FormControl>

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
            onClick={() => setOpenPopupTotalLeaveGroupedByDep(true)}
          >
            Submit
          </Button>
        </Stack>
      </form>

      <Dialog open={openPopupTotalLeaveGroupedByDep} maxWidth="xl">
        <DialogTitle sx={{ mb: 2.5 }}>
          <div style={{ display: "flex", alignContent: "space-between" }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Total Leaves Grouped By Department
            </Typography>
            <Button
              onClick={() => {
                setOpenPopupTotalLeaveGroupedByDep(false);
              }}
            >
              <CloseOutlinedIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ width: 500, height: 450 }}>
            <PieChart1 />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default LeavesByDep;

/** @type {import("@mui/material").SxProps} */
const styles = {
  pleaveTypeTitle: {
    mb: 2,
  },
};
