// DonationDetails.jsx
import { useEffect, useState } from "react";

import useAxiosSecure from "../hooks/useAxiosSecure";
import { useParams } from "react-router";

export default function DonationDetails() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [donation, setDonation] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/donation-requests/${id}`)
      .then((res) => setDonation(res.data))
      .catch((err) => console.error("Failed to fetch donation details:", err));
  }, [axiosSecure, id]);

  if (!donation) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📋 Donation Request Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        <div>
          <strong>Recipient Name:</strong> {donation.recipient_name}
        </div>
        <div>
          <strong>Blood Group:</strong> {donation.blood_group}
        </div>
        <div>
          <strong>District:</strong> {donation.district_id}
        </div>
        <div>
          <strong>Upazila:</strong> {donation.upazila_id}
        </div>
        <div>
          <strong>Hospital:</strong> {donation.hospital_name}
        </div>
        <div>
          <strong>Address:</strong> {donation.address}
        </div>
        <div>
          <strong>Donation Date:</strong> {donation.donation_date}
        </div>
        <div>
          <strong>Donation Time:</strong> {donation.donation_time}
        </div>
        <div>
          <strong>Status:</strong> {donation.status}
        </div>
        <div>
          <strong>Requester:</strong> {donation.requester_name}
        </div>
        <div>
          <strong>Email:</strong> {donation.requester_email}
        </div>
      </div>

      <div className="mt-6">
        <strong>Message:</strong>
        <p className="mt-2 bg-gray-100 p-3 rounded-lg">{donation.message}</p>
      </div>
    </div>
  );
}
