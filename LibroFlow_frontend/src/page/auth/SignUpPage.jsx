import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  UserPlus,
  ArrowLeft,
  Loader2,
  CheckCircle2,
} from "lucide-react";

function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("ROLE_USER");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      // Basic Validation
      if (!fullName || !email || !password || !confirmPassword) {
        throw new Error("Please fill in all fields.");
      }
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      // Logic to determine endpoint based on role
      const endpointPath = role === "ROLE_ADMIN" ? "admin" : "user";

      const response = await axios.post(
        `http://localhost:8080/api/v1/auth/${endpointPath}/signup`,
        {
          firstName: fullName,
          email: email,
          password: password,
          role: role,
        },
      );

      console.log("Signup Success:", response.data);
      // Redirect to login on success
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4 py-12 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 -left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 -right-10 w-96 h-96 bg-black/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="max-w-lg w-full backdrop-blur-xl bg-white/95 rounded-3xl shadow-2xl p-8 md:p-10 z-10 border border-white/20">
        {/* Header Section */}
        <button
          onClick={() => navigate("/")}
          className="group flex items-center text-sm font-semibold text-gray-400 hover:text-indigo-600 transition-colors mb-8"
        >
          <ArrowLeft
            size={18}
            className="mr-2 group-hover:-translate-x-1 transition-transform"
          />
          Back to login
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl shadow-xl shadow-indigo-200 mb-6 text-white rotate-3">
            <UserPlus size={32} />
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">
            Join Us
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            Create your library account in seconds
          </p>
        </div>

        <div className="space-y-5">
          {/* Full Name Input */}
          <div className="group">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Full Name
            </label>
            <div className="relative mt-1.5">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
              <input
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                placeholder="Enter your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="group">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
              <input
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="group">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Confirm
              </label>
              <div className="relative mt-1.5">
                <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Role Segmented Switch */}
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Account Type
            </label>
            <div className="mt-2 p-1.5 bg-gray-100 rounded-2xl flex relative h-12">
              <div
                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-md transition-all duration-300 ease-out ${
                  role === "ROLE_USER" ? "left-1.5" : "left-[calc(50%+3px)]"
                }`}
              />
              <button
                type="button"
                onClick={() => setRole("ROLE_USER")}
                className={`relative z-10 flex-1 flex items-center justify-center gap-2 text-sm font-bold transition-colors ${
                  role === "ROLE_USER" ? "text-indigo-600" : "text-gray-500"
                }`}
              >
                <User size={16} /> User
              </button>
              <button
                type="button"
                onClick={() => setRole("ROLE_ADMIN")}
                className={`relative z-10 flex-1 flex items-center justify-center gap-2 text-sm font-bold transition-colors ${
                  role === "ROLE_ADMIN" ? "text-indigo-600" : "text-gray-500"
                }`}
              >
                <ShieldCheck size={16} /> Admin
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-100 animate-shake">
              <p className="text-sm text-red-600 text-center font-bold tracking-tight">
                {error}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-black text-white font-extrabold py-4 rounded-2xl transition-all shadow-xl shadow-gray-200 active:scale-[0.97] disabled:opacity-70 mt-4 flex items-center justify-center gap-3 group"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Get Started
                <ArrowLeft
                  size={20}
                  className="rotate-180 group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
