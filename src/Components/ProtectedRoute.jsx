// src/Components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    // Logged in but wrong role
    return <Navigate to="/" />;
  }

  return children;
}
