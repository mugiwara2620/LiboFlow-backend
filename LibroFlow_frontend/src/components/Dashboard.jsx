import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  PlusCircle,
  BookOpen,
  User,
  LayoutDashboard,
  Menu,
  X,
  Settings,
} from "lucide-react";
import SideBar from "./side-bar/SideBar";
import AdminHeader from "./header/AdminHeader";

function WelcomeDashboard({ username = "Admin" }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAddBook = () => {
    navigate("/add-book");
  };

  return (
    <div className="min-h-screen flex bg-gray-50 relative">
      {/* Background Decorations */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <AdminHeader setIsSidebarOpen={setIsSidebarOpen} children="Dashboard" />

        {/* CONTENT */}
        <main className="flex-1 p-6 sm:p-10">
          <div className="max-w-6xl mx-auto">
            {/* Welcome */}
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 flex items-center gap-3">
                Hello, {username}! <span className=""></span>
              </h2>
              <p className="text-gray-500 mt-2 text-lg">
                Everything looks good today. What would you like to do?
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="p-6 bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-md">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Active Books
                    </p>
                    <p className="text-3xl font-bold text-gray-900">24</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-600 rounded-xl text-white shadow-md">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Role</p>
                    <p className="text-3xl font-bold text-gray-900">
                      Administrator
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddBook}
                className="flex-1 group flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg text-white font-semibold py-4 px-6 rounded-3xl transition-all duration-300 active:scale-95 transform hover:-translate-y-1"
              >
                <PlusCircle
                  size={22}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
                Add New Book
              </button>

              <button
                onClick={() => navigate("/")}
                className="flex-1 flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <BookOpen size={22} />
                View Catalog
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default WelcomeDashboard;
