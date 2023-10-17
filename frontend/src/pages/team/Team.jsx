import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { tempDataTeam } from "../../data/tempDataTeam";
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },

    {
      field: "user",
      headerName: "User",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        return (
          <Box display="flex" alignItems="center">
            <img
              alt="profile-user"
              width="32px"
              height="32px"
              src={params.row.avatar}
              object-fit="cover"
              style={{ borderRadius: "50%" }}
            />
            {params.row.name}
          </Box>
        );
      },
    },

    {
      field: "address",
      headerName: "Address",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "maritalStatus",
      headerName: "Marital Status ",
      flex: 1,
    },
    {
      field: "dob",
      headerName: "DOB",
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "noOfDependents",
      headerName: "No Of Dependents",
      flex: 1,
    },
    {
      field: "doj",
      headerName: "DOJ",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "designation",
      headerName: "Designation",
      flex: 1,
    },
    {
      field: "payGrade",
      headerName: "Pay Grade",
      flex: 1,
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === "active"
                ? colors.greenAccent[600]
                : status === "not active"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {status}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={tempDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
