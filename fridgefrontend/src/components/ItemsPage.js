import '../CSS/ItemList.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import { useUserAuth } from "../context/UserAuthContext";
import {requestOptionDel} from '../helperFunctions/helpers.js';
import StorageSelector from './subcomponents/StorageSelector';
import OrderDropDown from './subcomponents/OrderDropDown';
import ItemList from './subcomponents/ItemList';

const localItems = () =>  { 
  let something = localStorage.getItem("items");
  if(something) return JSON.parse(something);
  else return [];
} 

const localFetch = () =>  { 
  let shouldFetch = JSON.parse(localStorage.getItem("should fetch"));
  if(shouldFetch === null) return true;
  return shouldFetch;
} 

const ItemsPage = () => {

  //let shouldFetchRef = useRef(localFetch());
  const [fetching, setShouldFetch] = useState(localFetch());
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

  const fetchData = async () => {
    console.log(fetching);
    let ex = null;
    if (fetching){
       await fetch(`https://loop5finalproject.azurewebsites.net/items/user/${user.uid}`)
      .then(response => response.json())
      .then(data => {
        ex = data.sort(sortFunction);
        console.log(ex);
        setItems(ex);
      })
      .then(() => setLoading(false))
      .then(() => {
        localStorage.setItem("items", JSON.stringify(ex))
        setShouldFetch(false);
        localStorage.setItem("should fetch", false);
    })
      .catch((err) => console.log(err));
    }
    else {
      console.log("trying from localstorage")
      console.log(localItems());
      setItems(localItems().sort(sortFunction));
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log(items);
  //   localStorage.setItem("items", JSON.stringify(items))
  // }, [items])

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
      fetchData()
    }}, [user, orderBy, displayBy, fetching]);


  const ItemRender = (
    <>
      <p> Items in stock: {items.length} </p>

      <input className="item-search" type="text" maxength="25" placeholder='Search...' onChange={e => {setSearch(e.target.value)}} /> <br/>
      <Link to = "/items/add"> <img className="add-icon" alt="Add-icon" src='https://cdn-icons-png.flaticon.com/512/1828/1828919.png' /> </Link>

      <OrderDropDown orderBy={orderBy} setOrderBy={setOrderBy} />

      <StorageSelector displayBy={displayBy} handleChange={handleChange}/>

      <ItemList items={items} search={search} displayBy={displayBy} onDelete={onDelete} itemDetails={itemDetails}/>

    </>
  )
  return (
    <div className='item-list'>
      { loading ? < BounceLoader className='loader' size={150} color="white"/> : ItemRender }
    </div> 
  )
}

export default ItemsPage;