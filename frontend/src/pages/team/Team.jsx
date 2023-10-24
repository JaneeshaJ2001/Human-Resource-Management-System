import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import React from "react";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "maritalStatus",
      headerName: "Marital Status",
      cellClassName: "name-column--cell",
    },
    {
      field: "dob",
      headerName: "DOB",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "department",
      headerName: "Department",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "designation",
      headerName: "Designation",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "payGrade",
      headerName: "Pay Grade",
      type: "number",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
      flex: 0.8,
    },
    {
      field: "status",
      headerName: "Status",

      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="75%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="15px"
            backgroundColor={
              status === "active"
                ? colors.greenAccent[600]
                : colors.redAccent[600]
            }
          >
            <Typography color={colors.grey[100]}>{status}</Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            //backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataTeam}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Team;
