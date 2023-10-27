import { Box, Tab, Tabs, Typography } from "@mui/material";
import TabPanel from "../../components/TabPanel";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { mockDataTeam } from "../../data/MockData2";
import React from "react";
import axios from "axios";

// const columns = [
//   {
//     field: "id",
//     headerName: "ID",
//     type: "number",
//     headerAlign: "left",
//     align: "left",
//     flex: 0.5,
//   },
//   {
//     field: "name",
//     headerName: "Name",
//     flex: 1,
//   },
//   {
//     field: "address",
//     headerName: "Address",
//     flex: 2,
//   },
//   {
//     field: "maritalStatus",
//     headerName: "Marital Status",
//   },
//   {
//     field: "dob",
//     headerName: "DOB",
//     flex: 1,
//   },
//   {
//     field: "gender",
//     headerName: "Gender",
//     flex: 1,
//   },

//   {
//     field: "department",
//     headerName: "Department",
//     flex: 1,
//   },
//   {
//     field: "designation",
//     headerName: "Designation",
//     flex: 1,
//   },
//   {
//     field: "payGrade",
//     headerName: "Pay Grade",
//     type: "number",
//     headerAlign: "left",
//     align: "left",

//     flex: 0.8,
//   },
//   {
//     field: "status",
//     headerName: "Status",
//     flex: 1,
//   },
// ];

const columns = [
  {
    field: "emp_id",
    headerName: "ID",
    // type: "number",
    headerAlign: "left",
    align: "left",
    flex: 0.5,
  },
  {
    field: "first_name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "address",
    headerName: "Address",
    flex: 2,
  },
  {
    field: "marital_status",
    headerName: "Marital Status",
  },
  {
    field: "birth_date",
    headerName: "DOB",
    flex: 1,
  },
  // {
  //   field: "gender",
  //   headerName: "Gender",
  //   flex: 1,
  // },

  {
    field: "dept_name",
    headerName: "Department",
    flex: 1,
  },
  {
    field: "job_title",
    headerName: "Designation",
    flex: 1,
  },
  // {
  //   field: "payGrade",
  //   headerName: "Pay Grade",
  //   type: "number",
  //   headerAlign: "left",
  //   align: "left",

  //   flex: 0.8,
  // },
  {
    field: "status_name",
    headerName: "Status",
    flex: 1,
  },
];

const columnsLeaveApplications = [
  {
    field: "req_id",
    headerName: "ID",
    // type: "number",
    headerAlign: "left",
    align: "left",
    flex: 0.5,
  },
  {
    field: "leave_type_id",
    headerName: "Leave Type",
    flex: 1,
  },
  {
    field: "reason",
    headerName: "Reason",
    flex: 2,
  },
  {
    field: "start_date",
    headerName: "From",
  },
  {
    field: "end_date",
    headerName: "To",
    flex: 1,
  },
  // {
  //   field: "gender",
  //   headerName: "Gender",
  //   flex: 1,
  // },

  {
    field: "created_at",
    headerName: "Requested On",
    flex: 1,
  },
  {
    field: "supervisor_id",
    headerName: "Supervisor",
    flex: 1,
  },
  // {
  //   field: "payGrade",
  //   headerName: "Pay Grade",
  //   type: "number",
  //   headerAlign: "left",
  //   align: "left",

  //   flex: 0.8,
  // },
  {
    field: "req_status",
    headerName: "Status",
    flex: 1,
  },
];

function Employee() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [employees, setEmployees] = useState([]);
  const [leaveApplications, setLeaveApplications] = useState([]);

  useEffect(() => {
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
      .get("http://localhost:1234/leaveApplication/bySupervisorId/e-001", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setLeaveApplications(response.data);
        }
      });
  }, []);

  console.log(employees);

  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        Subordinate Information
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Subordinate List" id="tab-0" />
          <Tab label="Leave Requests" id="tab-1" />
        </Tabs>

        <TabPanel value={value} index={0}>
          {/* <DataGrid
            rows={mockDataTeam}
            columns={columns}
            PageSize={25}
            rowsPerPageOption={[25]}
            autoHeight
            rowHeight={70}
            components={{ Toolbar: GridToolbar }}
          /> */}
          <DataGrid
            rows={employees}
            getRowId={(row) => row.emp_id}
            columns={columns}
            PageSize={25}
            rowsPerPageOption={[25]}
            autoHeight
            rowHeight={70}
            components={{ Toolbar: GridToolbar }}
          />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <DataGrid
            rows={leaveApplications}
            getRowId={(row) => row.req_id}
            columns={columnsLeaveApplications}
            PageSize={25}
            rowsPerPageOption={[25]}
            autoHeight
            rowHeight={70}
            components={{ Toolbar: GridToolbar }}
          />
        </TabPanel>
      </Box>
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
