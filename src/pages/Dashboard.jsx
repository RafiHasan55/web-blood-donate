import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import AdminDashboard from "./AdminDashboard";
import DonorDashboard from "./DonorDashboard";
import VolunteerDashboard from "./VolunteerDashboard";
import Loading from "./Loading";

export default function Dashboard() {
  const { role, loading } = useRole();

  if (loading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  if (role === "donor") {
    return <DonorDashboard></DonorDashboard>;
  }
  if (role === "volunteer") {
    return <VolunteerDashboard></VolunteerDashboard>;
  }
  if (role === "admin") {
    console.log("Rendering AdminDashboard");
    return <AdminDashboard />;
  }

  return <Navigate to={"/"} />;
}
