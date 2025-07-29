// PendingDonationRequests.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function PendingDonationRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/public-donation-requests?status=pending")
      .then((res) => setRequests(res.data))
      .catch((err) => console.error("Error loading donation requests", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        🩸 Blood Donation Requests
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white shadow rounded-lg p-5 space-y-2"
          >
            <h3 className="text-xl font-bold text-red-600">
              {req.recipient_name}
            </h3>
            <p>
              <strong>Location:</strong> {req.district_id || "N/A"}
            </p>
            <p>
              <strong>Blood Group:</strong> {req.blood_group}
            </p>
            <p>
              <strong>Date:</strong> {req.donation_date}
            </p>
            <p>
              <strong>Time:</strong> {req.donation_time}
            </p>
            <Link
              to={`/donation-request/${req._id}`}
              className="text-indigo-600 underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
