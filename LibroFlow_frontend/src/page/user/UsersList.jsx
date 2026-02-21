import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/header/AdminHeader";
import SideBar from "../../components/side-bar/SideBar";
import axiosInstance from "../../utils/axiosInstance";
import { Users, AlertCircle } from "lucide-react";
import { useAuth } from "../../contex/AuthContext";

const UsersList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Modal States
  const [isChange, setIsChange] = useState(false);
  const [email, setEmail] = useState("");
  const [roleLength, setRoleLength] = useState(0);

  const handleChangeRoleRequest = (e, r) => {
    setEmail(e);
    setRoleLength(r);
    setIsChange(true); // Open the modal
  };

  const handleChangeRole = async () => {
    try {
      setLoading(true);
      setIsChange(false); // Close modal immediately for UX
      let roles = roleLength === 2 ? ["USER"] : ["USER", "ADMIN"];

      await axiosInstance.post(
        `http://localhost:8080/api/v1/admin/change/user-role/${email}`,
        roles,
      );

      fetchUsers();
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/v1/admin/users/all");
      setUsers(response.data.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900 relative">
      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${isChange ? "blur-sm" : ""}`}
      >
        <AdminHeader
          children="Users Management"
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <main className="flex-1 p-6 md:p-10 space-y-6">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Users className="w-10 h-10 text-indigo-600 animate-spin" />
            </div>
          ) : users.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
              <p className="text-gray-500">No users found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {users.map((u, idx) => (
                <div
                  key={idx}
                  className="flex flex-col p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-indigo-600 font-semibold truncate">
                      {u.email}
                    </div>
                    <div className="flex flex-col relative items-center gap-2">
                      <div className="relative">
                        <div
                          onClick={() =>
                            handleChangeRoleRequest(u.email, u.role.length)
                          }
                          className={`w-18 h-7 flex items-center justify-center rounded-full cursor-pointer relative shadow-inner transition-colors ${
                            u.role.length === 2
                              ? "bg-red-500 text-white"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 transition-all duration-200 w-6 h-6 bg-white rounded-full shadow transform hover:scale-110 ${
                              u.role.length !== 2 ? "left-0.5" : "right-0.5"
                            }`}
                          ></div>
                          <span
                            className={`flex font-bold text-xs justify-center items-center transition-all ${u.role.length !== 2 ? "ml-5" : "mr-5"}`}
                          >
                            {u.role.length === 2 ? "Admin" : "User"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Users size={16} />
                    <span>
                      Role Info{" "}
                      {user?.sub === u.email && (
                        <b className="text-indigo-600 ml-1">(Me)</b>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Confirmation Modal */}
      {isChange && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 max-w-sm w-full mx-4 transform transition-all scale-100">
            <div className="flex items-center gap-3 mb-4 text-amber-600">
              <AlertCircle size={24} />
              <h3 className="text-lg font-bold text-gray-900">
                Confirm Change
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              Do you really want to change the role for{" "}
              <span className="font-semibold text-gray-800">{email}</span>?
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsChange(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleChangeRole}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-95"
              >
                Confirm Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
