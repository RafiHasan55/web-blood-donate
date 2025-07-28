import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router";


const DonorDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/donation-requests?email=${user.email}&limit=3`)
        .then((res) => setDonations(res.data))
        .catch((err) => console.error("Failed to fetch donations:", err));
    }
  }, [user, axiosSecure]);


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
      <h2 className="text-3xl font-bold text-slate-700 mb-6">
        👋 Welcome, {user?.displayName || "Donor"}
      </h2>

      {donations.length > 0 && (
        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            🩸 Recent Donation Requests
          </h3>
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
                {donations.map((donation) => (
                  <tr key={donation._id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{donation.recipient_name}</td>
                    <td className="p-2">
                      {donation.district_id}, {donation.upazila_id}
                    </td>
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
                        className="text-blue-600 underline"
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
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-right mt-4">
            <Link
              to="/dashboard/my-requests"
              className="text-blue-600 font-medium hover:underline"
            >
              View My All Requests →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
