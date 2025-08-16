import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FaCalendarAlt, FaSpinner } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // আপনার path অনুযায়ী adjust করুন

const MonthlyGrowthChart = () => {
  const [monthlyStatsData, setMonthlyStatsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchMonthlyStats();
  }, [useAxiosSecure]);

  const fetchMonthlyStats = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get('/admin/monthly-stats'); // আপনার API endpoint
      setMonthlyStatsData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error("Error fetching monthly stats:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-xl p-6">
        <div className="flex items-center justify-center h-64">
          <FaSpinner className="animate-spin text-3xl text-purple-600" />
          <span className="ml-2 text-gray-600">Loading chart data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-md rounded-xl p-6">
        <div className="text-center text-red-600">
          <p>Error loading chart data: {error}</p>
          <button 
            onClick={fetchMonthlyStats}
            className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FaCalendarAlt className="text-purple-600" />
        Monthly Growth Trends
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyStatsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="users" 
            stroke="#3B82F6" 
            strokeWidth={3}
            name="New Users"
          />
          <Line 
            type="monotone" 
            dataKey="donations" 
            stroke="#10B981" 
            strokeWidth={3}
            name="Donations"
          />
          <Line 
            type="monotone" 
            dataKey="requests" 
            stroke="#EF4444" 
            strokeWidth={3}
            name="Requests"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyGrowthChart;