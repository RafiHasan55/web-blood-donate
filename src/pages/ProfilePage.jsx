import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import DistrictSelect from "./DistrictSelect";
import UpazilaSelect from "./UpazilaSelect";

const ProfilePage = () => {
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  console.log(formData)

  useEffect(() => {
    axiosSecure
      .get("/user/profile")
      .then((res) => {
        setProfile(res.data);
        setFormData(res.data);
      })
      .catch((err) => console.error("Failed to fetch profile:", err));
  }, [axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch("/user/profile/update", formData);
      setProfile(formData);
      setEditMode(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditMode(false);
  };

  if (!profile)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
        <div className="avatar">
  <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
    <img src={formData.photo} />
  </div>
</div>
          <span className="ml-2">Profile Dashboard</span>
        </h2>
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="bg-orange-500 text-white px-5 py-2 rounded-lg shadow hover:bg-orange-600"
          >
            Edit
          </button>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700"
      >
        <div>
          <label className="block font-semibold mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            readOnly={!editMode}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Photo URL</label>
          <input
            type="text"
            name="photo"
            value={formData.photo || ""}
            onChange={handleChange}
            readOnly={!editMode}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Blood Group</label>
          <select
            name="blood"
            value={formData.blood || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="input input-bordered w-full"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">District</label>
          {!editMode ? (
            <input
              type="text"
              value={formData.district_name || ""}
              readOnly
              className="input input-bordered w-full"
            />
          ) : (
            <DistrictSelect
              selected={formData.district_id || ""}
              onChange={(id) =>
                setFormData((prev) => ({
                  ...prev,
                  district_id: id,
                  upazila_id: "",
                }))
              }
              disabled={!editMode}
            />
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Upazila</label>
          {!editMode ? (
            <input
              type="text"
              value={formData.upazila_name || ""}
              readOnly
              className="input input-bordered w-full"
            />
          ) : (
            <UpazilaSelect
              selectedDistrictId={formData.district_id || ""}
              selectedUpazilaId={formData.upazila_id || ""}
              onChange={(id) =>
                setFormData((prev) => ({ ...prev, upazila_id: id }))
              }
              disabled={!editMode}
            />
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            readOnly={!editMode}
            className="input input-bordered w-full"
          />
        </div>

        {editMode && (
          <div className="sm:col-span-2 flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
