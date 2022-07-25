import '../CSS/ItemList.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import BounceLoader from "react-spinners/BounceLoader";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import {requestOptionDel} from '../helperFunctions/helpers.js';
import { motion, AnimatePresence } from "framer-motion"
import ItemListDetails from './subcomponents/ItemListDetails';
import StorageSelector from './subcomponents/StorageSelector';
import OrderDropDown from './subcomponents/OrderDropDown';
import ItemListXXX from './subcomponents/ItemListXXX';


const ItemList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] =useState('');
  const [orderBy, setOrderBy] =useState('expirationDate');
  const [displayBy, setDisplayBy] = useState('');
  const { user } = useUserAuth();

  //Sort the order in which data is displayed
  function sortFunction(a,b){  
    var dateA = new Date(a.expiryDate).getTime();
    var dateB = new Date(b.expiryDate).getTime();
    if (orderBy === 'expirationDate') {
      return dateA > dateB ? 1 : -1;
    }
    if (orderBy === 'expirationDateRev') {
      return dateA < dateB ? 1 : -1;
    }
    if (orderBy === 'alphabetical') {
      return a.name > b.name ? 1 : -1;
    }
    if (orderBy === 'alphabeticalRev') {
      return a.name < b.name ? 1 : -1;
    }
    if (orderBy === 'quantity') {
      return a.amount > b.amount ? 1 : -1;
    }
    if (orderBy === 'quantityRev') {
      return a.amount < b.amount ? 1 : -1;
    }
  }; 
  
  const itemDetails = (id) => {
    setItems(items.map((item) => item.uniqueId === id ? {...item, clicked: !item.clicked} : item));
  }

  const fetchData = () => {
    fetch(`https://loop5finalproject.azurewebsites.net/items/user/${user.uid}`)
    .then(response => response.json())
    .then(data => setItems(data.sort(sortFunction)))
    .then(() => setLoading(false))
    .catch((err) => console.log(err));
  };

  //Delete request for data
  const onDelete = async (id, item) => {
    if (window.confirm(`Are you sure you want to delete ${item.name} ?`)) {
    const requestDel = requestOptionDel(id);
    try {
      await fetch(`https://loop5finalproject.azurewebsites.net/Items/Delete`, requestDel)
      } catch (error) {
        console.log(error);
      }
      fetchData();
    }
  }
  //Calculate time left on expiration date in days
  const handleChange = e => {
    e.persist();
    setDisplayBy(e.target.value)
  }

  useEffect(() => {
    if (user) {
    fetchData()}},
    [user, orderBy, displayBy]);


  const ItemRender = (
    <>
      <p> Items in stock: {items.length} </p>

      <input className="item-search" type="text" maxength="25" placeholder='Search...' onChange={e => {setSearch(e.target.value)}} /> <br/>
      <Link to = "/items/add"> <img className="add-icon" alt="Add-icon" src='https://cdn-icons-png.flaticon.com/512/1828/1828919.png' /> </Link>

      <OrderDropDown orderBy={orderBy} setOrderBy={setOrderBy} />

      <StorageSelector displayBy={displayBy} handleChange={handleChange}/>

      <ItemListXXX items={items} search={search} displayBy={displayBy} onDelete={onDelete} itemDetails={itemDetails}/>

    </>
  )
  return (
    <div className='item-list'>
      { loading ? < BounceLoader className='loader' size={150} color="#b1e2ff"/> : ItemRender }
    </div> 
  )
}

export default ItemList;