import { Box, Typography, Grid, Container } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import { AuthContext } from "../../helpers/AuthContext";
import { userData } from "../../data/MockData2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.status) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:1234/employee/byId/${authState.emp_id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            // console.log(response.data);
            setEmployeeDetails(response.data[0]);
          }
        });
    }
  }, [authState]);

  return (
    <Box>
      <Typography sx={styles.pageTitle} variant="h5">
        Dashboard
      </Typography>

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Grid container spacing={0.5}>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <FeaturedInfo />
          </Grid>

          {/* Chart */}
          <Grid item xs={12}>
            <Chart
              data={userData}
              title="User Analytics"
              grid
              dataKey="Active User"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;

/** @type {import("@mui/material").SxProps} */
const styles = {
  pageTitle: {
    mb: 2,
  },
};
