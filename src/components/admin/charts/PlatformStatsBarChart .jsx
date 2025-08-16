import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaChartLine } from "react-icons/fa";

const PlatformStatsBarChart = ({ userCounts, stats }) => {
  const chartData = [
    {
      category: "Users",
      Total: userCounts.total,
      Active: userCounts.active,
      Blocked: userCounts.blocked,
    },
    {
      category: "Content",
      "Donation Requests": stats.totalRequest,
      Completed: Math.floor(stats.totalRequest * 0.7), 
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FaChartLine className="text-green-600" />
        Platform Statistics Overview
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Total" fill="#3B82F6" name="Total" />
          <Bar dataKey="Active" fill="#10B981" name="Active" />
          <Bar dataKey="Blocked" fill="#EF4444" name="Blocked" />
          <Bar
            dataKey="Donation Requests"
            fill="#8B5CF6"
            name="Donation Requests"
          />
          <Bar dataKey="Completed" fill="#06B6D4" name="Completed" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlatformStatsBarChart;
