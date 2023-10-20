const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const AccountsRoute = require("./routes/Accounts");
app.use("/auth", AccountsRoute);
const EmployeesRoute = require("./routes/Employees");
app.use("/employee", EmployeesRoute);

app.listen(1234, () => {
  console.log("server running on port 1234");
});
