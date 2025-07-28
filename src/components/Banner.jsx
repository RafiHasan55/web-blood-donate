import Lottie from "lottie-react";

import DistrictSelect from "../pages/DistrictSelect";
import UpazilaSelect from "../pages/UpazilaSelect";
import { useState } from "react";

const Banner = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [upazila, setUpazila] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // trigger search logic here
    console.log({ bloodGroup, districtId, upazila });
  };

  return (
    <section className="bg-white">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between min-h-[90vh] max-w-7xl mx-auto px-6">
        {/* Left: Text Section */}
        <div className="text space-y-6 max-w-xl text-center md:text-left">
          <h1 className="text-5xl font-bold leading-tight">
            Find <span className="text-red-600">Blood Donors</span> Easily
          </h1>
          <p className="text-lg text-gray-600">
            Search for lifesaving blood donors near you. Fast, simple, and
            effective.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <button className="bg-red-600 text-white px-6 py-2 rounded shadow hover:bg-red-700">
              Join Now
            </button>
            <button className="border border-red-600 text-red-600 px-6 py-2 rounded hover:bg-red-50">
              See More
            </button>
          </div>
        </div>

        {/* Right: Search Form */}
        <div className="bg-white p-6 shadow-lg rounded-xl w-full max-w-md">
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
              className="bg-red-600 w-full text-white px-4 py-2 rounded hover:bg-red-700"
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
