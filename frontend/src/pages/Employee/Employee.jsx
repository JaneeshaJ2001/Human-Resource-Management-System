import { Box, Tab, Tabs, Typography } from "@mui/material";
import TabPanel from "../../components/TabPanel";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { mockDataTeam } from "../../data/MockData2";

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
  },
  {
    field: "address",
    headerName: "Address",
    flex: 2,
  },
  {
    field: "maritalStatus",
    headerName: "Marital Status",
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
    type: "number",
    headerAlign: "left",
    align: "left",

    flex: 0.8,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
  },
];

function Employee() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <DataGrid
            rows={mockDataTeam}
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
            rows={mockDataTeam}
            columns={columns}
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
