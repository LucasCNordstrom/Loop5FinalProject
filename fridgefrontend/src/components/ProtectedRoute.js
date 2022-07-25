import React, { useEffect, useComponentWillMount } from "react";
import "../CSS/ProtectedRoute.css";
import { useNavigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import NavBar from "./NavBar";


const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { user } = useUserAuth();

    console.log("this is user: ")
    console.log(user);

  useEffect(() => { 
    console.log("this is user: ")
    console.log(user);
    if (!user) {
      console.log("no user here bois!")
      navigate("/");
    }
    }, []);

  return ( 
    <>
      <NavBar />
      <Outlet />
    </>
  )
};

export default ProtectedRoute;
