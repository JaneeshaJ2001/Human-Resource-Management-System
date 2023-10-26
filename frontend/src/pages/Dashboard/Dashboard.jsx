import { Box, Typography, Grid, Paper, Container } from "@mui/material";
import React from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import { userData } from "../../data/MockData2";

function Dashboard() {
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
