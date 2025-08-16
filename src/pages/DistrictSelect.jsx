import { useEffect, useState } from "react";

const DistrictSelect = ({ onChange, value }) => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => {
        const districtData = data.find(
          (item) => item.type === "table" && item.name === "districts"
        );
        if (districtData && districtData.data) {
          setDistricts(districtData.data);
        }
      })
      .catch((err) => console.error("Failed to load districts:", err));
  }, []);

  return (
    <div className="flex justify-start items-center">
      <div className="">
        <span className="text-2xl font-semibold text-slate-600 mr-2">🏙️</span>
      </div>
      <select
        defaultValue=""
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)} // Pass district.id
        className="outline-none w-full border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all duration-200"
        name="district"
        required
      >
        <option disabled value="">
          Select your district
        </option>
        {districts.map((district) => (
          <option key={district.id} value={district.id}>
            {district.name} ({district.bn_name})
          </option>
        ))}
      </select>
    </div>
  );
};

export default DistrictSelect;
