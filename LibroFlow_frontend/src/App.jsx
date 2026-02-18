import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./page/auth/LoginPage";
import SignupPage from "./page/auth/SignUpPage";
import Dashboard from "./components/Dashboard";
import AddBook from "./components/AddBook";
import "./App.css";
import BookCatalog from "./components/BookCatalog";
import HomePage from "./page/admin/HomePage";
import PrivateRoute from "./route-compenents/private-route";
import AdminRoute from "./route-compenents/admin-route";
import AccessDenied from "./page/admin/AccesDenied";
import ProfilePage from "./page/profile/Profile";
function App() {
  const auth = JSON.parse(localStorage.getItem("auth")) || {
    isUser: false,
    isAdmin: false,
  };
  // console.log(auth);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/acces-denied" element={<AccessDenied />} />
          <Route
            path="/dashboard"
            element={<AdminRoute auth={auth} children={<Dashboard />} />}
          />
          <Route
            path="/add-book"
            element={<AdminRoute auth={auth} children={<AddBook />} />}
          />
          <Route
            path="/book-catalog"
            element={<PrivateRoute auth={auth} children={<BookCatalog />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute auth={auth} children={<ProfilePage />} />}
          />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
