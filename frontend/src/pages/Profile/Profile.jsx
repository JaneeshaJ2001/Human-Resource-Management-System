import { Box, Tab, Tabs, Typography } from "@mui/material";
import TabPanel from "../../components/TabPanel";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { mockDataDependent } from "../../data/MockData2";
import EmployeeSummary from "./EmployeeSummary";
import React from "react";

const columns1 = [
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
    field: "relationship",
    headerName: "Relationship",
  },
  {
    field: "address",
    headerName: "Address",
    flex: 2,
  },

  {
    field: "mobilePhone",
    headerName: "Mobile Phone",
    flex: 1,
  },
  {
    field: "homePhone",
    headerName: "Home Phone",
    flex: 1,
  },

  {
    field: "edditedBy",
    headerName: "Edited By",
    flex: 1,
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
  },

  {
    field: "action",
    headerName: "Action",

    flex: 1,
  },
];

const columns2 = [
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
    field: "relationship",
    headerName: "Relationship",
  },
  {
    field: "address",
    headerName: "Address",
    flex: 2,
  },

  {
    field: "mobilePhone",
    headerName: "Mobile Phone",
    flex: 1,
  },
  {
    field: "homePhone",
    headerName: "Home Phone",
    flex: 1,
  },

  {
    field: "edditedBy",
    headerName: "Edited By",
    flex: 1,
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
  },

  {
    field: "action",
    headerName: "Action",

    flex: 1,
  },
];

function Profile() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        Employee Section
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Employee Summary" id="tab-0" />

          <Tab label="Dependent details" id="tab-1" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <EmployeeSummary />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <DataGrid
          rows={mockDataDependent}
          columns={columns2}
          PageSize={25}
          rowsPerPageOption={[25]}
          autoHeight
          rowHeight={70}
        />
      </TabPanel>
    </Box>
  );
}

export default Profile;

/** @type {import("@mui/material").SxProps} */
const styles = {
  pageTitle: {
    mb: 2,
  },
};
