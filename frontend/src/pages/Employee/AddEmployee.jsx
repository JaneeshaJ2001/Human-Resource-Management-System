import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Paper,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { AuthContext } from "../../helpers/AuthContext";
import axios from "axios";

const RegisterForm = () => {
  const { authState } = useContext(AuthContext);

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    PB_number: "",
    street_name: "",
    city_name: "",
    country: "",
    branch_name: "",
    job_title: "",
    pay_grade: "",
    SupervisorId: "",
    dept_name: "",
    emp_status_name: "",
    marital_status: "",
  });

  const [departments, setDepartments] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [payGrades, setPayGrades] = useState([]);
  const [empStatusNames, setEmpStatusNames] = useState([]);
  const [branches, setBranches] = useState([]);
  const [supervisors, setSupervisors] = useState([]);

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataCopy = { ...data };
    if (data.SupervisorId === "N/A") {
      dataCopy.SupervisorId = null;
    }
    axios
      .post("http://localhost:1234/employee", dataCopy, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          alert("Some error , try again!");
        } else {
          console.log(response.data);

          customAttributes.map((customAttribute) => {
            if (customAttribute.attribute_status) {
              axios
                .post(
                  "http://localhost:1234/customAttribute",
                  { ...customAttribute, emp_id: response.data.emp_id },
                  {
                    headers: {
                      accessToken: localStorage.getItem("accessToken"),
                    },
                  }
                )
                .then((res) => {
                  if (res.data.error) {
                    console.log(res.data.error);
                  } else {
                    console.log(res.data);
                  }
                });
            }
          });

          alert(`Employee Added, emp_id = ${response.data.emp_id}`);
          window.location.reload();
        }
      });
  };

  const handleErase = () => {
    setData({
      first_name: "",
      last_name: "",
      birth_date: "",
      PB_number: "",
      street_name: "",
      city_name: "",
      country: "",
      branch_name: "",
      job_title: "",
      pay_grade: "",
      SupervisorId: null,
      dept_name: "",
      emp_status_name: "",
      marital_status: "",
    });
  };

  const [customAttributes, setCustomAttributes] = useState([]);

  useEffect(() => {
    if (authState.status) {
      axios
        .get("http://localhost:1234/department", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            setDepartments(response.data);
          }
        });
      axios
        .get("http://localhost:1234/role/jobTitle", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            setJobTitles(response.data);
          }
        });
      axios
        .get("http://localhost:1234/role/payGrade", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            setPayGrades(response.data);
          }
        });
      axios
        .get("http://localhost:1234/employeeStatus", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            setEmpStatusNames(response.data);
          }
        });
      axios
        .get("http://localhost:1234/branch", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            setBranches(response.data);
          }
        });
      axios
        .get("http://localhost:1234/employee/superVisors", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            setSupervisors(response.data);
          }
        });
      axios
        .get("http://localhost:1234/customAttribute", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            console.log(response.data);
            setCustomAttributes(
              response.data.map((row) => {
                return {
                  attribute_id: row.attribute_id,
                  attribute_name: row.attribute_name,
                  attribute_description: row.description,
                  attribute_value: "",
                  attribute_status: false,
                };
              })
            );
          }
        });
    }
  }, [authState]);

  // console.log(customAttributes)*

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="first_name"
                name="first_name"
                label="First Name"
                fullWidth
                //autoComplete="given-name"
                variant="standard"
                autoFocus
                value={data.first_name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="last_name"
                name="last_name"
                label="Last Name"
                fullWidth
                variant="standard"
                value={data.last_name}
                onChange={handleChange}
              />
            </Grid>

            <Box sx={{ mt: 3, ml: 3 }}>
              <TextField
                required
                type="date"
                id="birth_date"
                name="birth_date"
                label="DOB"
                fullWidth
                variant="outlined"
                value={data.birth_date}
                onChange={handleChange}
              />
            </Box>

            <FormControl required sx={{ minWidth: "25%", mt: 3, ml: 3 }}>
              <InputLabel id="dept_name_label">Department</InputLabel>
              <Select
                labelId="dept_name_label"
                id="dept_name"
                value={data.dept_name}
                label="Department"
                name="dept_name"
                onChange={handleChange}
              >
                {departments.map((department) => {
                  if (
                    department.max_no_of_employees >
                    department.current_no_of_employees
                  ) {
                    return (
                      <MenuItem
                        key={department.dept_id}
                        value={department.dept_name}
                      >
                        {department.dept_name}
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </FormControl>

            <FormControl required sx={{ minWidth: "21.5%", mt: 3, ml: 3 }}>
              <InputLabel id="job_title_label">Job Title</InputLabel>
              <Select
                labelId="job_title_label"
                id="job_title"
                value={data.job_title}
                label="Job Title"
                name="job_title"
                onChange={handleChange}
              >
                {jobTitles.map((jobTitle) => (
                  <MenuItem key={jobTitle.job_title} value={jobTitle.job_title}>
                    {jobTitle.job_title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl required sx={{ minWidth: "21.5%", mt: 3, ml: 3 }}>
              <InputLabel id="pay_grade_label">Pay Grade</InputLabel>
              <Select
                labelId="pay_grade_label"
                id="pay_grade"
                value={data.pay_grade}
                label="Pay Grade"
                name="pay_grade"
                onChange={handleChange}
              >
                {payGrades.map((payGrade) => (
                  <MenuItem key={payGrade.pay_grade} value={payGrade.pay_grade}>
                    {payGrade.pay_grade}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl required sx={{ minWidth: "21.5%", mt: 3, ml: 3 }}>
              <InputLabel id="emp_status_name_label">Status</InputLabel>
              <Select
                labelId="emp_status_name_label"
                id="emp_status_name"
                value={data.emp_status_name}
                label="Status"
                name="emp_status_name"
                onChange={handleChange}
              >
                {empStatusNames.map((empStatusName) => (
                  <MenuItem
                    key={empStatusName.status_name}
                    value={empStatusName.status_name}
                  >
                    {empStatusName.status_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl required sx={{ minWidth: "21.5%", mt: 3, ml: 3 }}>
              <InputLabel id="branch_name_label">Branch</InputLabel>
              <Select
                labelId="branch_name_label"
                id="branch_name"
                value={data.branch_name}
                label="Branch"
                name="branch_name"
                onChange={handleChange}
              >
                {branches.map((branch) => (
                  <MenuItem key={branch.branch_name} value={branch.branch_name}>
                    {branch.branch_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl required sx={{ minWidth: "21.5%", mt: 3, ml: 3 }}>
              <InputLabel id="supervisor_label">Supervisor ID</InputLabel>
              <Select
                labelId="supervisor_label"
                id="SupervisorId"
                value={data.SupervisorId}
                label="Supervisor"
                name="SupervisorId"
                onChange={handleChange}
              >
                <MenuItem key={0} value={"N/A"}>
                  N/A
                </MenuItem>
                {supervisors.map((supervisor) => (
                  <MenuItem key={supervisor.emp_id} value={supervisor.emp_id}>
                    {supervisor.emp_id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="PB_number"
                name="PB_number"
                label="PB Number"
                fullWidth
                variant="standard"
                value={data.PB_number}
                onChange={handleChange}
              />
              <TextField
                required
                id="street_name"
                name="street_name"
                label="Street Name"
                fullWidth
                variant="standard"
                value={data.street_name}
                onChange={handleChange}
              />

              {customAttributes.map((attribute) => {
                return (
                  <div>
                    <Checkbox
                      checked={attribute.attribute_status}
                      id={attribute.attribute_id}
                      onChange={(e) => {
                        setCustomAttributes(
                          customAttributes.map((customAttribute) => {
                            if (customAttribute.attribute_id === e.target.id) {
                              return {
                                ...customAttribute,
                                attribute_status:
                                  !customAttribute.attribute_status,
                              };
                            } else {
                              return {
                                ...customAttribute,
                              };
                            }
                          })
                        );
                      }}
                    />
                    <TextField
                      disabled={!attribute.attribute_status}
                      required={attribute.attribute_status}
                      id={attribute.attribute_id}
                      name={attribute.attribute_name}
                      label={attribute.attribute_name}
                      fullWidth
                      variant="standard"
                      value={attribute.attribute_value}
                      onChange={(e) => {
                        setCustomAttributes(
                          customAttributes.map((customAttribute) => {
                            if (customAttribute.attribute_id === e.target.id) {
                              return {
                                ...customAttribute,
                                attribute_value: e.target.value,
                              };
                            } else {
                              return {
                                ...customAttribute,
                              };
                            }
                          })
                        );
                      }}
                    />
                  </div>
                );
              })}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city_name"
                name="city_name"
                label="City Name"
                fullWidth
                variant="standard"
                value={data.city_name}
                onChange={handleChange}
              />
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                variant="standard"
                value={data.country}
                onChange={handleChange}
              />
            </Grid>

            <Box sx={{ mt: 3, ml: 3 }}>
              <FormControl required>
                <FormLabel id="marital_status_label">Marital Status</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="marital_status_label"
                  defaultValue="Single"
                  name="marital_status"
                  value={data.marital_status}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Single"
                    control={<Radio />}
                    label="Single"
                  />
                  <FormControlLabel
                    value="Married"
                    control={<Radio />}
                    label="Married"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Stack direction="row" spacing={2} sx={{ mt: 2, p: 3 }}>
              <Button
                variant="outlined"
                startIcon={<DeleteOutlineOutlinedIcon />}
                onClick={handleErase}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                type="submit"
                endIcon={<SendOutlinedIcon />}
              >
                Submit
              </Button>
            </Stack>
          </Grid>
        </Paper>
      </form>
    </React.Fragment>
  );
};

export default RegisterForm;

/** @type {import("@mui/material").SxProps} */
const styles = {
  pdepartmentTitle: {
    mb: 2,
  },
};

{
  /* <Grid item xs={12} sm={6}>
<TextField
required
id="mobilenumber"
name="mobilenumber"
label="Mobile Number"
fullWidth
autoComplete="shipping number"
variant="standard"
/>
</Grid> */
}

{
  /* <Grid item xs={12} sm={6}>
<TextField
required
id="worklocation"
name="worklocation"
label="Work Location"
fullWidth
autoComplete="shipping worklocation"
variant="standard"
/>
</Grid> */
}

{
  /* <Box sx={{ mt: 2, ml: 3 }}>
<LocalizationProvider dateAdapter={AdapterDayjs}>
<DemoContainer components={["DatePicker"]}>
<DatePicker label="Date Of Join" />
</DemoContainer>
</LocalizationProvider>
</Box> */
}

{
  /* <Box sx={{ mt: 3, ml: 3 }}>
<FormControl>
<FormLabel id="demo-radio-buttons-group-label">
Gender
</FormLabel>
<RadioGroup
row
aria-labelledby="demo-radio-buttons-group-label"
defaultValue="female"
name="radio-buttons-group"
>
<FormControlLabel
value="female"
control={<Radio />}
label="Female"
/>
<FormControlLabel
value="male"
control={<Radio />}
label="Male"
/>
<FormControlLabel
value="other"
control={<Radio />}
label="Other"
/>
</RadioGroup>
</FormControl>
</Box> */
}

{
  /* <Grid item xs={12} sm={6}>
<TextField
required
id="role"
name="role"
label="Role"
fullWidth
//autoComplete="shipping address-line1"
variant="standard"
/>
</Grid> */
}

{
  /* <LocalizationProvider dateAdapter={AdapterDayjs}>
<DemoContainer components={["DatePicker"]}>
<DatePicker
label="Birth Date"
// value={data.birth_date}
// name="birth_date"
// onChange={handleChange}
/>
</DemoContainer>
</LocalizationProvider> */
}
