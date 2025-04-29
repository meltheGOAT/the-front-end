// src/components/Logout.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Perform the logout
    logout();
    navigate("/login"); // Redirect to the login page
  }, [logout, navigate]);

  return null; // This component doesn't render anything
};

export default Logout;
