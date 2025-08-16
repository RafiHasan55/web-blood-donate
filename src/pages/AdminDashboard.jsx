import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import { FaDollarSign, FaTint, FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa";

// Chart Components Import
import UserStatusPieChart from "../components/admin/charts/UserStatusPieChart";
import ActivityAreaChart from "../components/admin/charts/ActivityAreaChart";
import StatCard from "../components/StatCard";
import PlatformStatsBarChart from "../components/admin/charts/PlatformStatsBarChart ";
import ContentStatusPieChart from "../components/admin/charts/ContentStatusPieChart";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
    totalBooks: 0,
    totalRequest: 0,
  });

  const [userCounts, setUserCounts] = useState({
    total: 0,
    active: 0,
    blocked: 0,
  });

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure("/admin-dashboard-stats").then(({ data }) => setStats(data));
    fetchUserCounts();
  }, [axiosSecure]);

  const fetchUserCounts = async () => {
    try {
      const totalResponse = await axiosSecure.get("/get-users?status=all&page=1&limit=1");
      const activeResponse = await axiosSecure.get("/get-users?status=active&page=1&limit=1");
      const blockedResponse = await axiosSecure.get("/get-users?status=blocked&page=1&limit=1");

      setUserCounts({
        total: totalResponse.data.total || 0,
        active: activeResponse.data.total || 0,
        blocked: blockedResponse.data.total || 0,
      });
    } catch (error) {
      console.error("Error fetching user counts:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-red-600">
        👋 Welcome, {user?.displayName || "Admin"}
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={userCounts.total}
          icon={<FaUsers size={24} />}
          bgColor="bg-blue-100"
          textColor="text-blue-600"
        />
        <StatCard
          title="Active Users"
          value={userCounts.active}
          icon={<FaUserCheck size={24} />}
          bgColor="bg-green-100"
          textColor="text-green-600"
        />
        <StatCard
          title="Blocked Users"
          value={userCounts.blocked}
          icon={<FaUserTimes size={24} />}
          bgColor="bg-red-100"
          textColor="text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Total Funding"
          value={stats.totalBooks}
          icon={<FaDollarSign size={24} />}
          bgColor="bg-yellow-100"
          textColor="text-yellow-600"
        />
        <StatCard
          title="Donation Requests"
          value={stats.totalRequest}
          icon={<FaTint size={24} />}
          bgColor="bg-purple-100"
          textColor="text-purple-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserStatusPieChart userCounts={userCounts} />
        <ContentStatusPieChart></ContentStatusPieChart>

      </div>

      <PlatformStatsBarChart userCounts={userCounts} stats={stats} />
      <ActivityAreaChart userCounts={userCounts} />
    </div>
  );
};

export default AdminDashboard;