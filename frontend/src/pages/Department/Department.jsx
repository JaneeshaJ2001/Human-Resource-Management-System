import { Box, Tab, Tabs, Typography } from "@mui/material";
import TabPanel from "../../components/TabPanel";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { mockDataDepartment } from "../../data/MockData2";
import React from "react";
import axios from "axios";

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

function Department() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1234/department", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setDepartments(response.data);
        }
      });
  }, []);

  console.log(departments);

  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        Department Section
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Current Departments" id="tab-0" />
          <Tab label="Add Department" id="tab-1" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <DataGrid
            rows={mockDataDepartment}
            columns={columns}
            PageSize={25}
            rowsPerPageOption={[25]}
            autoHeight
            rowHeight={70}
          />
        </TabPanel>

        <TabPanel value={value} index={1}></TabPanel>
      </Box>
    </Box>
  );
}

export default Department;

/** @type {import("@mui/material").SxProps} */
const styles = {
  pageTitle: {
    mb: 2,
  },
};
