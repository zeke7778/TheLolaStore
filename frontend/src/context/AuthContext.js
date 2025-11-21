import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchUserProfile } from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Initialize user from localStorage
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const u = await fetchUserProfile(token);
          setUser(u);
        } catch (err) {
          console.error("Token invalid:", err);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
    };
    init();
  }, []);

  // Login helper
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  // Logout helper
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
