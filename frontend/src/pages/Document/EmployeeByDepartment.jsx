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
import axios from "axios";

function EmployeeByDepartment() {
  const [openPopupEmployeeByDepartment, setOpenPopupEmployeeByDepartment] =
    useState(false);

  const [department, setDepartment] = useState("");

  const [employeeByDepartments, setEmployeeByDepartments] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`http://localhost:1234/employee/byDept/${department}`)
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          // console.log(response.data);
          setEmployeeByDepartments(response.data);
          setOpenPopupEmployeeByDepartment(true);
        }
      });
  };

  const [departments, setDepartments] = useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:1234/department", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          // console.log(response.data);
          setDepartments(response.data);
        }
      });
  }, []);

  return (
    <Box sx={{ p: 2, ml: 10 }}>
      <form onSubmit={handleSubmit}>
        <FormControl required sx={{ width: 400, mb: 5 }}>
          <InputLabel id="department_label">Select Department</InputLabel>
          <Select
            labelId="department_label"
            id="department"
            name="department_name"
            value={department}
            label="Select Department"
            onChange={(e) => {
              setDepartment(e.target.value);
            }}
          >
            {departments.map((dept, id) => {
              return (
                <MenuItem value={dept.dept_name} key={id}>
                  {dept.dept_name}
                </MenuItem>
              );
            })}
            {/* <MenuItem value={"HR"}>HR</MenuItem>
            <MenuItem value={"Accounting"}>Accounting</MenuItem>
            <MenuItem value={"IT"}>IT</MenuItem>
            <MenuItem value={"Computer"}>Computer</MenuItem> */}
          </Select>
        </FormControl>

        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => setDepartment("")}
            variant="outlined"
            startIcon={<DeleteOutlineOutlinedIcon />}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendOutlinedIcon />}
            // onClick={() => setOpenPopupEmployeeByDepartment(true)}
          >
            Submit
          </Button>
        </Stack>
      </form>

      <Dialog open={openPopupEmployeeByDepartment} maxWidth="xl">
        <DialogTitle sx={{ mb: 2.5 }}>
          <div
            style={{
              display: "flex",
              alignContent: "space-between",
            }}
          >
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Employee Grouped By Department
            </Typography>

            <Button
              onClick={() => {
                setOpenPopupEmployeeByDepartment(false);
              }}
            >
              <CloseOutlinedIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <DataGrid1 result={employeeByDepartments} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default EmployeeByDepartment;

/** @type {import("@mui/material").SxProps} */
const styles = {
  pleaveTypeTitle: {
    mb: 2,
  },
};
