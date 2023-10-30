import {
  Box,
  Button,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
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
    field: "created_at",
    headerName: "Date Created",
    flex: 1,
    valueFormatter: (params) => moment(params?.value).format("DD-MM-YYYY"),
  },
];

function Department() {
  const [openPopupAddDepartment, setOpenPopupAddDepartment] = useState(false);

  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);

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
