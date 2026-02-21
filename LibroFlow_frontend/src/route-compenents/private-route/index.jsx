import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contex/AuthContext";

// const PrivateRoute = ({ auth, children }) => {
//   if (!auth.isUser) return <Navigate to={"/login"} />;
//   return children;
// };

// export default PrivateRoute;

const PrivateRoute = () => {
  const { isAdmin, loading } = useAuth();
  if (loading) return null;
  console.log(isAdmin);
  if (isAdmin == null) return <Navigate to={"/login"} />;
  return <Outlet />;
};

export default PrivateRoute;
