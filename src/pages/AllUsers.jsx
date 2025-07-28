import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function AllUsers() {
  // const [users, setUsers] = useState([]);

  const {
    isPending,
    isError,
    data: users = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/get-users");
      return data;
    },
  });
  console.log("🚀 ~ AllUsers ~ users:", users);

  const axiosSecure = useAxiosSecure();

  const handleRoleChange = (e, email) => {
    const role = e.target.value;
    axiosSecure
      .patch("/update-role", {
        role,
        email,
      })
      .then(({ data }) => {
        if (data.modifiedCount) {
          alert("update user role successfully");
        }
        console.log(data);
      });
  };

  // useEffect(() => {
  //   axiosSecure.get("/get-users").then(({ data }) => setUsers(data));
  // }, []);
  if (isLoading) {
    return <h1 className="text-5xl text-red-600">Loading.............</h1>;
  }
  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Users</h2>

      {isLoading && (
        <h1 className="text-5xl text-red-600">Loading.............</h1>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => (
          <div
            key={user.email}
            className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-white rounded-2xl shadow-md border border-gray-200"
          >
            <div className="flex-1">
              <div className="text-gray-700 font-medium">
                Name: <span className="text-blue-600">{user.email}</span>
              </div>
              <div className="text-gray-700 font-medium mt-1">
                Current Role:{" "}
                <span className="text-green-600 capitalize">{user.role}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="role"
                className="text-sm font-semibold text-gray-600"
              >
                Change Role
              </label>
              <select
                defaultValue={user.role}
                onChange={(e) => handleRoleChange(e, user.email)}
                name="role"
                id="role"
                className="px-3 py-2 border border-gray-300 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
