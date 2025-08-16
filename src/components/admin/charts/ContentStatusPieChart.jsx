import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ContentStatusPieChart = ({ users = [] }) => {
  // Safe check jodi users thake
  const totalUsers = users.length || 0;
  const activeUsers = users.filter((user) => user.status === "active").length || 0;
  const blockedUsers = users.filter((user) => user.status === "blocked").length || 0;

  const userStatusData = [
    { name: "Active Users", value: activeUsers, color: "#10B981" },
    { name: "Blocked Users", value: blockedUsers, color: "#EF4444" },
    { name: "All Users", value: totalUsers, color: "#3B82F6" },
  ];

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">User Status Distribution</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={userStatusData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
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

export default ContentStatusPieChart;
