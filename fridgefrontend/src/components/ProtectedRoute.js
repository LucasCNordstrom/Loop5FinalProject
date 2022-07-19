import React from "react";
import "../CSS/ProtectedRoute.css";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import ItemList from "./ItemList";
import UserPage from "./UserPage";
import NavBar from "./NavBar";
import { Routes, Route } from "react-router-dom";
import AddItem from "./AddItem";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="App">
        <div className="App-Logo"> LOGO </div>
        <NavBar />
        <Routes>
            <Route path="/items" element={<ItemList />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/add" element={<AddItem />} />
            <Route path="/items/" element={<UserPage />} />

        </Routes>
    </div>
  )
};

export default ProtectedRoute;