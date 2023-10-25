import { Box, Tab, Tabs, Typography } from "@mui/material";
import TabPanel from "../../components/TabPanel";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { mockDataContact, mockDataDependent } from "../../data/MockData2";
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

  const { emp_id } = useParams();

  const [employeeInfo, setEmployeeInfo] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [dependent, setDependent] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:1234/employee/byId/${emp_id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          console.log(response.data); // logging
          setEmployeeInfo(response.data);
        }
      });

    axios
      .get(`http://localhost:1234/emergency/byId/${emp_id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          console.log(response.data); // logging
          setEmergencyContacts(response.data);
        }
      });

    axios
      .get(`http://localhost:1234/dependent/byId/${emp_id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          console.log(response.data); // logging
          setDependent(response.data);
        }
      });
  }, []);

  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        Employee Section
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Employee Summary" id="tab-0" />
          <Tab label="Emergency Contacts" id="tab-1" />
          <Tab label="Dependent details" id="tab-2" />
        </Tabs>

        <TabPanel value={value} index={0}></TabPanel>

        <TabPanel value={value} index={1}>
          <DataGrid
            rows={mockDataContact}
            columns={columns1}
            PageSize={25}
            rowsPerPageOption={[25]}
            autoHeight
            rowHeight={70}
          />
        </TabPanel>

        <TabPanel value={value} index={2}>
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
