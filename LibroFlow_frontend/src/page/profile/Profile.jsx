import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  User as UserIcon,
  Mail,
  ShieldCheck,
  BookOpen,
  Calendar,
  Settings,
} from "lucide-react";
import { useAuth } from "../../contex/AuthContext";
import SideBar from "../../components/side-bar/SideBar";
import AdminHeader from "../../components/header/AdminHeader";

const ProfilePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/api/v1/user/bookItem/user/1/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "BORROWED":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "RETURNED":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* ===== SIDEBAR ===== */}
      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* ===== RIGHT SIDE (Header + Content) ===== */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <AdminHeader
          children="My Profile"
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto px-6 lg:px-12 py-10 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
          <div className="max-w-6xl mx-auto">
            {/* ===== PROFILE HEADER ===== */}
            <div className="relative mb-16">
              <div className="h-40 sm:h-48 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-3xl shadow-lg shadow-indigo-200/50" />

              <div className="relative -mt-20 px-6 flex flex-col sm:flex-row items-center sm:items-end gap-6">
                {/* Avatar */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white/90 backdrop-blur-md rounded-3xl p-1.5 shadow-md ring-1 ring-gray-200">
                  <div className="w-full h-full bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500">
                    <UserIcon size={36} />
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    {data?.firstName} {data?.lastName}
                  </h1>

                  <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                    <span className="px-3 py-1 bg-indigo-600/90 text-white text-xs font-semibold rounded-xl uppercase tracking-wider shadow-sm">
                      {user?.role || "User"}
                    </span>

                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <Mail size={14} /> {data?.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== MAIN GRID ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* LEFT COLUMN */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                    Account Overview
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50/70 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300">
                      <div className="p-2 bg-white rounded-xl text-indigo-500 shadow-sm">
                        <ShieldCheck size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase">
                          Verification
                        </p>
                        <p className="text-sm font-bold text-gray-700">
                          Account Verified
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50/70 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300">
                      <div className="p-2 bg-white rounded-xl text-purple-500 shadow-sm">
                        <Settings size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase">
                          Preferences
                        </p>
                        <p className="text-sm font-bold text-gray-700">
                          English (UK)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-8">
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-900">
                        Your Reading Journey
                      </h3>
                      <p className="text-gray-400 text-sm">
                        History of borrowed and returned books
                      </p>
                    </div>

                    <div className="bg-indigo-50 px-4 py-2 rounded-xl shadow-sm">
                      <span className="text-indigo-600 font-extrabold text-lg">
                        {data?.length || 0}
                      </span>
                      <p className="text-xs font-semibold text-indigo-400 uppercase">
                        Total Items
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {data && data.length > 0 ? (
                      data.map((item, index) => (
                        <div
                          key={index}
                          className="p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex gap-4">
                              <div className="w-12 h-16 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-400">
                                <BookOpen size={20} />
                              </div>

                              <div>
                                <span
                                  className={`text-[10px] px-2.5 py-1 rounded-lg uppercase font-semibold tracking-wide border shadow-sm ${getStatusStyle(
                                    item.status,
                                  )}`}
                                >
                                  {item.status}
                                </span>

                                <h4 className="font-bold text-gray-900 mt-2">
                                  {item.book?.title}
                                </h4>

                                <p className="text-sm text-gray-500">
                                  {item.book?.author} • {item.book?.pages} pages
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                              <div>
                                <p className="text-xs text-gray-400 uppercase">
                                  Started
                                </p>
                                <p className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  {formatDate(item.startingDate)}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-gray-400 uppercase">
                                  Finished
                                </p>
                                <p className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  {formatDate(item.finishingDate)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
                        <p className="text-gray-400 font-semibold">
                          No book activity recorded yet.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
