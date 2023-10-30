import React from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { TextField, Stack, Button } from "@mui/material";

export default function AddDepartment() {
  const [name, setname] = React.useState("");

  const handleChange = (event) => {
    setname(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ p: 2 }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="name"
          label="Dependent Name"
          name="name"
          autoFocus
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          id="relationship"
          label="Relationship"
          name="relationship"
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          id="mobilephone"
          label="Mobile Phone"
          name="mobilephone"
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          id="homephone"
          label="Home Phone"
          name="homephone"
        />

        <Button
          sx={{ mt: 10 }}
          variant="contained"
          endIcon={<SendOutlinedIcon />}
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
}
