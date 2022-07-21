import React from "react";

import "../CSS/ProtectedRoute.css";
import { useNavigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import NavBar from "./NavBar";


const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useUserAuth();


  return user.email ? (
    <div>
      <NavBar /> 
      <Outlet />
    </div>
  ) : (
    navigate("/")
  );
};

export default ProtectedRoute;
