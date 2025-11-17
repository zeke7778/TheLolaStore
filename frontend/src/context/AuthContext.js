import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchUserProfile } from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const u = await fetchUserProfile(token);
          setUser(u);
        } catch (err) {
          localStorage.removeItem("token");
          setUser(null);
        }
      }
    };
    init();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
