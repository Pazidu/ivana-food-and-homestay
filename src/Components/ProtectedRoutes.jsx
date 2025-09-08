import React from "react";
import { Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const isLoggedIn = window.localStorage.getItem("token");
  return isLoggedIn === "true" ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
