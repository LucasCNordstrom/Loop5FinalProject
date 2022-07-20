import React from "react";
import "../CSS/ProtectedRoute.css";
import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import ItemList from "./ItemList";
import UserPage from "./UserPage";
import NavBar from "./NavBar";
import { Routes, Route } from "react-router-dom";
import AddItem from "./AddItem";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  return (
    user ? <div><NavBar /> <Outlet/> </div> : <Navigate to="/"/>
  )
};

export default ProtectedRoute;