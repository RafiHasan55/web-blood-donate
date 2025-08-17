import { useState } from "react";
import DistrictSelect from "./DistrictSelect";
import UpazilaSelect from "./UpazilaSelect";

export default function SearchDonorPage() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [upazila, setUpazila] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    // Simulated API call - Replace with axios call later
    console.log({ bloodGroup, districtId, upazila });

    // Example dummy result
    setResults([
      {
        id: 1,
        name: "John Doe",
        bloodGroup: bloodGroup,
        district: districtId,
        upazila: upazila,
        phone: "01800000000",
      },
    ]);
  };

  return (
    <section className="min-h-screen  py-12 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
        Search Blood Donors
      </h2>

      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black bg-white p-6 rounded-xl shadow-md mb-10"
      >
        <select
          className="border px-4 py-2 rounded"
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

        <DistrictSelect onChange={setDistrictId} />
        <UpazilaSelect selectedDistrictId={districtId} onChange={setUpazila} />

        <div className="md:col-span-3">
          <button
            type="submit"
            className="bg-red-600 w-full text-white py-2 rounded hover:bg-red-700"
          >
            Search
          </button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((donor) => (
            <div
              key={donor.id}
              className="bg-white p-4 rounded shadow border flex flex-col md:flex-row justify-between"
            >
              <div>
                <h4 className="text-xl font-semibold">{donor.name}</h4>
                <p>Blood Group: {donor.bloodGroup}</p>
                <p>
                  Location: {donor.district}, {donor.upazila}
                </p>
              </div>
              <div className="mt-3 md:mt-0">
                <p className="font-medium">📞 {donor.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
