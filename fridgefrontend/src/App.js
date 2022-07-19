import "./App.css";
import { Routes, Route, Router } from "react-router-dom";
import { useState } from 'react';
import NavBar from "./components/NavBar";
import UserPage from "./components/UserPage";
import ItemList from "./components/ItemList";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  return (
    <div>
      <UserAuthContextProvider>
            <Routes>
              <Route path="home/*" element={<ProtectedRoute />} />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </UserAuthContextProvider>
    </div>
    );
  }
export default App;
