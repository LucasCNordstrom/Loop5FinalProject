import "./App.css";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/NavBar";
import UserPage from "./components/UserPage";
import ItemList from "./components/ItemList";
import Home from "./components/Home";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AddItem from "./components/AddItem";
import ProductInfo from "./components/ProductInfo";

function App() {
  return (
    <Router>
      <UserAuthContextProvider>
        <div className="App-Logo"> LOGO </div>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="home" element={<Home />} />
            <Route path="user" element={<UserPage />} />
            <Route path="items" element={<ItemList />} />
            <Route path="items/add" element={<AddItem />} />
            <Route path="items/:id" element={<ProductInfo />} /> 
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserAuthContextProvider>
    </Router>
  );
}
export default App;
