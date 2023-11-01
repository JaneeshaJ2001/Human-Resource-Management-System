import { Box, Typography, Grid, Container } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import { AuthContext } from "../../helpers/AuthContext";
// import { userData } from "../../data/MockData2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [userData, setUserData] = useState([]);

  const { authState, setAuthState } = useContext(AuthContext);
  const [employeeLeaveCount, setEmployeeLeaveCount] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.status) {
      navigate("/login");
    } else if (authState.role_id === "r-002" || authState.role_id === "r-003") {
      navigate("/profile");
    } else if (authState.role_id === "r-004") {
      axios
        .get("http://localhost:1234/leaveApplication/leaveCount", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            // console.log(response.data);
            setEmployeeLeaveCount(response.data);
          }
        });
      axios
        .get("http://localhost:1234/leaveApplication/yearlyCount", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            // console.log(response.data);
            // setEmployeeLeaveCount(response.data);
            setUserData([
              {
                name: "Jan",
                "Total Leaves": response.data[0].jan,
              },
              {
                name: "Feb",
                "Total Leaves": response.data[0].feb,
              },
              {
                name: "March",
                "Total Leaves": response.data[0].mar,
              },
              {
                name: "April",
                "Total Leaves": response.data[0].apr,
              },
              {
                name: "May",
                "Total Leaves": response.data[0].may,
              },
              {
                name: "June",
                "Total Leaves": response.data[0].jun,
              },
              {
                name: "July",
                "Total Leaves": response.data[0].jul,
              },
              {
                name: "Aug",
                "Total Leaves": response.data[0].aug,
              },
              {
                name: "Sep",
                "Total Leaves": response.data[0].sep,
              },
              {
                name: "Oct",
                "Total Leaves": response.data[0].oct,
              },
              {
                name: "Nov",
                "Total Leaves": response.data[0].nov,
              },
              {
                name: "Dec",
                "Total Leaves": response.data[0].dece,
              },
            ]);
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
          <Grid item xs={12}>
            {employeeLeaveCount.length !== 0 && (
              <FeaturedInfo employeeLeaveCount={employeeLeaveCount} />
            )}
          </Grid>

          <Grid item xs={12}>
            <Chart
              data={userData}
              title="User Analytics"
              grid
              dataKey="Total Leaves"
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
