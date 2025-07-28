import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaEllipsisV } from "react-icons/fa";

export default function AllUsers() {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null); // 👈 Added
  const limit = 6;

  useEffect(() => {
    axiosSecure
      .get(`/get-users?status=${filter}&page=${page}&limit=${limit}`)
      .then(({ data }) => {
        setUsers(data.users);
        setTotalPages(Math.ceil(data.total / limit));
      });
  }, [axiosSecure, filter, page]);

  const updateStatus = async (email, status) => {
    await axiosSecure.patch("/update-status", { email, status });
    setUsers((prev) =>
      prev.map((user) => (user.email === email ? { ...user, status } : user))
    );
    setOpenDropdownIndex(null); // 👈 Close dropdown
  };

  const updateRole = async (email, role) => {
    await axiosSecure.patch("/update-role", { email, role });
    setUsers((prev) =>
      prev.map((user) => (user.email === email ? { ...user, role } : user))
    );
    setOpenDropdownIndex(null); // 👈 Close dropdown
  };

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Users</h2>

      <div className="mb-4 flex gap-3">
        {["all", "active", "blocked"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm border font-medium ${
              filter === s
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Avatar</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.email}
                className="border-t hover:bg-gray-50 text-sm relative"
              >
                <td className="p-3">
                  <img
                    src={user.photo || "/avatar.png"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3 capitalize">{user.status}</td>
                <td className="p-3">
                  <div className="relative inline-block text-left">
                    <button
                      className="p-2 rounded-full hover:bg-gray-200"
                      onClick={() => toggleDropdown(index)}
                    >
                      <FaEllipsisV />
                    </button>

                    {openDropdownIndex === index && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-20">
                        <button
                          className="block px-4 py-2 w-full hover:bg-gray-100 text-left"
                          onClick={() =>
                            updateStatus(
                              user.email,
                              user.status === "active" ? "blocked" : "active"
                            )
                          }
                        >
                          {user.status === "active" ? "Block" : "Unblock"}
                        </button>
                        {user.role !== "volunteer" && (
                          <button
                            className="block px-4 py-2 w-full hover:bg-gray-100 text-left"
                            onClick={() => updateRole(user.email, "volunteer")}
                          >
                            Make Volunteer
                          </button>
                        )}
                        {user.role !== "admin" && (
                          <button
                            className="block px-4 py-2 w-full hover:bg-gray-100 text-left"
                            onClick={() => updateRole(user.email, "admin")}
                          >
                            Make Admin
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
