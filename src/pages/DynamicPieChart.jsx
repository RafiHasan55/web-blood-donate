import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../hooks/useAxiosSecure";

const COLORS = ["#0088FE", "#FF8042"]; // Active, Blocked

const DynamicPieChart = () => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const res = await axiosSecure.get("/users-stats"); // new backend route
        const chartData = [
          { name: "Active", value: res.data.activeUsers },
          { name: "Blocked", value: res.data.blockedUsers },
        ];
        setData(chartData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserStats();
  }, [axiosSecure]);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicPieChart;
