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
      if (!fullName || !email || !password || !confirmPassword) {
        throw new Error("Please fill in all fields.");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      const endpointPath = role === "ROLE_ADMIN" ? "admin" : "user";

      await axios.post(
        `http://localhost:8080/api/v1/auth/${endpointPath}/signup`,
        {
          firstName: fullName,
          email,
          password,
          role,
        },
      );

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-3xl shadow-sm p-8 sm:p-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-sm font-semibold text-gray-400 hover:text-indigo-600 transition-colors mb-8"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to login
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-2xl mb-5">
            <UserPlus size={28} className="text-indigo-600" />
          </div>

          <h2 className="text-3xl font-bold text-indigo-600">Create Account</h2>
          <p className="text-gray-500 mt-2">Join the library system</p>
        </div>

        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="Enter your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm
              </label>
              <div className="relative">
                <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Role Switch */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Account Type
            </label>

            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setRole("ROLE_USER")}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${
                  role === "ROLE_USER"
                    ? "bg-white shadow text-indigo-600"
                    : "text-gray-500"
                }`}
              >
                <User size={16} className="inline mr-1" /> User
              </button>

              <button
                type="button"
                onClick={() => setRole("ROLE_ADMIN")}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${
                  role === "ROLE_ADMIN"
                    ? "bg-white shadow text-indigo-600"
                    : "text-gray-500"
                }`}
              >
                <ShieldCheck size={16} className="inline mr-1" /> Admin
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200">
              <p className="text-sm text-red-600 font-semibold text-center">
                {error}
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-indigo-200"
            } flex items-center justify-center gap-2`}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowLeft size={18} className="rotate-180" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
