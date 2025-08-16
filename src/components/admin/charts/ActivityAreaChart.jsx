import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaTint } from "react-icons/fa";

const STATUS_COLORS = {
  all: "#3B82F6",
  pending: "#FBBF24",
  inprogress: "#10B981",
  done: "#34D399",
  canceled: "#EF4444",
};

const ActivityAreaChart = ({ donationRequests = [] }) => {
  const currentMonth = new Date().getMonth(); // 0-11
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Last 6 months structure
  const months = Array.from({ length: 6 }).map((_, i) => ({
    month: monthNames[(currentMonth - 5 + i + 12) % 12],
    all: 0,
    pending: 0,
    inprogress: 0,
    done: 0,
    canceled: 0,
  }));

  // Fill monthly data dynamically
  donationRequests.forEach((req) => {
    const date = new Date(req.donation_date);
    const monthDiff = (currentMonth - date.getMonth() + 12) % 12;
    if (monthDiff < 6) {
      const idx = 5 - monthDiff; // reverse order
      months[idx].all += 1;
      months[idx][req.status] = (months[idx][req.status] || 0) + 1;
    }
  });

  // Calculate total per status for last 6 months
  const totalCounts = months.reduce(
    (totals, m) => {
      Object.keys(STATUS_COLORS).forEach((status) => {
        totals[status] += m[status];
      });
      return totals;
    },
    { all: 0, pending: 0, inprogress: 0, done: 0, canceled: 0 }
  );

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FaTint className="text-red-600" />
        Blood Donation Requests Activity
      </h3>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={months}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {["all", "pending", "inprogress", "done", "canceled"].map(
            (status) => (
              <Area
                key={status}
                type="monotone"
                dataKey={status}
                stackId="1"
                stroke={STATUS_COLORS[status]}
                fill={STATUS_COLORS[status]}
                fillOpacity={0.6}
                name={status.charAt(0).toUpperCase() + status.slice(1)}
              />
            )
          )}
        </AreaChart>
      </ResponsiveContainer>

      {/* Total counts */}
      <div className="mt-4 flex gap-4 flex-wrap">
        {Object.keys(totalCounts).map((status) => (
          <div
            key={status}
            className="px-3 py-1 rounded shadow text-white font-semibold"
            style={{ backgroundColor: STATUS_COLORS[status] }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}:{" "}
            {totalCounts[status]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityAreaChart;
