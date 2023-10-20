import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./pages/global/Topbar";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Team from "./pages/team/Team";
import { Routes, Route } from "react-router-dom";
import Contact from "./pages/emergencyContact/contact";
import Dependent from "./pages/dependent/Dependent";
import LeaveForm from "./pages/leave/leaveForm/LeaveForm";
import Department from "./pages/department/Department";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dependent" element={<Dependent />} />
              <Route path="/leave" element={<LeaveForm />} />
              <Route path="/department" element={<Department />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
