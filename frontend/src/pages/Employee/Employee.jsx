import {
  Box,
  Tab,
  Tabs,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import TabPanel from "../../components/TabPanel";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { mockDataTeam } from "../../data/MockData2";
import AddEmployee from "./AddEmployee";
import React from "react";
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const columnsForEmployees = [
  {
    field: "emp_id",
    headerName: "ID",
    headerAlign: "left",
    align: "left",
    flex: 0.5,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    valueGetter: (params) => {
      return `${params.row.first_name || ""} ${params.row.last_name || ""}`;
    },
  },
  {
    field: "job_title",
    headerName: "Designation",
    flex: 1,
  },
  {
    field: "status_name",
    headerName: "Status",
    flex: 1,
  },
  {
    field: "dept_name",
    headerName: "Department",
    flex: 1,
  },
  {
    field: "SupervisorId",
    headerName: "Supervisor",
    flex: 1,
  },
  {
    field: "branch_name",
    headerName: "Branch",
    flex: 1,
  },
];

const columnsForSubordinates = [
  {
    field: "emp_id",
    headerName: "ID",
    headerAlign: "left",
    align: "left",
    flex: 0.5,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    valueGetter: (params) => {
      return `${params.row.first_name || ""} ${params.row.last_name || ""}`;
    },
  },
  {
    field: "job_title",
    headerName: "Designation",
    flex: 1,
  },
  {
    field: "status_name",
    headerName: "Status",
    flex: 1,
  },
  {
    field: "dept_name",
    headerName: "Department",
    flex: 1,
  },
  {
    field: "branch_name",
    headerName: "Branch",
    flex: 1,
  },
];

const columnsForLeaveHistory = [
  {
    field: "req_id",
    headerName: "ID",
    headerAlign: "left",
    align: "left",
    flex: 0.5,
  },
  {
    field: "emp_id",
    headerName: "Emp ID",
    flex: 0.5,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    valueGetter: (params) => {
      return `${params.row.first_name || ""} ${params.row.last_name || ""}`;
    },
  },
  {
    field: "leave_type_name",
    headerName: "Leave Type",
    flex: 1,
  },
  {
    field: "start_date",
    headerName: "From",
    flex: 1,
    valueFormatter: (params) => moment(params?.value).format("DD-MM-YYYY"),
  },
  {
    field: "end_date",
    headerName: "To",
    flex: 1,
    valueFormatter: (params) => moment(params?.value).format("DD-MM-YYYY"),
  },
  {
    field: "created_at",
    headerName: "Requested on",
    flex: 1,
    valueFormatter: (params) => moment(params?.value).format("DD-MM-YYYY"),
  },
  {
    field: "req_status",
    headerName: "Status",
    flex: 1,
  },
  {
    field: "reason",
    headerName: "Reason",
    flex: 3,
  },
];

function Employee() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);

  const [subordinateLeaveApplications, setSubordinateLeaveApplications] =
    useState([]);

  const [editLeaveStatus, setEditLeaveStatus] = useState({
    status: false,
    req_id: "",
    req_status: "",
  });

  const updateLeaveStatus = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:1234/leaveApplication", editLeaveStatus, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setEditLeaveStatus({ status: false, req_id: "", req_status: "" });
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    if (!authState.status) {
      navigate("/login");
    } else if (authState.role_id === "r-004") {
      navigate("/");
    } else if (authState.role_id === "r-002") {
      axios
        .get("http://localhost:1234/employee", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            setEmployees(response.data);
          }
        });
    } else if (authState.role_id === "r-003") {
      axios
        .get(
          `http://localhost:1234/employee/bySupervisorId/${authState.emp_id}`,
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            setEmployees(response.data);
          }
        });
      axios
        .get(
          `http://localhost:1234/leaveApplication/bySupervisorId/${authState.emp_id}`,
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        )
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            setSubordinateLeaveApplications(response.data);
          }
        });
    }
  }, [authState]);

  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        {authState.role_id === "r-002"
          ? "Employee Information"
          : "Subordinate Information"}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            label={
              authState.role_id === "r-002"
                ? "Employee List"
                : "Subordinate List"
            }
            id="tab-0"
          />
          {authState.role_id === "r-003" && (
            <Tab label="Leave Requests" id="tab-1" />
          )}
          {authState.role_id === "r-002" && (
            <Tab label="Add Employee" id="tab-1" />
          )}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Paper>
          <DataGrid
            rows={employees}
            getRowId={(row) => row.emp_id}
            columns={
              authState.role_id === "r-002"
                ? columnsForEmployees
                : columnsForSubordinates
            }
            PageSize={25}
            rowsPerPageOption={[25]}
            autoHeight
            rowHeight={70}
            components={{ Toolbar: GridToolbar }}
            onRowDoubleClick={(params) => {
              navigate(`/profile/empId/${params.row.emp_id}`);
            }}
          />
        </Paper>
      </TabPanel>

      {authState.role_id === "r-003" && (
        <TabPanel value={value} index={1}>
          <Paper>
            <DataGrid
              rows={subordinateLeaveApplications}
              columns={columnsForLeaveHistory}
              getRowId={(row) => row.req_id}
              PageSize={25}
              rowsPerPageOption={[25]}
              autoHeight
              rowHeight={70}
              components={{ Toolbar: GridToolbar }}
              onCellClick={(params) => {
                if (params.field === "req_status") {
                  setEditLeaveStatus({
                    status: true,
                    req_id: params.row.req_id,
                    req_status: params.row.req_status,
                  });
                }
              }}
            />
          </Paper>

          <Dialog open={editLeaveStatus.status} maxWidth="xl">
            <DialogTitle>
              <div style={{ display: "flex", alignContent: "space-between" }}>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ flexGrow: 1 }}
                >
                  Edit Status
                </Typography>
                <Button
                  onClick={() => {
                    setEditLeaveStatus({
                      status: false,
                      req_id: "",
                      req_status: "",
                    });
                  }}
                >
                  <CloseOutlinedIcon />
                </Button>
              </div>
            </DialogTitle>
            <DialogContent dividers>
              <form onSubmit={updateLeaveStatus}>
                <Box sx={{ p: 3 }}>
                  <Grid>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="req_id"
                      label="Request ID"
                      name="req_id"
                      value={editLeaveStatus.req_id}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>

                  <FormControl sx={{ minWidth: 210, mt: 2, mb: 2 }}>
                    <InputLabel id="update_leave_status_label">
                      Status
                    </InputLabel>
                    <Select
                      autoFocus
                      labelId="update_leave_status_label"
                      id="update_leave_status"
                      value={editLeaveStatus.req_status}
                      label="Status"
                      onChange={(e) =>
                        setEditLeaveStatus({
                          ...editLeaveStatus,
                          req_status: e.target.value,
                        })
                      }
                      name="req_status"
                    >
                      <MenuItem value={"Accepted"}>Accepted</MenuItem>
                      <MenuItem value={"Declined"}>Declined</MenuItem>
                      <MenuItem value={"Pending"}>Pending</MenuItem>
                    </Select>
                  </FormControl>

                  <Grid>
                    <Button
                      type="submit"
                      style={{ width: "100%" }}
                      variant="contained"
                    >
                      Change
                    </Button>
                  </Grid>
                </Box>
              </form>
            </DialogContent>
          </Dialog>
        </TabPanel>
      )}

      {authState.role_id === "r-002" && (
        <TabPanel value={value} index={1}>
          <AddEmployee />
        </TabPanel>
      )}
    </Box>
  );
}

export default Employee;

/** @type {import("@mui/material").SxProps} */
const styles = {
  pageTitle: {
    mb: 2,
  },
};
