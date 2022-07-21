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
      <p> Items in stock: {items.length} </p>
      <input type="text" maxength="25" placeholder='Search...' onChange={e => {setSearch(e.target.value)}} />
      <div className='add-icon-padding'>
        <Link to = "/items/add"> <img className="add-icon" src='https://cdn-icons.flaticon.com/png/512/3032/premium/3032220.png?token=exp=1658414735~hmac=ba35ed9683a842b44cf9b95f0ffa9533' /> </Link>
      </div>
      <ul className='item-ul'>
      {items.filter((value) => { 
        if(search === "") {return value}
        else if(value.name.toLowerCase().includes(search.toLowerCase())) {return value}
      }).map((item)=> (
        <li  className='item-li' onClick={() => {itemDetails(item.uniqueId)}} key={item.uniqueId}> 
          <div> {item.name} </div>
          <div> {item.expiryDate.split('T')[0]} </div>
          <div> {Math.ceil((Date.parse(item.expiryDate) - today) / (1000 * 60 * 60 * 24))} days left </div>
          < img src='https://cdn-icons-png.flaticon.com/512/484/484611.png' className='deleteIcon' onClick={() => onSubmit(item.uniqueId)}/>
          { item.clicked && 
            <div >
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
    <div className='item-list'>
      { loading ? < BounceLoader className='loader' size={150} color="#8aff99"/> : ItemRender }
    </div> 
  )
}

export default ItemList;
