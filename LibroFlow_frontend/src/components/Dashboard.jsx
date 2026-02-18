import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  PlusCircle,
  BookOpen,
  User,
  LayoutDashboard,
} from "lucide-react";

function WelcomeDashboard({ username = "Admin" }) {
  // Default to Admin if username is missing
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token we stored during login
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleAddBook = () => {
    navigate("/add-book");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-gray-900 px-8 py-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <LayoutDashboard size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              Library Manager
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all text-sm font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="p-8 md:p-12">
          {/* Welcome Message */}
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              Hello, {username}! <span className="animate-bounce">👋</span>
            </h2>
            <p className="text-gray-500 mt-2 text-lg">
              Everything looks good today. What would you like to do?
            </p>
          </div>

          {/* Quick Stats/Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-blue-500 rounded-xl text-white">
                <BookOpen size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Active Books
                </p>
                <p className="text-2xl font-bold text-blue-900">24</p>
              </div>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-100 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-purple-500 rounded-xl text-white">
                <User size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-600">Role</p>
                <p className="text-2xl font-bold text-purple-900">
                  Administrator
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddBook}
              className="flex-1 group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-blue-200 hover:-translate-y-1"
            >
              <PlusCircle
                size={22}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
              Add New Book
            </button>

            <button className="flex-1 flex items-center justify-center gap-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold py-4 px-6 rounded-2xl border border-gray-200 transition-all">
              <BookOpen size={22} />
              View Catalog
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-gray-50 border-t border-gray-100 px-8 py-4 text-center">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
            System Online • Secure Session Active
          </p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeDashboard;
