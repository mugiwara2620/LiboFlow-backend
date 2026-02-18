import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ auth, children }) => {
  if (!auth.isAdmin) return <Navigate to={"/acces-denied"} />;
  return children;
};

export default AdminRoute;
