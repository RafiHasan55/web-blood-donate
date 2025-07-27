import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import AdminDashboard from "./AdminDashboard";
import DonorDashboard from "./DonorDashboard";

export default function Dashboard() {
  const { role, loading } = useRole();

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (role === "donor") {
    return <DonorDashboard></DonorDashboard>;
  }
  if (role === "volunteer") {
    return <div>Moderator Dashboard</div>;
  }
if (role === "admin") {
  console.log("Rendering AdminDashboard");
  return <AdminDashboard />;
}

  return <Navigate to={"/"} />;
}
