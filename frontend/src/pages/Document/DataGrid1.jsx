import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
  { field: "emp_id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    valueGetter: (params) => {
      return `${params.row.first_name || ""} ${params.row.last_name || ""}`;
    },
  },
  {
    field: "job_title",
    headerName: "Designation",
    width: 150,
  },
  {
    field: "pay_grade",
    headerName: "Pay Grade",
    width: 100,
  },
  {
    field: "status_name",
    headerName: "Status",
    width: 110,
  },
  {
    field: "dept_name",
    headerName: "Department",
    width: 150,
  },
  {
    field: "SupervisorId",
    headerName: "Supervisor",
    width: 110,
  },
  {
    field: "branch_name",
    headerName: "Branch",
    width: 110,
  },
];

// const rows = [
//   {
//     id: 1,
//     name: "Snow",
//     designation: "Jon",
//     status: 35,
//     department: "IT",
//     supervisor: "Raj",
//     branch: "Mumbai",
//   },
//   {
//     id: 2,
//     name: "Snow",
//     designation: "Jon",
//     status: 35,
//     department: "IT",
//     supervisor: "Raj",
//     branch: "Mumbai",
//   },
//   {
//     id: 3,
//     name: "Snow",
//     designation: "Jon",
//     status: 35,
//     department: "IT",
//     supervisor: "Raj",
//     branch: "Mumbai",
//   },
//   {
//     id: 4,
//     name: "Snow",
//     designation: "Jon",
//     status: 35,
//     department: "IT",
//     supervisor: "Raj",
//     branch: "Mumbai",
//   },
//   {
//     id: 5,
//     name: "Snow",
//     designation: "Jon",
//     status: 35,
//     department: "IT",
//     supervisor: "Raj",
//     branch: "Mumbai",
//   },
//   {
//     id: 6,
//     name: "Snow",
//     designation: "Jon",
//     status: 35,
//     department: "IT",
//     supervisor: "Raj",
//     branch: "Mumbai",
//   },
//   {
//     id: 7,
//     name: "Snow",
//     designation: "Jon",
//     status: 35,
//     department: "IT",
//     supervisor: "Raj",
//     branch: "Mumbai",
//   },
// ];

export default function DataGridDemo({ result }) {
  return (
    <Box sx={{ height: 407, width: "100%" }}>
      <DataGrid
        rows={result}
        getRowId={(row) => row.emp_id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection={false}
        disableRowSelectionOnClick
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}
