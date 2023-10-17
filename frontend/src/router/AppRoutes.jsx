import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import Leave from "../pages/Leave/Leave";
import Employee from "../pages/Employee/Employee";
import Department from "../pages/Department/Department";
import Document from "../pages/Document/Document";
import { Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" component={<Dashboard />} />
      <Route exact path="/profile" component={<Profile />} />
      <Route exact path="/leave" component={<Leave />} />
      <Route exact path="/employee" component={<Employee />} />
      <Route exact path="/department" component={<Department />} />
      <Route exact path="/document" component={<Document />} />
    </Routes>
  );
}

export default AppRoutes;
