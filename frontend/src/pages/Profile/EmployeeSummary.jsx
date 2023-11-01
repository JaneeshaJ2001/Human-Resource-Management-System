import {
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import moment from "moment";
import axios from "axios";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

function EmployeeSummary() {
  const { authState } = useContext(AuthContext);

  const [personalDetails, setPersonalDetails] = useState({});
  const [emergencyDetails, setEmergencyDetails] = useState({});

  const [editEmergencyDetails, setEditEmergencyDetails] = useState({
    status: false,
    req: null,
    contact_name: "",
    relationship: "",
    Mobile_phone: "",
    Home_phone: "",
    PB_number: "",
    street_name: "",
    city_name: "",
    country: "",
  });
  const handleChangeEditEmergency = (e) => {
    setEditEmergencyDetails({
      ...editEmergencyDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitEditEmergency = (e) => {
    e.preventDefault();
    // console.log(editEmergencyDetails);
    if (editEmergencyDetails.req === "post") {
      axios
        .post("http://localhost:1234/emergency", editEmergencyDetails, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            alert("Emergency contact updated!");
            setEditEmergencyDetails({
              status: false,
              req: null,
              contact_name: "",
              relationship: "",
              Mobile_phone: "",
              Home_phone: "",
              PB_number: "",
              street_name: "",
              city_name: "",
              country: "",
            });
            window.location.reload();
          }
        });
    } else if (editEmergencyDetails.req === "put") {
      axios
        .put("http://localhost:1234/emergency", editEmergencyDetails, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            alert("Emergency contact updated!");
            setEditEmergencyDetails({
              status: false,
              req: null,
              contact_name: "",
              relationship: "",
              Mobile_phone: "",
              Home_phone: "",
              PB_number: "",
              street_name: "",
              city_name: "",
              country: "",
            });
            window.location.reload();
          }
        });
    }
  };

  useEffect(() => {
    if (authState.status && authState.role_id !== "") {
      setPersonalDetails({ ...authState.personal_details });
      axios
        .get(`http://localhost:1234/emergency/byId/${authState.emp_id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            setEmergencyDetails(response.data[0]);
          }
        });
    }
  }, [authState]);

  // console.log(authState);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom component="div">
            Work Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl
                disabled
                variant="standard"
                style={{ width: "100%" }}
              >
                <InputLabel htmlFor="component-disabled">
                  Employee ID
                </InputLabel>
                <Input
                  id="component-disabled"
                  value={personalDetails.emp_id}
                  defaultValue={" "}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                disabled
                variant="standard"
                style={{ width: "100%" }}
              >
                <InputLabel htmlFor="component-disabled">Department</InputLabel>
                <Input
                  id="component-disabled"
                  value={personalDetails.dept_name}
                  defaultValue=" "
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                disabled
                variant="standard"
                style={{ width: "100%" }}
              >
                <InputLabel htmlFor="component-disabled">
                  Designation
                </InputLabel>
                <Input
                  id="component-disabled"
                  value={personalDetails.job_title}
                  defaultValue=" "
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                disabled
                variant="standard"
                style={{ width: "100%" }}
              >
                <InputLabel htmlFor="component-disabled">
                  Date of Joined
                </InputLabel>
                <Input
                  id="component-disabled"
                  value={
                    personalDetails.created_at &&
                    moment(personalDetails.created_at).format("DD MMM YYYY")
                  }
                  defaultValue=" "
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                disabled
                variant="standard"
                style={{ width: "100%" }}
              >
                <InputLabel htmlFor="component-disabled">Status</InputLabel>
                <Input
                  id="component-disabled"
                  value={personalDetails.status_name}
                  defaultValue=" "
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                disabled
                variant="standard"
                style={{ width: "100%" }}
              >
                <InputLabel htmlFor="component-disabled">Pay Grade</InputLabel>
                <Input
                  id="component-disabled"
                  value={personalDetails.pay_grade}
                  defaultValue=" "
                />
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
              <FormControl
                disabled
                variant="standard"
                style={{ width: "100%" }}
              >
                <InputLabel htmlFor="component-disabled">First Name</InputLabel>
                <Input
                  id="component-disabled"
                  value={personalDetails.first_name}
                  defaultValue=" "
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                disabled
                variant="standard"
                style={{ width: "100%" }}
              >
                <InputLabel htmlFor="component-disabled">Last Name</InputLabel>
                <Input
                  id="component-disabled"
                  value={personalDetails.last_name}
                  defaultValue=" "
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                disabled
                variant="standard"
                style={{ width: "100%" }}
              >
                <InputLabel htmlFor="component-disabled">
                  Marital Status
                </InputLabel>
                <Input
                  id="component-disabled"
                  value={personalDetails.marital_status}
                  defaultValue=" "
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                disabled
                variant="standard"
                style={{ width: "100%" }}
              >
                <InputLabel htmlFor="component-disabled">
                  Date of Birth
                </InputLabel>
                <Input
                  id="component-disabled"
                  value={
                    personalDetails.birth_date &&
                    moment(personalDetails.birth_date).format("DD MMM YYYY")
                  }
                  defaultValue=" "
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl
                disabled
                variant="standard"
                style={{ width: "100%" }}
              >
                <InputLabel htmlFor="component-disabled">Address</InputLabel>
                <Input
                  id="component-disabled"
                  value={
                    personalDetails.emp_id &&
                    `${personalDetails.PB_number}, ${personalDetails.street_name}, ${personalDetails.city_name}, ${personalDetails.country}`
                  }
                  defaultValue=" "
                />
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
          <Button
            variant="outlined"
            startIcon={<AddOutlinedIcon />}
            sx={{ mb: 4 }}
            onClick={() =>
              setEditEmergencyDetails({
                status: true,
                req: emergencyDetails ? "put" : "post",
                contact_name: emergencyDetails
                  ? emergencyDetails.contact_name
                  : "",
                relationship: emergencyDetails
                  ? emergencyDetails.relationship
                  : "",
                Mobile_phone: emergencyDetails
                  ? emergencyDetails.Mobile_phone
                  : "",
                Home_phone: emergencyDetails ? emergencyDetails.Home_phone : "",
                PB_number: emergencyDetails ? emergencyDetails.PB_number : "",
                street_name: emergencyDetails
                  ? emergencyDetails.street_name
                  : "",
                city_name: emergencyDetails ? emergencyDetails.city_name : "",
                country: emergencyDetails ? emergencyDetails.country : "",
              })
            }
          >
            Edit Emergency Details
          </Button>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl
                disabled
                variant="standard"
                style={{ width: "100%" }}
              >
                <InputLabel htmlFor="component-disabled">
                  Contact Name
                </InputLabel>
                <Input
                  id="component-disabled"
                  value={emergencyDetails && emergencyDetails.contact_name}
                  defaultValue=" "
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                disabled
                variant="standard"
                style={{ width: "100%" }}
              >
                <InputLabel htmlFor="component-disabled">
                  Relationship
                </InputLabel>
                <Input
                  id="component-disabled"
                  value={emergencyDetails && emergencyDetails.relationship}
                  defaultValue=" "
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                disabled
                variant="standard"
                style={{ width: "100%" }}
              >
                <InputLabel htmlFor="component-disabled">
                  Mobile Number
                </InputLabel>
                <Input
                  id="component-disabled"
                  value={emergencyDetails && emergencyDetails.Mobile_phone}
                  defaultValue=" "
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                disabled
                variant="standard"
                style={{ width: "100%" }}
              >
                <InputLabel htmlFor="component-disabled">
                  Land Number
                </InputLabel>
                <Input
                  id="component-disabled"
                  value={emergencyDetails && emergencyDetails.Home_phone}
                  defaultValue=" "
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                disabled
                variant="standard"
                style={{ width: "100%" }}
              >
                <InputLabel htmlFor="component-disabled">Address</InputLabel>
                <Input
                  id="component-disabled"
                  value={
                    emergencyDetails &&
                    emergencyDetails.PB_number &&
                    `${emergencyDetails.PB_number}, ${emergencyDetails.street_name}, ${emergencyDetails.city_name}, ${emergencyDetails.country}`
                  }
                  defaultValue=" "
                />
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        <Dialog open={editEmergencyDetails.status} maxWidth="xl">
          <DialogTitle>
            <div style={{ display: "flex", alignContent: "space-between" }}>
              <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                Edit Details
              </Typography>
              <Button
                onClick={() => {
                  setEditEmergencyDetails({
                    status: false,
                    req: null,
                    contact_name: "",
                    relationship: "",
                    Mobile_phone: "",
                    Home_phone: "",
                    PB_number: "",
                    street_name: "",
                    city_name: "",
                    country: "",
                  });
                }}
              >
                <CloseOutlinedIcon />
              </Button>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <form onSubmit={handleSubmitEditEmergency}>
              <Box sx={{ p: 3 }}>
                <Grid>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="contact_name"
                    label="Name"
                    name="contact_name"
                    style={{ width: "100%" }}
                    autoFocus
                    value={editEmergencyDetails.contact_name}
                    onChange={handleChangeEditEmergency}
                  />
                </Grid>
                <Grid>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="relationship"
                    label="Relationship"
                    name="relationship"
                    style={{ width: "100%" }}
                    autoFocus
                    value={editEmergencyDetails.relationship}
                    onChange={handleChangeEditEmergency}
                  />
                </Grid>
                <Grid>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="Mobile_phone"
                    label="Mobile No"
                    name="Mobile_phone"
                    style={{ width: "100%" }}
                    autoFocus
                    value={editEmergencyDetails.Mobile_phone}
                    onChange={handleChangeEditEmergency}
                  />
                </Grid>
                <Grid>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="Home_phone"
                    label="Home No"
                    name="Home_phone"
                    style={{ width: "100%" }}
                    autoFocus
                    value={editEmergencyDetails.Home_phone}
                    onChange={handleChangeEditEmergency}
                  />
                </Grid>
                <Grid>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="PB_number"
                    label="PB No"
                    name="PB_number"
                    style={{ width: "100%" }}
                    autoFocus
                    value={editEmergencyDetails.PB_number}
                    onChange={handleChangeEditEmergency}
                  />
                </Grid>
                <Grid>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="street_name"
                    label="Street"
                    name="street_name"
                    style={{ width: "100%" }}
                    autoFocus
                    value={editEmergencyDetails.street_name}
                    onChange={handleChangeEditEmergency}
                  />
                </Grid>
                <Grid>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="city_name"
                    label="City"
                    name="city_name"
                    style={{ width: "100%" }}
                    autoFocus
                    value={editEmergencyDetails.city_name}
                    onChange={handleChangeEditEmergency}
                  />
                </Grid>
                <Grid>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="country"
                    label="Country"
                    name="country"
                    style={{ width: "100%" }}
                    autoFocus
                    value={editEmergencyDetails.country}
                    onChange={handleChangeEditEmergency}
                  />
                </Grid>
                <Grid>
                  <Button
                    type="submit"
                    style={{ width: "100%" }}
                    variant="contained"
                  >
                    Edit Details
                  </Button>
                </Grid>
              </Box>
            </form>
          </DialogContent>
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default EmployeeSummary;
