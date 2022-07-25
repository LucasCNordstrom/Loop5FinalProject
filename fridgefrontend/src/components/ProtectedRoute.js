import React, { useEffect } from "react";
import "../CSS/ProtectedRoute.css";
import { useNavigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import NavBar from "./NavBar";


const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { user } = useUserAuth();

  useEffect(() => { 
    if (!user) {
      navigate("/");
    }
    }, [navigate, user]);

  return ( 
    <>
      <NavBar />
      <Outlet />
    </>
  )
};

export default ProtectedRoute;
