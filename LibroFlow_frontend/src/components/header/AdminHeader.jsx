import { Menu } from "lucide-react";
import React, { useState } from "react";

const AdminHeader = ({ children, setIsSidebarOpen }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-6 lg:px-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition lg:hidden"
          >
            <Menu size={22} />
          </button>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            {children}
          </h3>
        </div>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl animate-fadeIn">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Confirm Logout
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  handleLogout(); // your logout logic
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
