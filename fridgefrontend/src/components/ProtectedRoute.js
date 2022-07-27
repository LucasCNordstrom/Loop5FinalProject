import React, { useEffect } from "react";
import "../CSS/ProtectedRoute.css";
import { useNavigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import NavBar from "./NavBar";
import BounceLoader from "react-spinners/BounceLoader";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { user } = useUserAuth();

  if (!user) {
    navigate("/login")
  return ( <BounceLoader className="loader" size={150} color="white" /> ) 
};

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
