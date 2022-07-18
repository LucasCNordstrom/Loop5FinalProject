import "./App.css";
import { Routes, Route, Router } from "react-router-dom";
import { useState } from 'react';
import initializeAuth from "./context/firebase-init";
import NavBar from "./components/NavBar";
import UserPage from "./components/UserPage";
import ItemList from "./components/ItemList";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

initializeAuth();
const provider = new GoogleAuthProvider();

const handleGoogoeSignIn = () => {
  const auth = getAuth();

  signInWithPopup(auth, provider).then((result) => {
    const user = result.user;
    console.log(user);
  });
};


function App() {

  return (
      <div className="App">
        <div>
          <button onClick={handleGoogoeSignIn}> LET ME IN </button>
        </div>
        <div className="App-Logo"> LOGO </div>
        <NavBar />
        <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/user" element={<UserPage />} />
        </Routes>
      </div>
    );
  }
export default App;
