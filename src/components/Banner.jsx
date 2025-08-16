import Lottie from "lottie-react";

import DistrictSelect from "../pages/DistrictSelect";
import UpazilaSelect from "../pages/UpazilaSelect";
import { useState } from "react";
import { useNavigate } from "react-router";

const Banner = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [upazila, setUpazila] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ bloodGroup, districtId, upazila });
  };

  return (
    <section className="bg-white max-w-11/12 mx-auto">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between md:min-h-[55vh] lg:min-h-[90vh] max-w-7xl mx-auto px-6">
        {/* Left: Text Section */}
        <div className="py-12 text space-y-6 max-w-xl text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Find <span className="text-red-600">Blood Donors</span> Easily
          </h1>
          <p className="text-lg text-gray-600">
            Search for lifesaving blood donors near you. Fast, simple, and
            effective.
          </p>
          <div className=" flex gap-4 justify-center lg:justify-start">
            <button
              onClick={() => navigate("/registration")}
              className=" bg-red-600 text-white px-[10px] md:px-6 py-1.5 md:py-2 rounded-md hover:border hover:border-red-600 hover:text-red-600 hover:bg-white"
            >
              Join as a Donor
            </button>
            <button
              onClick={() => navigate("/search")}
              className=" border border-red-600 text-red-600 px-[10px] md:px-6 py-1.5 md:py-2 rounded-md hover:bg-red-600 hover:text-white"
            >
              Search Donors
            </button>
          </div>
        </div>

        {/* Right: Search Form */}
        <div className="mt-6 lg:mt-0.5 bg-white p-6 shadow-lg rounded-xl w-full max-w-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Search Donors
          </h3>
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Blood Group */}
            <select
              className="w-full border px-4 py-2 rounded"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              required
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

            {/* District */}
            <DistrictSelect onChange={setDistrictId} />

            {/* Upazila */}
            <UpazilaSelect
              selectedDistrictId={districtId}
              onChange={setUpazila}
            />

            <button
              type="submit"
              className="bg-red-600 w-full text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Banner;
