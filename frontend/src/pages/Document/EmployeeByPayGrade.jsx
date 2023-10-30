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

function EmployeeByPayGrade() {
  const [openPopupEmployeeByPayGrade, setOpenPopupEmployeeByPayGrade] =
    useState(false);

  const [payGradeDetails, setpayGradeDetails] = useState({
    pay_grade_name: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setpayGradeDetails({
      ...payGradeDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleReset = () => {
    setpayGradeDetails({
      pay_grade_name: "",
    });
  };

  return (
    <Box sx={{ p: 2, ml: 10 }}>
      <form onSubmit={handleSubmit}>
        <FormControl required sx={{ width: 400, mb: 5 }}>
          <InputLabel id="pay_grade_label">Select Pay Grade</InputLabel>
          <Select
            labelId="pay_grade_label"
            id="pay_grade"
            name="pay_grade_name"
            value={payGradeDetails.pay_grade_name}
            label="Select Pay Grade"
            onChange={handleChange}
          >
            <MenuItem value={"1"}>1</MenuItem>
            <MenuItem value={"2"}>2</MenuItem>
            <MenuItem value={"3"}>3</MenuItem>
            <MenuItem value={"4"}>4</MenuItem>
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
            onClick={() => setOpenPopupEmployeeByPayGrade(true)}
          >
            Submit
          </Button>
        </Stack>
      </form>

      <Dialog open={openPopupEmployeeByPayGrade} maxWidth="xl">
        <DialogTitle sx={{ mb: 2.5 }}>
          <div style={{ display: "flex", alignContent: "space-between" }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Total Leaves Grouped By Pay Grade
            </Typography>
            <Button
              onClick={() => {
                setOpenPopupEmployeeByPayGrade(false);
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

export default EmployeeByPayGrade;

/** @type {import("@mui/material").SxProps} */
const styles = {
  pleaveTypeTitle: {
    mb: 2,
  },
};
