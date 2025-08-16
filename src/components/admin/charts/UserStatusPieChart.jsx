import { FaChartLine } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const UserStatusPieChart = ({ userCounts }) => {
  const userStatusData = [
    { name: "Total Users", value: userCounts.total, color: "#3B82F6" },
    { name: "Active Users", value: userCounts.active, color: "#10B981" },
    { name: "Blocked Users", value: userCounts.blocked, color: "#EF4444" },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-blue-600" />
        <h2 className="text-lg font-semibold">User Status Distribution</h2>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={userStatusData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {userStatusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserStatusPieChart;
