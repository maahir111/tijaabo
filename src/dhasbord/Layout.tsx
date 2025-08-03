// Layout.jsx
import React from "react";
import { FaSignOutAlt, FaPlus, FaEnvelope, FaTachometerAlt } from "react-icons/fa";
import { Link, useNavigate, Outlet } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-blue-50 flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-gradient-to-b from-blue-700 to-blue-900 text-white p-6 shadow-lg fixed top-0 left-0 z-10">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 hover:text-blue-300 transition-colors"
          >
            <FaTachometerAlt /> Dashboard
          </Link>
          <Link
            to="/admin/add-project"
            className="flex items-center gap-3 hover:text-blue-300 transition-colors"
          >
            <FaPlus /> Add Project
          </Link>
          <Link
            to="/admin/messages"
            className="flex items-center gap-3 hover:text-blue-300 transition-colors"
          >
            <FaEnvelope /> Testimonials
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 hover:text-blue-300 transition-colors text-left focus:outline-none"
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
}
