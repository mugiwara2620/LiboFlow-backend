import React from "react";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <ShieldAlert size={40} />
        </div>

        <h1 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">
          Restricted Access
        </h1>

        <p className="text-gray-500 font-medium mb-8">
          Oops! You don't have the administrative permissions required to view
          this shelf.
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          <ArrowLeft size={18} />
          Back to Library
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;
