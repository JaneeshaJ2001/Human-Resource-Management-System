import { Box } from "@mui/material";
import React from "react";

function TabPanel({ children, value, index, mt = 4 }) {
  return (
    <div hidden={value !== index} id={"simple-tabpanel-${index}"}>
      {value === index && <Box sx={{ mt }}>{children}</Box>}
    </div>
  );
}

export default TabPanel;
