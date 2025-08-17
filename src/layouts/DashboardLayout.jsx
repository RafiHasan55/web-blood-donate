import { Outlet } from "react-router";
import DashboardSidebar from "../components/DashboardSidebar";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row dark:bg-black bg-gray-100 relative z-[10]">
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between md:hidden bg-white shadow px-4 py-3">
        <h2 className="text-xl font-semibold text-red-600">Dashboard</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-gray-700"
        >
          {isOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white shadow-md p-5 fixed z-50 top-0 h-full transition-transform duration-300 md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:block`}
      >
        <div className="text-2xl font-bold mb-10 text-center text-red-600 hidden md:block">
          Dashboard
        </div>
        <DashboardSidebar />
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
