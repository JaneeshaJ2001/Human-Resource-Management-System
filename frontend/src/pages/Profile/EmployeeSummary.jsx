import {
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Input,
  Typography,
} from "@mui/material";
import React from "react";

function EmployeeSummary() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom component="div">
            Work Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl disabled variant="standard">
                <InputLabel htmlFor="component-disabled">
                  Employee ID
                </InputLabel>
                <Input id="component-disabled" defaultValue="12345" />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl disabled variant="standard">
                <InputLabel htmlFor="component-disabled">Department</InputLabel>
                <Input id="component-disabled" defaultValue="Accounting" />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl disabled variant="standard">
                <InputLabel htmlFor="component-disabled">
                  Designation
                </InputLabel>
                <Input
                  id="component-disabled"
                  defaultValue="Assistant Accounter"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl disabled variant="standard">
                <InputLabel htmlFor="component-disabled">
                  Date of Joined
                </InputLabel>
                <Input id="component-disabled" defaultValue="2005/ 05/ 15" />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl disabled variant="standard">
                <InputLabel htmlFor="component-disabled">Status</InputLabel>
                <Input id="component-disabled" defaultValue="Active" />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl disabled variant="standard">
                <InputLabel htmlFor="component-disabled">Pay Grade</InputLabel>
                <Input id="component-disabled" defaultValue="Grade 2" />
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom component="div">
            Personal Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl disabled variant="standard">
                <InputLabel htmlFor="component-disabled">Title</InputLabel>
                <Input id="component-disabled" defaultValue="Mr" />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl disabled variant="standard">
                <InputLabel htmlFor="component-disabled">Name</InputLabel>
                <Input id="component-disabled" defaultValue="Smith Jones" />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl disabled variant="standard">
                <InputLabel htmlFor="component-disabled">Address</InputLabel>
                <Input
                  id="component-disabled"
                  defaultValue="No: 15, Flower Road, Colombo"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl disabled variant="standard">
                <InputLabel htmlFor="component-disabled">
                  Date of Birth
                </InputLabel>
                <Input id="component-disabled" defaultValue="1995/ 01/ 16" />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl disabled variant="standard">
                <InputLabel htmlFor="component-disabled">
                  Marital Status
                </InputLabel>
                <Input id="component-disabled" defaultValue="Married" />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl disabled variant="standard">
                <InputLabel htmlFor="component-disabled">
                  Contact Number
                </InputLabel>
                <Input id="component-disabled" defaultValue="0776212147" />
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom component="div">
            Emergency Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl disabled variant="standard">
                <InputLabel htmlFor="component-disabled">
                  Contact Name
                </InputLabel>
                <Input id="component-disabled" defaultValue="Henry Jones" />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl disabled variant="standard">
                <InputLabel htmlFor="component-disabled">
                  Relationship
                </InputLabel>
                <Input id="component-disabled" defaultValue="Daughter" />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl disabled variant="standard">
                <InputLabel htmlFor="component-disabled">
                  Mobile Number
                </InputLabel>
                <Input id="component-disabled" defaultValue="0776212148" />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl disabled variant="standard">
                <InputLabel htmlFor="component-disabled">
                  Land Number
                </InputLabel>
                <Input id="component-disabled" defaultValue="0112865896" />
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default EmployeeSummary;
