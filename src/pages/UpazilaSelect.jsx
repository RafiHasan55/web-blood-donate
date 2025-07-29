import { useEffect, useState } from "react";

const UpazilaSelect = ({ selectedDistrictId, value, onChange }) => {
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        const tableEntry = data.find(
          (item) => item.type === "table" && item.name === "upazilas"
        );
        if (tableEntry && Array.isArray(tableEntry.data)) {
          setUpazilas(tableEntry.data);
        } else {
          console.error("Upazila data not found or malformed.");
        }
      })
      .catch((err) => console.error("Failed to load upazilas:", err));
  }, []);

  useEffect(() => {
    if (selectedDistrictId) {
      const filtered = upazilas.filter(
        (u) => String(u.district_id) === String(selectedDistrictId)
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrictId, upazilas]);

  return (
    <div className="flex justify-start items-center mt-4">
      <div>
        <span className="text-2xl font-semibold text-slate-600 mr-2">🏞️</span>
      </div>
      <select
        name="upazila"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={!selectedDistrictId}
        className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all duration-200 disabled:opacity-50"
        required
      >
        <option disabled value="">
          {selectedDistrictId ? "Select your upazila" : "Select district first"}
        </option>
        {filteredUpazilas.map((upazila) => (
          <option key={upazila.id} value={upazila.name}>
            {upazila.name} ({upazila.bn_name})
          </option>
        ))}
      </select>
    </div>
  );
};
export default UpazilaSelect;
