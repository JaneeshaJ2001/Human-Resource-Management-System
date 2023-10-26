import React from "react";
import "./featuredInfo.css";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";

function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,415</span>
          <span className="featuredMoneyRate">
            -l1.4
            <ArrowDownwardOutlinedIcon className=" featuredIcon negative" />
          </span>
          <span className="featuredSub">Compared to last month</span>
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,415</span>
          <span className="featuredMoneyRate">
            -l1.4
            <ArrowDownwardOutlinedIcon className=" featuredIcon negative" />
          </span>
          <span className="featuredSub">Compared to last month</span>
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,415</span>
          <span className="featuredMoneyRate">
            -l1.4
            <ArrowUpwardOutlinedIcon className=" featuredIcon" />
          </span>
          <span className="featuredSub">Compared to last month</span>
        </div>
      </div>
    </div>
  );
}

export default FeaturedInfo;
