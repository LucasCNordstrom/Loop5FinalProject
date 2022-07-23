import "./App.css";
import { Routes, Route } from "react-router-dom";
import {useState} from "react";
import UserPage from "./components/UserPage";
import ItemList from "./components/ItemList";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AddItem from "./components/AddItem";
import ProductInfo from "./components/ProductInfo";
import MiniGame from "./components/Minigame";

function App() {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    fetch(`https://loop5finalproject.azurewebsites.net/items/user/${user.uid}`)
    .then(response => response.json())
    .then(data => setItems(data.map(i => ({...i , name: capitalizeFirstLetter(i.name)}))))
    .then(() => setLoading(false))
    .catch((err) => console.log(err));
  };


  return (
      <UserAuthContextProvider>
        <div> <img className="logo-img" src="https://i.imgur.com/skhQcVC.png" /> </div>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="home" element={<Home />} />
            <Route path="user" element={<UserPage />} />
            <Route path="items" element={<ItemList items={items} loading={loading} />} />
            <Route path="items/add" element={<AddItem />} />
            <Route path="items/:id" element={<ProductInfo />} /> 
            <Route path="minigame" element={<MiniGame />} />
          </Route>
          <Route path="*" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserAuthContextProvider>
  );
}
export default App;
