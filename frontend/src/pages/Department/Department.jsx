import {
  Box,
  Button,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataDepartment } from "../../data/MockData2";
import AddDepartment from "./AddDepartment";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import moment from "moment";

/*
<Fab
        variant="extended"
        size="medium"
        color="primary"
        onClick={() => setOpenPopupAddDepartment(true)}
      >
        <AddOutlinedIcon sx={{ mr: 1 }} />
        Add Department
      </Fab>
      */

const columnsForDepartments = [
  {
    field: "dept_id",
    headerName: "ID",
    headerAlign: "left",
    align: "left",
    flex: 0.5,
  },
  {
    field: "dept_name",
    headerName: "Name",
    flex: 2,
  },
  {
    field: "current_no_of_employees",
    headerName: "Employee Count",
    flex: 1,
  },
  {
    field: "max_no_of_employees",
    headerName: "Capacity",
    flex: 1,
  },
  {
    field: "updated_at",
    headerName: "Last Updated",
    flex: 1,
    valueFormatter: (params) => moment(params?.value).format("DD-MM-YYYY"),
  },
];

function Department() {
  const [openPopupAddDepartment, setOpenPopupAddDepartment] = useState(false);

  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);

  const [updateDepartment, setUpdateDepartment] = useState({
    status: false,
    dept_id: "",
    dept_name: "",
    current_no_of_employees: "",
    max_no_of_employees: "",
  });

  const changeDepartment = () => {
    axios
      .put("http://localhost:1234/department/update", updateDepartment, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          alert("Something went wrong try again");
        } else {
          alert("Department updated successfully!");
          setUpdateDepartment({
            status: false,
            dept_id: "",
            dept_name: "",
            current_no_of_employees: "",
            max_no_of_employees: "",
          });
          window.location.reload();
        }
      });
  };

  const handleChangeUpdateDepartment = (e) => {
    setUpdateDepartment({
      ...updateDepartment,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!authState.status) {
      navigate("/login");
    } else if (authState.role_id === "r-003" || authState.role_id === "r-004") {
      navigate("/");
    } else {
      axios
        .get("http://localhost:1234/department", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            setDepartments(response.data);
          }
        });
    }
  }, [authState]);

  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        Department Section
      </Typography>

      <Button
        variant="outlined"
        startIcon={<AddOutlinedIcon />}
        sx={{ mb: 4 }}
        onClick={() => setOpenPopupAddDepartment(true)}
      >
        Add Department
      </Button>
      <Paper>
        <DataGrid
          rows={departments}
          getRowId={(row) => row.dept_id}
          columns={columnsForDepartments}
          PageSize={25}
          rowsPerPageOption={[25]}
          autoHeight
          rowHeight={70}
          onRowDoubleClick={(params) => {
            setUpdateDepartment({
              status: true,
              dept_id: params.row.dept_id,
              dept_name: params.row.dept_name,
              current_no_of_employees: params.row.current_no_of_employees,
              max_no_of_employees: params.row.max_no_of_employees,
            });
          }}
        />
      </Paper>

      <Dialog open={openPopupAddDepartment} maxWidth="xl">
        <DialogTitle>
          <div style={{ display: "flex", alignContent: "space-between" }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Add Department
            </Typography>
            <Button
              onClick={() => {
                setOpenPopupAddDepartment(false);
              }}
            >
              <CloseOutlinedIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <AddDepartment
            departments={departments.map((department) => department.dept_name)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={updateDepartment.status} maxWidth="xl">
        <DialogTitle>
          <div style={{ display: "flex", alignContent: "space-between" }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Update Department
            </Typography>
            <Button
              onClick={() => {
                setUpdateDepartment({
                  status: false,
                  dept_id: "",
                  dept_name: "",
                  current_no_of_employees: "",
                  max_no_of_employees: "",
                });
              }}
            >
              <CloseOutlinedIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <Box sx={{ p: 3 }}>
              <Grid>
                <TextField
                  variant="outlined"
                  margin="normal"
                  id="dept_id"
                  label="Department ID"
                  name="dept_id"
                  style={{ width: "100%" }}
                  value={updateDepartment.dept_id}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  id="dept_name"
                  label="Department Name"
                  name="dept_name"
                  style={{ width: "100%" }}
                  autoFocus
                  value={updateDepartment.dept_name}
                  onChange={handleChangeUpdateDepartment}
                />
              </Grid>
              <Grid>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  type="number"
                  inputProps={{ min: updateDepartment.current_no_of_employees }}
                  id="max_no_of_employees"
                  label="Capacity"
                  name="max_no_of_employees"
                  style={{ width: "100%" }}
                  value={updateDepartment.max_no_of_employees}
                  onChange={handleChangeUpdateDepartment}
                />
              </Grid>
              <Grid>
                <Button
                  onClick={changeDepartment}
                  style={{ width: "100%" }}
                  variant="contained"
                >
                  Update Department
                </Button>
              </Grid>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Department;

/** @type {import("@mui/material").SxProps} */
const styles = {
  pageTitle: {
    mb: 5,
  },
};
