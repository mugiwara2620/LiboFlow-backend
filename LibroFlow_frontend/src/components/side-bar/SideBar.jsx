import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contex/AuthContext";
import {
  LogOut,
  PlusCircle,
  BookOpen,
  User,
  LayoutDashboard,
  Menu,
  X,
  Users,
  Settings,
  Plus,
  BookPlus,
  User2Icon,
} from "lucide-react";

const SideBar = ({
  setAuth,
  isSidebarOpen,
  setShowLogoutModal,
  setIsSidebarOpen,
}) => {
  const { logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const handleLogoutFunction = () => {
    logout();
    setIsSidebarOpen(false);
    setAuth(false);
    setShowLogoutModal(true);
    navigate("/");
  };
  return (
    <div>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
              lg:translate-x  `}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b">
          <h2 className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            LibroFlow
          </h2>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <NavLink to={"/"}>
            {({ isActive }) => (
              <SidebarItem icon={BookOpen} label="Books" active={isActive} />
            )}
          </NavLink>

          {isAdmin && (
            <>
              <NavLink to={"/dashboard"}>
                {({ isActive }) => (
                  <SidebarItem
                    icon={LayoutDashboard}
                    label="Dashboard"
                    active={isActive}
                  />
                )}
              </NavLink>
              <NavLink to={"/add-book"}>
                {({ isActive }) => (
                  <SidebarItem
                    icon={BookPlus}
                    label="Add Book"
                    active={isActive}
                  />
                )}
              </NavLink>
              <NavLink to={"/users"}>
                {({ isActive }) => (
                  <SidebarItem icon={Users} label="Users" active={isActive} />
                )}
              </NavLink>
            </>
          )}

          <NavLink to={"/profile"}>
            {({ isActive }) => (
              <SidebarItem
                icon={User2Icon}
                label="My Profile"
                active={isActive}
              />
            )}
          </NavLink>
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-4">
          <button
            onClick={handleLogoutFunction}
            className="flex hover:bg-red-400 hover:text-white items-center gap-3 w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-xl transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}
    </div>
  );
};
function SidebarItem({ icon: Icon, label, active }) {
  return (
    <button
      className={`flex mb-1 items-center gap-3 w-full px-4 py-2 text-sm font-medium rounded-xl transition
        ${
          active
            ? "bg-indigo-50 text-indigo-600"
            : "text-gray-600 hover:bg-gray-100"
        }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}
export default SideBar;
