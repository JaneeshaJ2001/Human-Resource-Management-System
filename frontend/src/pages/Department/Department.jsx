import {
  Box,
  Button,
  Fab,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataDepartment } from "../../data/MockData2";
import AddDepartment from "./AddDepartment";
import React from "react";
import { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

/*
<Fab
        variant="extended"
        size="medium"
        color="primary"
        onClick={() => setOpenPopup(true)}
      >
        <AddOutlinedIcon sx={{ mr: 1 }} />
        Add Department
      </Fab>
      */

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
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        Department Section
      </Typography>

      <Button
        variant="outlined"
        startIcon={<AddOutlinedIcon />}
        sx={{ mb: 4 }}
        onClick={() => setOpenPopup(true)}
      >
        Add Department
      </Button>

      <DataGrid
        rows={mockDataDepartment}
        columns={columns}
        PageSize={25}
        rowsPerPageOption={[25]}
        autoHeight
        rowHeight={70}
      />
      <Dialog open={openPopup} maxWidth="xl">
        <DialogTitle>
          <div style={{ display: "flex", alignContent: "space-between" }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Add Department
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
          <AddDepartment />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Department;

/** @type {import("@mui/material").SxProps} */
const styles = {
  pageTitle: {
    mb: 5,
  },
};
