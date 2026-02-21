import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react"; // Optional: npm install lucide-react
import { useAuth } from "../../contex/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const passwordRef = useRef(null);

  const h = async () => {
    setLoading(true);
    setError("");
    try {
      if (!email || !password) {
        setError("Please enter both email and password.");
        setLoading(false);
        return;
      }
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/signin",
        { email, password },
      );

      handleLogin(response.data.data.jwt);

      axios.create({
        headers: {
          Authorization: `Bearer ${response.data.data.jwt}`,
        },
      });
      await navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // const handleLogin = async () => {
  //   setLoading(true);
  //   setError("");
  //   try {
  //     if (!email || !password) {
  //       setError("Please enter both email and password.");
  //       setLoading(false);
  //       return;
  //     }
  //     console.log(JSON.parse(localStorage.getItem("auth")));
  //     const response = await axios.post(
  //       "http://localhost:8080/api/v1/auth/signin",
  //       { email, password },
  //     );
  //     // localStorage.setItem("role", response.data.data.role);
  //     // const role = localStorage.getItem("role");
  //     // localStorage.setItem("auth", JSON.stringify(authF(role)));
  //     // localStorage.setItem("token", response.data.data.jwt);
  //     handleLogin()
  //     // login(response.data.data.jwt);
  //     axios.create({
  //       headers: {
  //         Authorization: `Bearer ${response.data.data.jwt}`,
  //       },
  //     });
  //     await navigate("/");
  //   } catch (err) {
  //     setError("Invalid email or password. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-10 transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg mb-4">
            <Lock className="text-white w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Welcome back
          </h2>

          <p className="text-gray-500 mt-3 font-medium">
            Step into your digital library
          </p>
        </div>

        <div className="space-y-6">
          {/* Email */}
          <div className="relative group">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">
              Email
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
              <input
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-200"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative group">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">
              Password
            </label>

            <div className="relative group">
              {/* Left Icon */}
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-200 group-focus-within:text-indigo-600" />

              {/* Input */}
              <input
                ref={passwordRef}
                className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl
               focus:bg-white focus:ring-4 focus:ring-indigo-500/10
               focus:border-indigo-500 outline-none
               transition-all duration-300 ease-in-out"
                type={isShowingPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Eye Toggle */}
              <button
                type="button"
                onClick={() => {
                  const input = passwordRef.current;

                  if (input) {
                    const cursorPosition = input.selectionStart; // save cursor
                    const valueLength = input.value.length;

                    setIsShowingPassword((prev) => !prev);

                    // Wait for re-render before restoring cursor
                    setTimeout(() => {
                      input.focus();
                      input.setSelectionRange(valueLength, valueLength);
                    }, 0);
                  }
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 
             text-gray-400 hover:text-indigo-600 
             transition-all duration-200 
             active:scale-90 transform"
              >
                {isShowingPassword ? (
                  <Eye className="w-5 h-5 transition-transform duration-200" />
                ) : (
                  <EyeOff className="w-5 h-5 transition-transform duration-200" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200">
              <p className="text-sm text-red-600 text-center font-semibold">
                {error}
              </p>
            </div>
          )}

          {/* Button */}
          <button
            onClick={h}
            disabled={loading}
            className="w-full group relative flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:scale-[1.01] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-500 font-medium">
            New here?{" "}
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
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
