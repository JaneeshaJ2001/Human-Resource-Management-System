import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import TabPanel from "../../components/TabPanel";
import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EmployeeSummary from "./EmployeeSummary";
import moment from "moment";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const columnsForDependents = [
  {
    field: "dependent_id",
    headerName: "ID",
    flex: 1,
  },

  {
    field: "name",
    headerName: "Name",
    // valueGetter: (params) => {
    //   return `${params.row.first_name || ''} ${params.row.last_name || ''}`;
    // },
    flex: 1,
  },

  {
    field: "gender",
    headerName: "Gender",
    flex: 1,
  },
  {
    field: "relationship",
    headerName: "Relationship",
    flex: 1,
  },
  {
    field: "b_date",
    headerName: "Birth Day",
    flex: 1,
    valueFormatter: (params) => moment(params?.value).format("DD-MM-YYYY"),
  },
  {
    field: "address",
    headerName: "Address",
    flex: 2,
  },
];

const columnsForContacts = [
  {
    field: "contact_number",
    headerName: "Contact Number",
    flex: 1,
  },
  {
    field: "updated_at",
    headerName: "Last Updated",
    flex: 1,
    valueFormatter: (params) =>
      moment(params?.value).format("DD MMM YYYY - hh:mm A"),
  },
];

function ProfileForOthers() {
  const [value, setValue] = useState(0);

  const [openPopupAddContact, setOpenPopupAddContact] = useState(false);
  const [contactToAdd, setContactToAdd] = useState();
  let allContactOnly = [];
  const addContact = (e) => {
    e.preventDefault();
    if (allContactOnly.includes(contactToAdd)) {
      alert("Contact already exists");
    } else {
      axios
        .post(
          "http://localhost:1234/contact",
          { contact_number: contactToAdd },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            alert("Contact added successfully");
            window.location.reload();
            // console.log(response.data);
          }
        });
    }
  };

  const [openPopupAddDependent, setOpenPopupAddDependent] = useState(false);
  const [dependentToAdd, setDependentToAdd] = useState({
    name: "",
    birth_date: "",
    gender: "",
    relationship: "",
    PB_number: "",
    street_name: "",
    city_name: "",
    country: "",
  });
  const handleChangeAddDependent = (e) => {
    setDependentToAdd({
      ...dependentToAdd,
      [e.target.name]: e.target.value,
    });
  };
  const addDependent = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:1234/dependent", dependentToAdd, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          alert("Dependent successfully added");
          window.location.reload();
        }
      });
  };

  const { authState } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [dependents, setDependents] = useState([]);
  const [contacts, setContacts] = useState([]);

  const { emp_id } = useParams();

  useEffect(() => {
    if (!authState.status) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:1234/employee", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
            navigate("/profile");
          } else {
            const allEmps = response.data.map((emp) => emp.emp_id);
            if (!allEmps.includes(emp_id)) {
              navigate("/profile");
            }
          }
        });
    }

    if (authState.role_id === "r-004" || authState.emp_id === emp_id) {
      navigate("/profile");
    } else if (authState.role_id === "r-003") {
      axios
        .get(
          `http://localhost:1234/employee/bySupervisorId/${authState.emp_id}`,
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            // console.log(response.data);
            const subs = response.data.map((sub) => sub.emp_id);
            if (subs && subs.includes(emp_id)) {
              axios
                .get(`http://localhost:1234/dependent/byId/${emp_id}`, {
                  headers: { accessToken: localStorage.getItem("accessToken") },
                })
                .then((response) => {
                  if (response.data.error) {
                    console.log(response.data.error);
                  } else {
                    // console.log(response.data);
                    setDependents(response.data);
                  }
                });
              axios
                .get(`http://localhost:1234/contact/byEmpId/${emp_id}`, {
                  headers: { accessToken: localStorage.getItem("accessToken") },
                })
                .then((response) => {
                  if (response.data.error) {
                    console.log(response.data.error);
                    navigate("/profile");
                  } else {
                    // console.log(response.data);
                    setContacts(response.data);
                  }
                });
              allContactOnly = contacts.map(
                (contact) => contact.contact_number
              );
            } else {
              navigate("/profile");
            }
          }
        });
    } else {
      axios
        .get(`http://localhost:1234/dependent/byId/${emp_id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            // console.log(response.data);
            setDependents(response.data);
          }
        });
      axios
        .get(`http://localhost:1234/contact/byEmpId/${emp_id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            // console.log(response.data);
            setContacts(response.data);
          }
        });
      allContactOnly = contacts.map((contact) => contact.contact_number);
    }
  }, [authState]);

  // console.log(authState)

  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        {`Employee Section of ${emp_id}`}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Employee Summary" id="tab-0" />
          <Tab label="Contact Info" id="tab-1" />
          <Tab label="Dependent Details" id="tab-2" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <EmployeeSummary />
        </TabPanel>

        <TabPanel value={value} index={1}>
          {/* <Button
            variant="outlined"
            startIcon={<AddOutlinedIcon />}
            sx={{ mb: 4 }}
            onClick={() => setOpenPopupAddContact(true)}
          >
            Add Contact
          </Button> */}
          <DataGrid
            rows={contacts}
            getRowId={(row) => row.contact_number}
            columns={columnsForContacts}
            PageSize={25}
            rowsPerPageOption={[25]}
            autoHeight
            rowHeight={70}
          />
          <Dialog open={openPopupAddContact} maxWidth="xl">
            <DialogTitle>
              <div style={{ display: "flex", alignContent: "space-between" }}>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ flexGrow: 1 }}
                >
                  Add Contact
                </Typography>
                <Button
                  onClick={() => {
                    setOpenPopupAddContact(false);
                  }}
                >
                  <CloseOutlinedIcon />
                </Button>
              </div>
            </DialogTitle>
            <DialogContent dividers>
              <form onSubmit={addContact}>
                <Box sx={{ p: 3 }}>
                  <Grid>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="contact"
                      label="Contact Number"
                      name="contact"
                      autoFocus
                      inputProps={{ maxLength: 15 }}
                      value={contactToAdd}
                      onChange={(e) => setContactToAdd(e.target.value)}
                    />
                  </Grid>

                  <Grid>
                    <Button
                      type="submit"
                      style={{ width: "100%" }}
                      variant="contained"
                    >
                      Add Contact
                    </Button>
                  </Grid>
                </Box>
              </form>
            </DialogContent>
          </Dialog>
        </TabPanel>

        <TabPanel value={value} index={2}>
          {/* <Button
            variant="outlined"
            startIcon={<AddOutlinedIcon />}
            sx={{ mb: 4 }}
            onClick={() => setOpenPopupAddDependent(true)}
          >
            Add Dependent
          </Button> */}
          <DataGrid
            rows={dependents}
            getRowId={(row) => row.dependent_id}
            columns={columnsForDependents}
            PageSize={25}
            rowsPerPageOption={[25]}
            autoHeight
            rowHeight={70}
          />
          <Dialog open={openPopupAddDependent} maxWidth="xl">
            <DialogTitle>
              <div style={{ display: "flex", alignContent: "space-between" }}>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ flexGrow: 1 }}
                >
                  Add Dependent
                </Typography>
                <Button
                  onClick={() => {
                    setOpenPopupAddDependent(false);
                  }}
                >
                  <CloseOutlinedIcon />
                </Button>
              </div>
            </DialogTitle>
            <DialogContent dividers>
              <form onSubmit={addDependent}>
                <Box sx={{ p: 3 }}>
                  <Grid>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="name"
                      label="Name"
                      name="name"
                      style={{ width: "100%" }}
                      autoFocus
                      value={dependentToAdd.name}
                      onChange={handleChangeAddDependent}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="birth_date"
                      label="DOB"
                      name="birth_date"
                      type="date"
                      value={dependentToAdd.birth_date}
                      onChange={handleChangeAddDependent}
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <FormControl
                    required
                    sx={{ minWidth: "25%", mt: 2 }}
                    style={{ width: "100%" }}
                  >
                    <InputLabel id="gender_label">Gender</InputLabel>
                    <Select
                      labelId="gender_label"
                      id="gender"
                      value={dependentToAdd.gender}
                      label="gender"
                      name="gender"
                      onChange={handleChangeAddDependent}
                    >
                      <MenuItem value={"Female"} key={0}>
                        Female
                      </MenuItem>
                      <MenuItem value={"Male"} key={1}>
                        Male
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <Grid>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="relationship"
                      label="Relationship"
                      name="relationship"
                      value={dependentToAdd.relationship}
                      onChange={handleChangeAddDependent}
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="PB_number"
                      label="PB Number"
                      name="PB_number"
                      value={dependentToAdd.PB_number}
                      onChange={handleChangeAddDependent}
                      style={{ width: "100%" }}
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
                      value={dependentToAdd.street_name}
                      onChange={handleChangeAddDependent}
                      style={{ width: "100%" }}
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
                      value={dependentToAdd.city_name}
                      onChange={handleChangeAddDependent}
                      style={{ width: "100%" }}
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
                      value={dependentToAdd.country}
                      onChange={handleChangeAddDependent}
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid>
                    <Button
                      type="submit"
                      style={{ width: "100%" }}
                      variant="contained"
                    >
                      Add Dependent
                    </Button>
                  </Grid>
                </Box>
              </form>
            </DialogContent>
          </Dialog>
        </TabPanel>
      </Box>
    </Box>
  );
}

export default ProfileForOthers;

/** @type {import("@mui/material").SxProps} */
const styles = {
  pageTitle: {
    mb: 2,
  },
};
