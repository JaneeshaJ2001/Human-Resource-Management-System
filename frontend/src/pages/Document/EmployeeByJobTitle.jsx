import * as React from "react";
import {
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
import DataGrid1 from "./DataGrid1";
import { useState } from "react";

function EmployeeByTitle() {
  const [openPopupEmployeeByJobTitle, setOpenPopupEmployeeByJobTitle] =
    useState(false);

  const [jobTitleDetails, setJobTitleDetails] = useState({
    job_title_name: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setJobTitleDetails({
      ...jobTitleDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleReset = () => {
    setJobTitleDetails({
      job_title_name: "",
    });
  };

  return (
    <Box sx={{ p: 2, ml: 10 }}>
      <form onSubmit={handleSubmit}>
        <FormControl required sx={{ width: 400, mb: 5 }}>
          <InputLabel id="job_title_label">Select JobTitle</InputLabel>
          <Select
            labelId="job_title_label"
            id="job_title"
            name="job_title_name"
            value={jobTitleDetails.job_title_name}
            label="Select Job Title"
            onChange={handleChange}
          >
            <MenuItem value={"HR Manager"}>HR Manager</MenuItem>
            <MenuItem value={"QA Engineer"}>QA Engineer</MenuItem>
            <MenuItem value={"Accountant"}>Accountant</MenuItem>
            <MenuItem value={"Software Engineer"}>Software Engineer</MenuItem>
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
            onClick={() => setOpenPopupEmployeeByJobTitle(true)}
          >
            Submit
          </Button>
        </Stack>
      </form>

      <Dialog open={openPopupEmployeeByJobTitle} maxWidth="xl">
        <DialogTitle sx={{ mb: 2.5 }}>
          <div style={{ display: "flex", alignContent: "space-between" }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Employee Grouped By Job Title
            </Typography>
            <Button
              onClick={() => {
                setOpenPopupEmployeeByJobTitle(false);
              }}
            >
              <CloseOutlinedIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <DataGrid1 />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default EmployeeByTitle;

/** @type {import("@mui/material").SxProps} */
const styles = {
  pleaveTypeTitle: {
    mb: 2,
  },
};
