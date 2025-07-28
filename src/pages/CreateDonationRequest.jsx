import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";

import DistrictSelect from "./DistrictSelect";
import UpazilaSelect from "./UpazilaSelect";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function CreateDonationRequest() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [status, setStatus] = useState("checking");
  const [formData, setFormData] = useState({
    recipient_name: "",
    district_id: "",
    upazila_id: "",
    hospital_name: "",
    address: "",
    blood_group: "",
    donation_date: "",
    donation_time: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await axiosSecure.get("/get-user-role");
        if (res.data.status === "active") {
          setStatus("active");
        } else {
          setStatus("blocked");
        }
      } catch (err) {
        console.error("❌ Error checking user status:", err);
        toast.error("Authorization failed. Please login again.");
      }
    };

    if (user) checkStatus();
  }, [user, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      requester_name: user.displayName,
      requester_email: user.email,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/donation-requests", payload);
      toast.success("Donation request submitted!");

      // reset form
      setFormData({
        recipient_name: "",
        district_id: "",
        upazila_id: "",
        hospital_name: "",
        address: "",
        blood_group: "",
        donation_date: "",
        donation_time: "",
        message: "",
      });
    } catch (err) {
      console.error("Request error:", err);
      toast.error("Submission failed.");
    }
  };

  if (status === "checking")
    return <p className="text-center mt-10">Checking user status...</p>;
  if (status === "blocked")
    return (
      <p className="text-center mt-10 text-red-600">
        ❌ You are blocked from creating requests.
      </p>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-xl space-y-6 mt-10"
    >
      <h2 className="text-2xl font-bold text-center text-gray-700">
        🩸 Create Donation Request
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label>Requester Name</label>
          <input
            type="text"
            value={user.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label>Requester Email</label>
          <input
            type="email"
            value={user.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label>Recipient Name</label>
          <input
            type="text"
            name="recipient_name"
            value={formData.recipient_name}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Recipient District</label>
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
        </div>

        <div>
          <label>Recipient Upazila</label>
          <UpazilaSelect
            selectedDistrictId={formData.district_id}
            selectedUpazilaId={formData.upazila_id}
            onChange={(id) =>
              setFormData((prev) => ({ ...prev, upazila_id: id }))
            }
          />
        </div>

        <div>
          <label>Hospital Name</label>
          <input
            type="text"
            name="hospital_name"
            value={formData.hospital_name}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Full Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Blood Group</label>
          <select
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Donation Date</label>
          <input
            type="date"
            name="donation_date"
            value={formData.donation_date}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Donation Time</label>
          <input
            type="time"
            name="donation_time"
            value={formData.donation_time}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
      </div>

      <div>
        <label>Request Message</label>
        <textarea
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          className="textarea textarea-bordered w-full"
        ></textarea>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200"
        >
          Request
        </button>
      </div>
    </form>
  );
}
