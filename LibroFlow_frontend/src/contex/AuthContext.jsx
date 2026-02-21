import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 important

  const handleLogin = (jwt) => {
    const decoded = jwtDecode(jwt);

    setToken(jwt);
    setUser(decoded);
    console.log(decoded);
    localStorage.setItem("token", jwt);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      handleLogin(storedToken);
    }

    setLoading(false); // 👈 auth check finished
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;
  const isAdmin = user == null ? null : user?.role === "ADMIN";

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        isAdmin,
        handleLogin,
        logout,
        loading, // 👈 expose loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
