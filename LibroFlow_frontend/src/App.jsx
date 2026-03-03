import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./page/auth/LoginPage";
import SignupPage from "./page/auth/SignUpPage";
import Dashboard from "./components/Dashboard";
import AddBook from "./components/AddBook";
import "./App.css";
import HomePage from "./page/home/HomePage";
import BookCatalog from "./components/BookCatalog";
import PrivateRoute from "./route-compenents/private-route";
import AdminRoute from "./route-compenents/admin-route";
import AccessDenied from "./page/admin/AccesDenied";
import ProfilePage from "./page/profile/Profile";
import { AuthProvider } from "./contex/AuthContext";
import UsersList from "./page/user/UsersList";
import BookDetails from "./page/book-details/BookDetails";
import ChatRoom from "./page/chat/ChatRoom";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            {/* Public pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/acces-denied" element={<AccessDenied />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/chatRoom/:usernameBook" element={<ChatRoom />} />

            <Route path="/book/:id" element={<BookDetails />} />

            <Route element={<AdminRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/users" element={<UsersList />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path="/book-catalog" element={<BookCatalog />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
