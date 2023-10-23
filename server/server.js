const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const AccountsRoute = require("./routes/Accounts");
app.use("/auth", AccountsRoute);
const EmployeesRoute = require("./routes/Employees");
app.use("/employee", EmployeesRoute);
const ContactsRoute = require("./routes/Contacts");
app.use("/contact", ContactsRoute);
const DependentsRoute = require("./routes/Dependents");
app.use("/dependent", DependentsRoute);
const EmergencyContactsRoute = require("./routes/EmergencyContacts");
app.use("/emergency", EmergencyContactsRoute);

app.listen(1234, () => {
  console.log("server running on port 1234");
});
