import './ItemList.css';
import { useState, useEffect } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { SiAddthis } from 'react-icons/si';
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { UserAuthContextProvider } from "../context/UserAuthContext";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const itemDetails = (id) => {
    setItems(items.map((item) => item.id === id ? {...item, clicked: !item.clicked} : item));
    console.log();
  }

  const fetchData = () => {
    fetch(`https://loop5finalproject.azurewebsites.net/items`)
    .then(response => response.json())
    .then(data => setItems(data))
  };

  useEffect(() => {fetchData()}, []);

  console.log(items);
  
  return (
    <div className='ItemList'>
      Items in the fridge: {items.length}
      <div className="tools">
          <SiAddthis />
        </div>
      <ul>
      {items.map((item)=> (
        <li className='ItemList--list' onClick={() => {itemDetails(item.id)}} key={item.id}> 
        <div className='ItemList--list__components'>
          <div> {item.name} </div>
          <div> {item.expiryDate} </div>
          < RiDeleteBin5Fill className='deleteIcon'/>
        </div>
          { item.clicked && 
            <div className="itemList__detail">
              <div>{item.amount} {item.measurement}</div>
            </div>
          }
        </li>))}
        </ul>
        <Button onClick={handleLogout}>
          Log out
        </Button>
    </div>
  )
}

export default ItemList;
