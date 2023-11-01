import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
  {
    field: "leave_type_name",
    headerName: "Leave Type",
    // width: 150,
    flex: 1,
  },
  {
    field: "total_days_within_range",
    headerName: "Total Leaves",
    // width: 110,
    flex: 1,
  },
];

export default function DataGridDemo({ result }) {
  return (
    <Box sx={{ height: 407, width: "100%" }}>
      <DataGrid
        rows={result}
        getRowId={(row) => row.leave_type_name}
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
