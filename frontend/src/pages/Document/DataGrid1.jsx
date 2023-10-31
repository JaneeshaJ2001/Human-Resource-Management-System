import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "designation",
    headerName: "Designation",
    width: 150,
    editable: true,
  },

  {
    field: "status",
    headerName: "Status",

    width: 110,
    editable: true,
  },
  {
    field: "department",
    headerName: "Department",

    width: 110,
    editable: true,
  },
  {
    field: "supervisor",
    headerName: "Supervisor",

    width: 110,
    editable: true,
  },
  {
    field: "branch",
    headerName: "Branch",

    width: 110,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    name: "Snow",
    designation: "Jon",
    status: 35,
    department: "IT",
    supervisor: "Raj",
    branch: "Mumbai",
  },
  {
    id: 2,
    name: "Snow",
    designation: "Jon",
    status: 35,
    department: "IT",
    supervisor: "Raj",
    branch: "Mumbai",
  },
  {
    id: 3,
    name: "Snow",
    designation: "Jon",
    status: 35,
    department: "IT",
    supervisor: "Raj",
    branch: "Mumbai",
  },
  {
    id: 4,
    name: "Snow",
    designation: "Jon",
    status: 35,
    department: "IT",
    supervisor: "Raj",
    branch: "Mumbai",
  },
  {
    id: 5,
    name: "Snow",
    designation: "Jon",
    status: 35,
    department: "IT",
    supervisor: "Raj",
    branch: "Mumbai",
  },
  {
    id: 6,
    name: "Snow",
    designation: "Jon",
    status: 35,
    department: "IT",
    supervisor: "Raj",
    branch: "Mumbai",
  },
  {
    id: 7,
    name: "Snow",
    designation: "Jon",
    status: 35,
    department: "IT",
    supervisor: "Raj",
    branch: "Mumbai",
  },
];

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 407, width: "100%" }}>
      <DataGrid
        rows={rows}
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
