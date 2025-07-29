import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import { FaDollarSign, FaTint, FaUsers } from "react-icons/fa";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBooks: 0,
    totalRequest: 0,
  });

  const axiosSecure = useAxiosSecure();

  const [latestRequests, setLatestRequests] = useState([]);

  useEffect(() => {
    // Replace with your secure APIs
    axiosSecure("/admin-dashboard-stats").then(({ data }) => setStats(data));

    // fetch("/api/latest-requests?limit=5")
    //   .then((res) => res.json())
    //   .then((data) => setLatestRequests(data));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-red-600">
        👋 Welcome, {user?.displayName || "Admin"}
      </h2>

      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<FaUsers size={24} />}
        />
        <StatCard
          title="Total Funding"
          value={stats.totalBooks}
          icon={<FaDollarSign size={24} />}
        />
        <StatCard
          title="Total Blood Donation Request"
          value={stats.totalRequest}
          icon={<FaTint size={24} />}
        />
      </div>

      {/* Latest Book Requests Table */}
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4">
    <div className="bg-blue-100 text-red-600 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  </div>
);

export default AdminDashboard;
