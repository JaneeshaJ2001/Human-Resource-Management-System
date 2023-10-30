import { Box, Typography, Grid, Container } from "@mui/material";
import React from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import { userData } from "../../data/MockData2";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";

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

          <List
            sx={{
              width: "100%",
              maxWidth: 400,
              bgcolor: "background.paper",
              m: 1,
            }}
          >
            <Typography sx={{ m: 1.5, fontSize: 25 }} variant="h5">
              Jupyter
            </Typography>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Work" secondary="Jan 7, 2014" />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Vacation" secondary="July 20, 2014" />
            </ListItem>
          </List>
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

/*

<Grid item xs={12}>
<Chart
  data={userData}
  title="User Analytics"
  grid
  dataKey="Active User"
/>
</Grid>
*/
