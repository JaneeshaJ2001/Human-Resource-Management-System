import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import Leave from "../pages/Leave/Leave";
import Employee from "../pages/Employee/Employee";
import Department from "../pages/Department/Department";
import Document from "../pages/Document/Document";
import Login from "../pages/login/Login";
import AddEmployee from "../pages/Employee/AddEmployee";
import ForgotPassword from "../pages/login/ForgotPassword";
import { Routes, Route } from "react-router-dom";
//<Route exact path="/login" element={<Login />} />
//<Route exact path="/forgotpassword" element={<ForgotPassword />} />
import React from "react";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/leave" element={<Leave />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/department" element={<Department />} />
      <Route path="/document" element={<Document />} />
      <Route path="/addemp" element={<AddEmployee />} />
    </Routes>
  );
}

export default AppRoutes;
