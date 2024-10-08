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
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

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

const columnsForCustomAttributes = [
  {
    field: "attribute_id",
    headerName: "ID",
    flex: 0.5,
  },
  {
    field: "attribute_name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 2,
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

  const [customAttributes, setCustomAttributes] = useState([]);

  const [addAttribute, setAddAttribute] = useState({
    status: false,
    attribute_name: "",
    description: "",
  });

  const addAttr = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:1234/customAttribute/add", addAttribute, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          alert("Attribute successfully added");
          window.location.reload();
        }
      });
  };

  const [updateAttribute, setUpdateAttribute] = useState({
    status: false,
    attribute_id: "",
    attribute_name: "",
    description: "",
  });

  const changeAttribute = () => {
    axios
      .put("http://localhost:1234/customAttribute/update", updateAttribute, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          alert("Attribute updated successfully");
          setUpdateAttribute({
            status: false,
            attribute_id: "",
            attribute_name: "",
            description: "",
          });
          window.location.reload();
        }
      });
  };

  const deleteAttribute = () => {
    axios
      .put("http://localhost:1234/customAttribute/delete", updateAttribute, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          alert("Attribute deleted successfully");
          setUpdateAttribute({
            status: false,
            attribute_id: "",
            attribute_name: "",
            description: "",
          });
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
      axios
        .get("http://localhost:1234/customAttribute", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            console.log(response.data);
            setCustomAttributes(response.data);
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

  // console.log(customAttributes);

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
          {authState.role_id === "r-002" && (
            <Tab label="Custom Attributes" id="tab-2" />
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

      {authState.role_id === "r-002" && (
        <TabPanel value={value} index={2}>
          <Button
            variant="outlined"
            startIcon={<AddOutlinedIcon />}
            sx={{ mb: 4 }}
            onClick={() =>
              setAddAttribute({
                status: true,
                attribute_name: "",
                description: "",
              })
            }
          >
            Add Custom Attribute
          </Button>
          <Paper>
            <DataGrid
              rows={customAttributes}
              getRowId={(row) => row.attribute_id}
              columns={columnsForCustomAttributes}
              PageSize={25}
              rowsPerPageOption={[25]}
              autoHeight
              rowHeight={70}
              onRowDoubleClick={(params) => {
                setUpdateAttribute({
                  status: true,
                  attribute_id: params.row.attribute_id,
                  attribute_name: params.row.attribute_name,
                  description: params.row.description,
                });
              }}
            />
          </Paper>
          <Dialog open={addAttribute.status} maxWidth="xl">
            <DialogTitle>
              <div style={{ display: "flex", alignContent: "space-between" }}>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ flexGrow: 1 }}
                >
                  Add Custom Attribute
                </Typography>
                <Button
                  onClick={() => {
                    setAddAttribute({
                      status: false,
                      attribute_name: "",
                      description: "",
                    });
                  }}
                >
                  <CloseOutlinedIcon />
                </Button>
              </div>
            </DialogTitle>
            <DialogContent dividers>
              <form onSubmit={addAttr}>
                <Box sx={{ p: 3 }}>
                  <Grid>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="attribute_name"
                      label="Attribute Name"
                      name="attribute_name"
                      autoFocus
                      inputProps={{ maxLength: 15 }}
                      value={addAttribute.attribute_name}
                      onChange={(e) =>
                        setAddAttribute({
                          ...addAttribute,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="description"
                      label="Description"
                      name="description"
                      autoFocus
                      inputProps={{ maxLength: 100 }}
                      value={addAttribute.description}
                      onChange={(e) =>
                        setAddAttribute({
                          ...addAttribute,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid>
                    <Button
                      type="submit"
                      style={{ width: "100%" }}
                      variant="contained"
                    >
                      Add Attribute
                    </Button>
                  </Grid>
                </Box>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={updateAttribute.status} maxWidth="xl">
            <DialogTitle>
              <div style={{ display: "flex", alignContent: "space-between" }}>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ flexGrow: 1 }}
                >
                  Update Attribute
                </Typography>
                <Button
                  onClick={() => {
                    setUpdateAttribute({
                      status: false,
                      attribute_id: "",
                      attribute_name: "",
                      description: "",
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
                      required
                      id="attribute_id"
                      label="ID"
                      name="attribute_id"
                      autoFocus
                      inputProps={{ maxLength: 15 }}
                      value={updateAttribute.attribute_id}
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
                      id="attribute_name"
                      label="Attribute Name"
                      name="attribute_name"
                      autoFocus
                      inputProps={{ maxLength: 15 }}
                      value={updateAttribute.attribute_name}
                      onChange={(e) =>
                        setUpdateAttribute({
                          ...updateAttribute,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="description"
                      label="Description"
                      name="description"
                      autoFocus
                      inputProps={{ maxLength: 100 }}
                      value={updateAttribute.description}
                      onChange={(e) =>
                        setUpdateAttribute({
                          ...updateAttribute,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid>
                    <Button
                      style={{ width: "100%" }}
                      variant="contained"
                      onClick={changeAttribute}
                    >
                      Update Attribute
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      style={{ width: "100%" }}
                      variant="contained"
                      onClick={deleteAttribute}
                    >
                      Delete Attribute
                    </Button>
                  </Grid>
                </Box>
              </form>
            </DialogContent>
          </Dialog>
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
