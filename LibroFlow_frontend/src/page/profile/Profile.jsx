import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  User as UserIcon,
  Mail,
  ShieldCheck,
  BookOpen,
  Calendar,
  Settings,
  Camera,
  Layers,
  Info,
} from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Helper to format dates from the DTO
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Helper for Status Badge Styling
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* PROFILE HEADER */}
        <div className="relative mb-12">
          <div className="h-40 bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 rounded-[2rem] shadow-lg"></div>
          <div className="absolute -bottom-10 left-10 flex items-center gap-6">
            <div className="w-28 h-28 bg-white rounded-3xl p-1.5 shadow-xl">
              <div className="w-full h-full bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500">
                <UserIcon size={40} />
              </div>
            </div>
            <div className="pb-2">
              <h1 className="text-3xl font-black text-gray-900 leading-none mb-1">
                {user?.firstName} {user?.lastName}
              </h1>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">
                  {user?.role?.[0] || "User"}
                </span>
                <span className="text-gray-400 text-xs font-bold flex items-center gap-1">
                  <Mail size={12} /> {user?.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-20">
          {/* SIDEBAR INFO */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
                Account Overview
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-indigo-100 transition-colors">
                  <div className="p-2 bg-white rounded-xl text-indigo-500 shadow-sm">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase">
                      Verification
                    </p>
                    <p className="text-sm font-bold text-gray-700">
                      Account Verified
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-indigo-100 transition-colors">
                  <div className="p-2 bg-white rounded-xl text-purple-500 shadow-sm">
                    <Settings size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase">
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

          {/* MAIN ACTIVITY: BOOK ITEMS */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">
                    Your Reading Journey
                  </h3>
                  <p className="text-gray-400 text-xs font-medium">
                    History of all borrowed and returned books
                  </p>
                </div>
                <div className="bg-indigo-50 px-4 py-2 rounded-xl">
                  <span className="text-indigo-600 font-black text-lg">
                    {user?.length || 0}
                  </span>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase ml-2">
                    Total Items
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {user && user.length > 0 ? (
                  user.map((item, index) => (
                    <div
                      key={index}
                      className="group p-5 bg-gray-50 rounded-2xl border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Book Info Mapping to BookDto */}
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-20 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-300">
                            <BookOpen size={24} />
                          </div>
                          <div>
                            <span
                              className={`text-[8px] font-black px-2 py-0.5 rounded-md uppercase border mb-2 inline-block ${getStatusStyle(item.status)}`}
                            >
                              {item.status}
                            </span>
                            <h4 className="text-sm font-black text-gray-900 group-hover:text-indigo-600 transition-colors">
                              {item.book?.title}
                            </h4>
                            <p className="text-xs font-bold text-gray-400 flex items-center gap-1">
                              By {item.book?.author} • <Layers size={10} />{" "}
                              {item.book?.pages} pages
                            </p>
                          </div>
                        </div>

                        {/* Dates Mapping to BookItemDto */}
                        <div className="flex items-center gap-8 border-t md:border-t-0 pt-4 md:pt-0">
                          <div className="text-center">
                            <p className="text-[9px] font-black text-gray-300 uppercase mb-1">
                              Started
                            </p>
                            <p className="text-xs font-bold text-gray-600 flex items-center gap-1">
                              <Calendar size={12} className="text-indigo-400" />{" "}
                              {formatDate(item.startingDate)}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-[9px] font-black text-gray-300 uppercase mb-1">
                              Due/Finished
                            </p>
                            <p className="text-xs font-bold text-gray-600 flex items-center gap-1">
                              <Calendar size={12} className="text-purple-400" />{" "}
                              {formatDate(item.finishingDate)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Description Toggle (Optional expansion) */}
                      {item.book?.description && (
                        <div className="mt-4 pt-4 border-t border-gray-100 hidden group-hover:block">
                          <p className="text-[10px] text-gray-500 leading-relaxed italic">
                            <Info size={10} className="inline mr-1" />{" "}
                            {item.book.description}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 font-bold text-sm">
                      No book activity recorded yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
