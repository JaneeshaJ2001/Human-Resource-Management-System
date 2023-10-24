import {
  Typography,
  Box,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import React from "react";
import { useState } from "react";

//const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Document() {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        Generate Report
      </Typography>

      <Typography sx={styles.pageSubHeading} variant="h7">
        Which report you want to generate
      </Typography>

      <FormGroup>
        <FormControlLabel
          required
          control={
            <Checkbox
              //checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
              color="primary"
            ></Checkbox>
          }
          label="Total leaves in given period by department"
        />
        <FormControlLabel
          required
          control={
            <Checkbox
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Employee grouped by job title"
        />

        <FormControlLabel
          required
          control={
            <Checkbox
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Employee grouped by pay grade"
        />

        <FormControlLabel
          required
          control={
            <Checkbox
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Employee grouped by department"
        />
      </FormGroup>
    </Box>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  pageTitle: {
    mb: 2,
  },

  pageSubHeading: {
    mb: 3,
  },
};

export default Document;
