import React from "react";
import "./featuredInfo.css";
import { Box } from "@mui/material";
import LeaveProgressCircle from "../LeaveProgressCircle";

function FeaturedInfo({ employeeLeaveCount }) {
  // console.log(employeeLeaveCount);
  return (
    <div className="featured">
      {employeeLeaveCount.map((row, id) => {
        return (
          <div className="featuredItem" key={id}>
            <span className="featuredTitle">{row.leave_type_name} Leaves</span>
            <div className="featuredMoneyContainer">
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <span className="featuredMoney">{`${row.total_no_of_leaves_taken}/${row.total_no_of_permitted_days}`}</span>
                </Box>
                <Box>
                  <LeaveProgressCircle progress={row.percentage_leaves_taken} />
                </Box>
              </Box>
            </div>
          </div>
        );
      })}
      {/* <div className="featuredItem">
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
      </div> */}

      {/* <div className="featuredItem">
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
      </div> */}
    </div>
  );
}

export default FeaturedInfo;
