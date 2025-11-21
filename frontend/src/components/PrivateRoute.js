// components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />; // not logged in
  if (adminOnly && !user.isAdmin) return <Navigate to="/" />; // not admin

  return children;
};

export default PrivateRoute;
