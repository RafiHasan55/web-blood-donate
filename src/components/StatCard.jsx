const StatCard = ({ icon, title, value, bgColor = "bg-blue-100", textColor = "text-red-600" }) => (
  <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
    <div className={`${bgColor} ${textColor} p-3 rounded-full`}>{icon}</div>
    <div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  </div>
);

export default StatCard;