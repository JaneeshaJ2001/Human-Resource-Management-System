import {
  Box,
  Paper,
  Tab,
  Tabs,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import TabPanel from "../../components/TabPanel";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { mockDataDependent } from "../../data/MockData2";
import EmployeeSummary from "./EmployeeSummary";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddDependent from "./AddDependent";
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
  const [openPopup, setOpenPopup] = useState(false);

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
        <Button
          variant="outlined"
          startIcon={<AddOutlinedIcon />}
          sx={{ mb: 4 }}
          onClick={() => setOpenPopup(true)}
        >
          Add Dependent
        </Button>
        <Paper>
          <DataGrid
            rows={mockDataDependent}
            columns={columns2}
            PageSize={25}
            rowsPerPageOption={[25]}
            autoHeight
            rowHeight={70}
          />
        </Paper>
      </TabPanel>
      <Dialog open={openPopup} maxWidth="xl">
        <DialogTitle>
          <div style={{ display: "flex", alignContent: "space-between" }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Add Dependent
            </Typography>
            <Button
              onClick={() => {
                setOpenPopup(false);
              }}
            >
              <CloseOutlinedIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <AddDependent />
        </DialogContent>
      </Dialog>
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
