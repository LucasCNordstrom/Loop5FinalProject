import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import UserPage from "./components/UserPage";
import ItemsPage from "./components/ItemsPage";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { UserAuthContextProvider, useUserAuth } from "./context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AddItem from "./components/AddItem";
import ProductInfo from "./components/ProductInfo";
import MiniGame from "./components/Minigame";
import CloudsBg from "./components/subcomponents/CloudsBg";


function App() {

  return (
      <UserAuthContextProvider>
        <CloudsBg />
        <img className="logo-img" src="https://i.imgur.com/skhQcVC.png" />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="home" element={<Home />} />
            <Route path="user" element={<UserPage />} />
            <Route path="items" element={<ItemsPage/>} />
            <Route path="items/add" element={<AddItem />} />
            <Route path="items/:id" element={<ProductInfo />} /> 
            {/* <Route path="minigame" element={<MiniGame/>} /> */}
          </Route>
          <Route path="*" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserAuthContextProvider>
  );
}
export default App;
