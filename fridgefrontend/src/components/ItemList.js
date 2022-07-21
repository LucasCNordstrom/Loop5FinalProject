import '../CSS/ItemList.css';
import { useState, useEffect } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { SiAddthis } from 'react-icons/si';
import { Link } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import {requestOptionDel} from '../helperFunctions/helpers.js';


function sortFunction(a,b){  
  var dateA = new Date(a.expiryDate).getTime();
  var dateB = new Date(b.expiryDate).getTime();
  return dateA > dateB ? 1 : -1;  
}; 

const ItemList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] =useState('');
  const { user } = useUserAuth();
  const today = Date.parse(new Date());

  const itemDetails = (id) => {
    setItems(items.map((item) => item.uniqueId === id ? {...item, clicked: !item.clicked} : item));
  }

  const fetchData = () => {
    setLoading(true);
    fetch(`https://localhost:7106/items/user/${user.uid}`)
    .then(response => response.json())
    .then(data => setItems(data.sort(sortFunction)))
    .catch((err) => console.log(err));
    setLoading(false);
  };

  const onSubmit = async (id) => {
    const requestDel = requestOptionDel(id);
    try {
      await fetch(`https://localhost:7106/Items/Delete`, requestDel)
    } catch (error) {
      console.log(error);
  }
  fetchData();
}

    useEffect(() => {fetchData()}, [user]);
  

  const ItemRender = (
    <div>
      <p> Items in the fridge: {items.length} </p>
      <input type="text" maxength="25" placeholder='Search...' onChange={e => {setSearch(e.target.value)}} />
      <div className="tools">
      <Link to = "/items/add"> <SiAddthis /> </Link>
      </div>
      <ul>
      {items.filter((value) => { 
        if(search === "") {return value}
        else if(value.name.toLowerCase().includes(search.toLowerCase())) {return value}
      }).map((item)=> (
        <li className='ItemList--list' onClick={() => {itemDetails(item.uniqueId)}} key={item.uniqueId}> 
        <div className='ItemList--list__components'>
          <div> {item.name} </div>
          <div> {item.expiryDate.split('T')[0]} </div>
          <div> Countdown: {Math.ceil((Date.parse(item.expiryDate) - today) / (1000 * 60 * 60 * 24))} </div>
          < RiDeleteBin5Fill className='deleteIcon' onClick={() => onSubmit(item.uniqueId)}/>
        </div>
          { item.clicked && 
            <div className="itemList__detail">
              <div>{item.amount} {item.measurement}</div>
              <div> {item.location} </div>
              <button onClick={() => {
                navigate(`/items/${item.uniqueId}`);
              }}> DETAILS </button>
            </div>
          }
        </li>))}
      </ul> 
    </div>
  )
  
  return (
    <div className='ItemList'>
      { loading ? < BounceLoader className='loader' size={150} color="#8aff99"/> : ItemRender }
    </div> 
  )
}

export default ItemList;
