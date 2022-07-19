import React from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

const RatingChart = ({ data }) => {
  return (
    <div style={{ height: "150px", margin: "30px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={data}>
          <XAxis dataKey="name" />
          <Bar dataKey="count" fill="#FFDD63" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingChart;
