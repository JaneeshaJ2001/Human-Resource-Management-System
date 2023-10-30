import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import Leave from "../pages/Leave/Leave";
import Employee from "../pages/Employee/Employee";
import Department from "../pages/Department/Department";
import Document from "../pages/Document/Document";
import Login from "../pages/login/Login";
import AddEmployee from "../pages/Employee/AddEmployee";
import ForgotPassword from "../pages/login/ForgotPassword";
import SignUp from "../pages/login/SignUp";
import Doc1 from "../pages/Document/Doc1";
import ProfileForOthers from "../pages/ProfileForOthers/ProfileForOthers";
import { Routes, Route } from "react-router-dom";

import React from "react";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/empId/:emp_id" element={<ProfileForOthers />} />
      <Route path="/leave" element={<Leave />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/department" element={<Department />} />
      {/* <Route path="/document" element={<Doc1 />} /> */}
      {/* <Route path="/addemp" element={<AddEmployee />} /> */}
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/forgotpassword" element={<ForgotPassword />} />
      {/* <Route exact path="/doc1" element={<Document />} /> */}
    </Routes>
  );
}

export default AppRoutes;
