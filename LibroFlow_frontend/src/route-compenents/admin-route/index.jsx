import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contex/AuthContext";

const AdminRoute = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) return null; // or spinner

  if (!isAdmin) return <Navigate to="/acces-denied" replace />;

  return <Outlet />;
};

export default AdminRoute;
