import { NavLink } from "react-router";
import useRole from "../hooks/useRole";

export default function DashboardSidebar() {
  const NavItem = ({ to, icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
          isActive
            ? "bg-blue-100 text-red-600"
            : "text-gray-700 hover:bg-gray-200"
        }`
      }
    >
      {icon} {label}
    </NavLink>
  );

  const { role, loading } = useRole();

  if (loading) return <h1>Loading...</h1>;

  const isAdmin = role === "admin";
  const isVolunteer = role === "volunteer";

  return (
    <nav className="flex flex-col gap-4">
      <NavItem
        to="/dashboard"
        label={`${
          role?.charAt(0).toUpperCase() + role?.slice(1)
        } Dashboard Home`}
      />

      {isAdmin && <NavItem to="/dashboard/all-users" label="All Users" />}

      <NavItem
        to="/dashboard/create-donation-request"
        label="Donation Request"
      />

      {(isAdmin || isVolunteer) && (
        <NavItem
          to="/dashboard/content-management"
          label="Content Management"
        />
      )}
      <NavItem to="/dashboard/my-requests" label="My Requests" />

      {(isAdmin || isVolunteer) && (
        <NavItem
          to="/dashboard/all-blood-donation-request"
          label="All Blood Requests"
        />
      )}

      <NavItem to="/dashboard/profile" label="Profile" />
    </nav>
  );
}
