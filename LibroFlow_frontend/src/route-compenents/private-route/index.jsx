import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ auth, children }) => {
  if (!auth.isUser) return <Navigate to={"/login"} />;
  return children;
};

export default PrivateRoute;
