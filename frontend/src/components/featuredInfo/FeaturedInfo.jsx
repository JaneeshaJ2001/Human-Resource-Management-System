import React from "react";
import "./featuredInfo.css";
import { Box } from "@mui/material";
import LeaveProgressCircle from "../LeaveProgressCircle";

function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Annual Leave</span>
        <div className="featuredMoneyContainer">
          <Box display="flex" justifyContent="space-between">
            <Box>
              <span className="featuredMoney">12</span>
            </Box>
            <Box>
              <LeaveProgressCircle progress="0.75" />
            </Box>
          </Box>
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Casual Leave</span>
        <div className="featuredMoneyContainer">
          <Box display="flex" justifyContent="space-between">
            <Box>
              <span className="featuredMoney">26</span>
            </Box>
            <Box>
              <LeaveProgressCircle progress="0.75" />
            </Box>
          </Box>
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Maternity Leave</span>
        <div className="featuredMoneyContainer">
          <Box display="flex" justifyContent="space-between">
            <Box>
              <span className="featuredMoney">31</span>
            </Box>
            <Box>
              <LeaveProgressCircle progress="0.75" />
            </Box>
          </Box>
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">No-Pay Leave</span>
        <div className="featuredMoneyContainer">
          <Box display="flex" justifyContent="space-between">
            <Box>
              <span className="featuredMoney">25</span>
            </Box>
            <Box>
              <LeaveProgressCircle progress="0.75" />
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default FeaturedInfo;
