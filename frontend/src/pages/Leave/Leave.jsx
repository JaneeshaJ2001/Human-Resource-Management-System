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
} from "@mui/material";
import TabPanel from "../../components/TabPanel";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { mockDataLeaveHistory } from "../../data/MockData2";
import LeaveForm from "./LeaveForm";
import React from "react";
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const columnsForLeaveHistory = [
  {
    field: "req_id",
    headerName: "ID",
    headerAlign: "left",
    align: "left",
    flex: 0.5,
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

function Leave() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const [leaveHistory, setLeaveHistory] = useState([]);

  const [deleteLeave, setDeleteLeave] = useState({
    status: false,
    req_id: "",
  });

  const removeLeave = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:1234/leaveApplication/delete", deleteLeave, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          alert("Leave deleted successfully!");
          setDeleteLeave({
            status: false,
            req_id: "",
          });
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    if (!authState.status) {
      navigate("/login");
    } else if (authState.role_id === "r-002" || authState.role_id === "r-003") {
      navigate("/");
    } else {
      axios
        .get(
          `http://localhost:1234/leaveApplication/byId/${authState.emp_id}`,
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        )
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            // console.log(response.data)
            setLeaveHistory(response.data);
          }
        });
    }
  }, [authState]);

  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        Leave Section
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Leave History" id="tab-0" />
          <Tab label="Leave Form" id="tab-1" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Paper>
          <DataGrid
            rows={leaveHistory}
            getRowId={(row) => row.req_id}
            columns={columnsForLeaveHistory}
            PageSize={25}
            rowsPerPageOption={[25]}
            autoHeight
            rowHeight={70}
            components={{ Toolbar: GridToolbar }}
            onRowDoubleClick={(params) => {
              if (params.row.req_status == "Pending") {
                setDeleteLeave({
                  status: true,
                  req_id: params.row.req_id,
                });
              }
            }}
          />
        </Paper>

        <Dialog open={deleteLeave.status} maxWidth="xl">
          <DialogTitle>
            <div style={{ display: "flex", alignContent: "space-between" }}>
              <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                Proceed to delete the leave application {deleteLeave.req_id}
              </Typography>
              <Button
                onClick={() => {
                  setDeleteLeave({
                    status: false,
                    req_id: "",
                  });
                }}
              >
                <CloseOutlinedIcon />
              </Button>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ p: 3 }}>
              <Grid>
                <Button
                  type="submit"
                  style={{ width: "100%" }}
                  variant="contained"
                  onClick={removeLeave}
                >
                  Delete Leave
                </Button>
              </Grid>
            </Box>
          </DialogContent>
        </Dialog>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <LeaveForm />
      </TabPanel>
    </Box>
  );
}

export default Leave;

/** @type {import("@mui/material").SxProps} */
const styles = {
  pageTitle: {
    mb: 2,
  },
};
