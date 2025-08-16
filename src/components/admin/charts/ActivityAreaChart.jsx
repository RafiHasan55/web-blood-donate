import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FaTint } from "react-icons/fa";

const ActivityAreaChart = ({ userCounts }) => {
  const monthlyStatsData = [
    { month: 'Jan', users: 65, donations: 28, requests: 45 },
    { month: 'Feb', users: 89, donations: 35, requests: 52 },
    { month: 'Mar', users: 125, donations: 42, requests: 38 },
    { month: 'Apr', users: 156, donations: 55, requests: 65 },
    { month: 'May', users: 178, donations: 68, requests: 72 },
    { month: 'Jun', users: userCounts.total, donations: 78, requests: 85 },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FaTint className="text-red-600" />
        Platform Activity Area Chart
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={monthlyStatsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="users" 
            stackId="1" 
            stroke="#3B82F6" 
            fill="#3B82F6" 
            fillOpacity={0.6}
            name="Users"
          />
          <Area 
            type="monotone" 
            dataKey="donations" 
            stackId="1" 
            stroke="#10B981" 
            fill="#10B981" 
            fillOpacity={0.6}
            name="Donations"
          />
          <Area 
            type="monotone" 
            dataKey="requests" 
            stackId="1" 
            stroke="#EF4444" 
            fill="#EF4444" 
            fillOpacity={0.6}
            name="Requests"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityAreaChart;