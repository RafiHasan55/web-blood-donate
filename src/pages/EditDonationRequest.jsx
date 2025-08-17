import { useEffect, useState } from "react";

import useAxiosSecure from "../hooks/useAxiosSecure";
import DistrictSelect from "./DistrictSelect";

import { toast } from "react-toastify";
import UpazilaSelect from "./UpazilaSelect";
import { useNavigate, useParams } from "react-router";

export default function EditDonationRequest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/donation-requests/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => {
        console.error("Error fetching donation request:", err);
        toast.error("Failed to load donation request");
      });
  }, [axiosSecure, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/donation-requests/${id}`, formData);
      toast.success("Donation request updated successfully");
      navigate("/dashboard/my-requests");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update request");
    }
  };

  if (!formData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        ✏️ Edit Donation Request
      </h2>

      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        <input
          type="text"
          name="recipient_name"
          value={formData.recipient_name || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Recipient Name"
        />

        <DistrictSelect
          selected={formData.district_id}
          onChange={(id) =>
            setFormData((prev) => ({
              ...prev,
              district_id: id,
              upazila_id: "",
            }))
          }
        />

        <UpazilaSelect
          selectedDistrictId={formData.district_id}
          selectedUpazilaId={formData.upazila_id}
          onChange={(id) =>
            setFormData((prev) => ({ ...prev, upazila_id: id }))
          }
        />

        <input
          type="text"
          name="hospital_name"
          value={formData.hospital_name || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Hospital Name"
        />

        <input
          type="text"
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Full Address"
        />

        <select
          name="blood_group"
          value={formData.blood_group || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="donation_date"
          value={formData.donation_date || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="time"
          name="donation_time"
          value={formData.donation_time || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <textarea
          name="message"
          rows="4"
          value={formData.message || ""}
          onChange={handleChange}
          className="textarea textarea-bordered sm:col-span-2"
          placeholder="Why is this request needed?"
        ></textarea>

        <div className="sm:col-span-2 text-right">
          <button type="submit" className="btn bg-red-600 text-white hover:bg-red-700">
            Update Request
          </button>
        </div>
      </form>
    </div>
  );
}
