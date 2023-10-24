import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataDepartment } from "../../data/mockData";
import Header from "../../components/Header";
import React from "react";

const Department = () => {
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
      field: "relationship",
      headerName: "Relationship",
      cellClassName: "name-column--cell",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 2,
      cellClassName: "name-column--cell",
    },

    {
      field: "mobilePhone",
      headerName: "Mobile Phone",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "homePhone",
      headerName: "Home Phone",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "edditedBy",
      headerName: "Edited By",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "action",
      headerName: "Action",

      flex: 1,
      renderCell: ({ row: { action } }) => {
        return (
          <Box
            width="75%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="15px"
            backgroundColor={
              action === "active"
                ? colors.greenAccent[600]
                : colors.redAccent[600]
            }
          >
            <Typography color={colors.grey[100]}>{action}</Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Departments" />
      <Box
        m="40px 0 0 0"
        height="42vh"
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
        }}
      >
        <DataGrid rows={mockDataDepartment} columns={columns} />
      </Box>
    </Box>
  );
};

export default Department;
