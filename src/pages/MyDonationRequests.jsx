import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router";

export default function MyDonationRequests() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
 const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/my-donation-requests?page=${page}&limit=${limit}&status=${statusFilter}`)
        .then((res) => {
          setRequests(res.data.donations);
          setTotal(res.data.total);
        })
        .catch((err) => console.error("Failed to fetch requests:", err));
    }
  }, [user, axiosSecure, page, statusFilter]);

  const totalPages = Math.ceil(total / limit);


    const handleDelete = async (id) => {
  if (confirm("Are you sure you want to delete this request?")) {
    try {
      await axiosSecure.delete(`/donation-requests/${id}`);
      setDonations((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }
};

const handleStatusChange = async (id, newStatus) => {
  try {
    await axiosSecure.patch(`/donation-requests/${id}`, { status: newStatus });
    setDonations((prev) =>
      prev.map((d) => (d._id === id ? { ...d, status: newStatus } : d))
    );
  } catch (err) {
    console.error("Status update failed:", err);
  }
};

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-slate-700 mb-6">🩸 My Donation Requests</h2>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-4">
        {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-1 rounded-full border ${
              statusFilter === status ? "bg-red-600 text-white" : "bg-white text-gray-700"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-xl p-5">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Recipient</th>
                <th className="p-2">Location</th>
                <th className="p-2">Date</th>
                <th className="p-2">Time</th>
                <th className="p-2">Blood Group</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((donation) => (
                  <tr key={donation._id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{donation.recipient_name}</td>
                    <td className="p-2">{donation.district_id}, {donation.upazila_id}</td>
                    <td className="p-2">{donation.donation_date}</td>
                    <td className="p-2">{donation.donation_time}</td>
                    <td className="p-2">{donation.blood_group}</td>
                    <td className="p-2 capitalize">{donation.status}</td>
                    <td className="p-2 space-x-2">
                                   {donation.status === "inprogress" && (
  <>
    <button className="text-green-600" onClick={() => handleStatusChange(donation._id, "done")}>Done</button>
    <button className="text-red-500" onClick={() => handleStatusChange(donation._id, "canceled")}>Cancel</button>
  </>
)}
                      <Link
                        to={`/dashboard/edit-donation/${donation._id}`}
                        className="text-red-600 underline"
                      >
                        Edit
                      </Link>
                      <button
                        className="text-red-600 underline"
                        onClick={() => handleDelete(donation._id)}
                      >
                        Delete
                      </button>
                      <Link
                        to={`/dashboard/donation-details/${donation._id}`}
                        className="text-indigo-600 underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-400 py-6">
                    No donation requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num + 1}
                onClick={() => setPage(num + 1)}
                className={`px-4 py-1 rounded ${
                  page === num + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {num + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
