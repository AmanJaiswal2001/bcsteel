// src/components/AdminProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/adminlogin" replace />;
};

export default AdminProtectedRoute;
