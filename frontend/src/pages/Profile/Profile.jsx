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
import { mockDataDependent } from "../../data/MockData2";
import React from "react";
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
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
    valueGetter: (params) => {
      return `${params.row.PB_number || ""}, ${params.row.street_name || ""}, ${
        params.row.city_name || ""
      }, ${params.row.country || ""}`;
    },
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

function Profile() {
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

  const [updateContact, setUpdateContact] = useState({
    status: false,
    old_number: "",
    new_number: "",
  });
  const changeContact = (e) => {
    // console.log(updateContact);
    axios
      .put("http://localhost:1234/contact", updateContact, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          alert("Oops, Some error occured !");
        } else {
          alert("Contact updated successfully!");
          setUpdateContact({ status: false, old_number: "", new_number: "" });
          window.location.reload();
        }
      });
  };
  const deleteContact = (e) => {
    // console.log(updateContact);
    axios
      .put(
        "http://localhost:1234/contact/delete",
        { contact_number: updateContact.old_number },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          alert("Oops, Some error occured !");
        } else {
          alert("Contact deleted successfully!");
          setUpdateContact({ status: false, old_number: "", new_number: "" });
          window.location.reload();
        }
      });
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
  const [updateDependent, setUpdateDependent] = useState({
    status: false,
    dependent_id: "",
    name: "",
    birth_date: "",
    gender: "",
    relationship: "",
    PB_number: "",
    street_name: "",
    city_name: "",
    country: "",
  });
  const handleChangeUpdateDependent = (e) => {
    setUpdateDependent({
      ...updateDependent,
      [e.target.name]: e.target.value,
    });
  };
  const changeDependent = (e) => {
    // console.log(updateDependent);
    axios
      .put("http://localhost:1234/dependent", updateDependent, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          alert("Oops, some error occured !");
        } else {
          alert("Dependent updated successfully!");
          setUpdateDependent({
            status: false,
            dependent_id: "",
            name: "",
            birth_date: "",
            gender: "",
            relationship: "",
            PB_number: "",
            street_name: "",
            city_name: "",
            country: "",
          });
          window.location.reload();
        }
      });
  };
  const deleteDependent = (e) => {
    // console.log(updateDependent);
    axios
      .put("http://localhost:1234/dependent/delete", updateDependent, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          alert("Oops, some error occured !");
        } else {
          alert("Dependent deleted successfully!");
          setUpdateDependent({
            status: false,
            dependent_id: "",
            name: "",
            birth_date: "",
            gender: "",
            relationship: "",
            PB_number: "",
            street_name: "",
            city_name: "",
            country: "",
          });
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

  useEffect(() => {
    if (!authState.status) {
      navigate("/login");
    } else if (authState.role_id !== "") {
      axios
        .get(`http://localhost:1234/dependent/byId/${authState.emp_id}`, {
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
        .get(`http://localhost:1234/contact/byEmpId/${authState.emp_id}`, {
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
        Employee Section
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
          <Button
            variant="outlined"
            startIcon={<AddOutlinedIcon />}
            sx={{ mb: 4 }}
            onClick={() => setOpenPopupAddContact(true)}
          >
            Add Contact
          </Button>
          <DataGrid
            rows={contacts}
            getRowId={(row) => row.contact_number}
            columns={columnsForContacts}
            PageSize={25}
            rowsPerPageOption={[25]}
            autoHeight
            rowHeight={70}
            onRowClick={(params) => {
              setUpdateContact({
                status: true,
                old_number: params.row.contact_number,
                new_number: "",
              });
            }}
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

          <Dialog open={updateContact.status} maxWidth="xl">
            <DialogTitle>
              <div style={{ display: "flex", alignContent: "space-between" }}>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ flexGrow: 1 }}
                >
                  Update Contact
                </Typography>
                <Button
                  onClick={() => {
                    setUpdateContact({
                      status: false,
                      old_number: "",
                      new_number: "",
                    });
                  }}
                >
                  <CloseOutlinedIcon />
                </Button>
              </div>
            </DialogTitle>
            <DialogContent dividers>
              <form>
                <Box sx={{ p: 3 }}>
                  <Grid>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="old_number"
                      label="Contact Number"
                      name="old_number"
                      value={updateContact.old_number}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="new_number"
                      label="Contact Number"
                      name="new_number"
                      autoFocus
                      inputProps={{ maxLength: 15 }}
                      value={updateContact.new_number}
                      onChange={(e) =>
                        setUpdateContact({
                          ...updateContact,
                          new_number: e.target.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid>
                    <Button
                      style={{ width: "100%" }}
                      variant="contained"
                      onClick={changeContact}
                    >
                      Update Contact
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      style={{ width: "100%" }}
                      variant="contained"
                      onClick={deleteContact}
                    >
                      Delete Contact
                    </Button>
                  </Grid>
                </Box>
              </form>
            </DialogContent>
          </Dialog>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Button
            variant="outlined"
            startIcon={<AddOutlinedIcon />}
            sx={{ mb: 4 }}
            onClick={() => setOpenPopupAddDependent(true)}
          >
            Add Dependent
          </Button>
          <DataGrid
            rows={dependents}
            getRowId={(row) => row.dependent_id}
            columns={columnsForDependents}
            PageSize={25}
            rowsPerPageOption={[25]}
            autoHeight
            rowHeight={70}
            onRowClick={(params) => {
              setUpdateDependent({
                status: true,
                dependent_id: params.row.dependent_id,
                name: params.row.name,
                birth_date: moment(params.row.b_date).format("YYYY-MM-DD"),
                gender: params.row.gender,
                relationship: params.row.relationship,
                PB_number: params.row.PB_number,
                street_name: params.row.street_name,
                city_name: params.row.city_name,
                country: params.row.country,
              });
              // console.log(params);
            }}
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

          <Dialog open={updateDependent.status} maxWidth="xl">
            <DialogTitle>
              <div style={{ display: "flex", alignContent: "space-between" }}>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ flexGrow: 1 }}
                >
                  Update Dependent
                </Typography>
                <Button
                  onClick={() => {
                    setUpdateDependent({
                      status: false,
                      dependent_id: "",
                      name: "",
                      birth_date: "",
                      gender: "",
                      relationship: "",
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
              <form>
                <Box sx={{ p: 3 }}>
                  <Grid>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="dependent_id"
                      label="Dependent ID"
                      name="dependent_id"
                      style={{ width: "100%" }}
                      value={updateDependent.dependent_id}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
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
                      value={updateDependent.name}
                      onChange={handleChangeUpdateDependent}
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
                      value={updateDependent.birth_date}
                      onChange={handleChangeUpdateDependent}
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
                      value={updateDependent.gender}
                      label="gender"
                      name="gender"
                      onChange={handleChangeUpdateDependent}
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
                      value={updateDependent.relationship}
                      onChange={handleChangeUpdateDependent}
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
                      value={updateDependent.PB_number}
                      onChange={handleChangeUpdateDependent}
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
                      value={updateDependent.street_name}
                      onChange={handleChangeUpdateDependent}
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
                      value={updateDependent.city_name}
                      onChange={handleChangeUpdateDependent}
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
                      value={updateDependent.country}
                      onChange={handleChangeUpdateDependent}
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid>
                    <Button
                      onClick={changeDependent}
                      style={{ width: "100%" }}
                      variant="contained"
                    >
                      Update Dependent
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      onClick={deleteDependent}
                      style={{ width: "100%" }}
                      variant="contained"
                    >
                      Delete Dependent
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

export default Profile;

/** @type {import("@mui/material").SxProps} */
const styles = {
  pageTitle: {
    mb: 2,
  },
};
