import * as React from "react";
import {
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

export default function RadioButtonsGroup() {
  return (
    <Box>
      <Typography component={"h1"} variant="h5">
        Generate Report
      </Typography>
      <br />
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
          Which report you want to generate
        </FormLabel>
        <br />
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          //defaultValue="0"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="0"
            control={<Radio />}
            label="Total leaves in given period by department"
          />
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="Employee grouped by job title"
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="Employee grouped by pay grade"
          />
          <FormControlLabel
            value="3"
            control={<Radio />}
            label="Employee grouped by department"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
