import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react"; // Optional: npm install lucide-react
import auth from "../../util/auth";
import authF from "../../util/auth/fu";

function LoginPage({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      if (!email || !password) {
        setError("Please enter both email and password.");
        setLoading(false);
        return;
      }
      console.log(JSON.parse(localStorage.getItem("auth")));
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/signin",
        { email, password },
      );
      localStorage.setItem("role", response.data.data.role);
      const role = localStorage.getItem("role");
      localStorage.setItem("auth", JSON.stringify(authF(role)));
      localStorage.setItem("token", response.data.data.jwt);
      axios.create({
        headers: {
          Authorization: `Bearer ${response.data.data.jwt}`,
        },
      });
      await navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-md w-full backdrop-blur-lg bg-white/90 rounded-2xl shadow-2xl p-10 transform transition-all hover:scale-[1.01]">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl shadow-lg mb-4">
            <Lock className="text-white w-8 h-8" />
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Welcome back
          </h2>
          <p className="text-gray-500 mt-3 font-medium">
            Step into your digital library
          </p>
        </div>

        <div className="space-y-6">
          <div className="relative group">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
              <input
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-200"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="relative group">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
              <input
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-200"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-100 animate-shake">
              <p className="text-sm text-red-600 text-center font-semibold italic">
                {error}
              </p>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full group relative flex items-center justify-center bg-gray-900 hover:bg-black text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In{" "}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-500 font-medium">
            New here?{" "}
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="text-blue-600 font-bold hover:text-blue-800 transition-colors underline-offset-4 hover:underline"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
