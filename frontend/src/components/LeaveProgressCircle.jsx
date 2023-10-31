/*
import { Box } from "@mui/material";

import React from "react";

const LeaveProgressCircle = ({ progress = "0.75", size = "40" }) => {
  //const theme = useTheme();

  const angle = progress * 360;
  return (
    <Box
      sx={{
        //background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),${colors.greenAccent[500]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default LeaveProgressCircle;
*/

import { RadialBar } from "@nivo/radial-bar";
import React from "react";

const color = "#1c66d5";

const Metric = ({ center }) => {
  return (
    <text
      x={center[0]}
      y={center[1]}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: 18,
        fill: color,
      }}
    >
      75%
    </text>
  );
};

export default function App() {
  return (
    <div className="App">
      <RadialBar
        width={75}
        height={75}
        valueFormat={(v) => `${v}%`}
        maxValue={100}
        startAngle={360}
        endAngle={0}
        cornerRadius={100}
        innerRadius={0.8}
        colors={[color]}
        data={[
          {
            id: "default",
            data: [{ x: "percentage", y: 75 }],
          },
        ]}
        layers={["tracks", "bars", Metric]}
      />
    </div>
  );
}
