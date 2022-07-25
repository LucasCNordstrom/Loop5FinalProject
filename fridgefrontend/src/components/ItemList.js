import '../CSS/ItemList.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import BounceLoader from "react-spinners/BounceLoader";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import {requestOptionDel} from '../helperFunctions/helpers.js';
import { motion, AnimatePresence } from "framer-motion"


const ItemList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] =useState('');
  const [orderBy, setOrderBy] =useState('expirationDate');
  const [displayBy, setDisplayBy] = useState('');
  const { user } = useUserAuth();
  const today = Date.parse(new Date());
  let countdown = 0;

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
  const calcCountdown = (exp) => {
    return Math.ceil((Date.parse(exp) - today) / (1000 * 60 * 60 * 24))
  }

  const handleChange = e => {
    e.persist();
    setDisplayBy(e.target.value)
  }

  useEffect(() => {fetchData()}, [orderBy, displayBy]);

  //assign color of items dependant on expirydate
  const assignColor = (exp) =>  {
    countdown = calcCountdown(exp);
    if (countdown <= 0) {return "black-color"}
    if (countdown < 4) { return "red-color"}
    if (countdown < 7) { return "orange-color"}
    if (countdown < 10) {return "yellow-color"}
    {return "green-color"}
  }

  const ItemRender = (
    <>
      <p> Items in stock: {items.length} </p>

      <input className="item-search" type="text" maxength="25" placeholder='Search...' onChange={e => {setSearch(e.target.value)}} /> <br/>
      <Link to = "/items/add"> <img className="add-icon" alt="Add-icon" src='https://cdn-icons.flaticon.com/png/512/3032/premium/3032220.png?token=exp=1658414735~hmac=ba35ed9683a842b44cf9b95f0ffa9533' /> </Link>

      <Form.Group> 
          <Form.Select className="order-by" value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
            <option value="expirationDate">Expiration Date</option>
            <option value="expirationDateRev">Expiration Date Descending</option>
            <option value="alphabetical">Alphabetically</option>
            <option value="alphabeticalRev">Alphabetically Descending</option>
            <option value="quantity">Amount</option>
            <option value="quantityRev">Amount Descending</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="sort-by">
        <input type="radio" name="storage" value="" className="displayBy"
              onChange={handleChange} checked={displayBy === ""}/>
        <label htmlFor="fridge">All</label>
        <input type="radio" name="storage" value="Fridge" className="displayBy"
              onChange={handleChange} checked={displayBy === "Fridge"}/>
        <label htmlFor="fridge">Frige</label>
        <input type="radio" name="storage" value="Freezer" className="displayBy"
              onChange={handleChange} checked={displayBy === "Freezer"}/>
        <label htmlFor="freezer">Freezer</label>
        <input type="radio" name="storage" value="Pantry" className="displayBy"
              onChange={handleChange} checked={displayBy === "Pantry"}/>
        <label htmlFor="pantry">Pantry</label>
      </Form.Group>

      <ul className='item-ul'>
      <AnimatePresence>
      {items
      .filter((value) => {
        if (displayBy === "") {return value}
        else if(value.location.includes(displayBy)) {return value}
      })
      .filter((value) => {
        if(search === "") {return value}
        else if(value.name.toLowerCase().includes(search.toLowerCase())) {return value}
      }).map((item)=> (
        <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: 700 }} className={assignColor(item.expiryDate)} key={item.uniqueId}>
          <span className='item-li' onClick={() => {itemDetails(item.uniqueId)}}>
            <h5> {item.name} </h5>
            <h5> {calcCountdown(item.expiryDate)} days left </h5>
            <motion.img  whileHover={{ scale: 1.5}} alt="Delete icon" src='https://cdn-icons-png.flaticon.com/512/484/484611.png' className='deleteIcon' onClick={() => onDelete(item.uniqueId, item)}/>
          </span>

          <AnimatePresence>
          { item.clicked && 
          <motion.span initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} className='item-details'>
            <p> Expiration date: {item.expiryDate.split('T')[0]} </p>
            <p>Quantity: {item.amount} {item.measurement}</p>
            <p> Stored in: {item.location} </p>
            <Button onClick={() => {
              navigate(`/items/${item.uniqueId}`);
            }}> DETAILS </Button>
          </motion.span>
          }
          </AnimatePresence>

        </motion.li>))}
        </AnimatePresence>
      </ul> 
    </>
  )
  
  return (
    <div className='item-list'>
      { loading ? < BounceLoader className='loader' size={150} color="#b1e2ff"/> : ItemRender }
    </div> 
  )
}

export default ItemList;