import '../CSS/ItemList.css';
import { useState, useEffect } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { SiAddthis } from 'react-icons/si';
import { Link } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";


function sortFunction(a,b){  
  var dateA = new Date(a.expiryDate).getTime();
  var dateB = new Date(b.expiryDate).getTime();
  return dateA > dateB ? 1 : -1;  
}; 

const ItemList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserAuth();
  const today = new Date().toISOString().split('T')[0];

  let link = '';
  const requestOptions = {
    method : 'GET', headers : {'Content-Type':'application/json'}, body: user.uid
  };

  const itemDetails = (id) => {
    setItems(items.map((item) => item.uniqueId === id ? {...item, clicked: !item.clicked} : item));
  }

  const fetchData = () => {
    setLoading(true);
    fetch(`https://localhost:7106/items/user/${user.uid}`)
    .then(response => response.json())
    .then(data => setItems(data.sort(sortFunction)))
    setLoading(false);
  };

  useEffect(() => {fetchData()}, [items]);

  const ItemRender = (
      <ul>
      {items.map((item)=> (
        <li className='ItemList--list' onClick={() => {itemDetails(item.uniqueId)}} key={item.uniqueId}> 
        <div className='ItemList--list__components'>
          <div> {item.name} </div>
          <div> {item.expiryDate} </div>
          < RiDeleteBin5Fill className='deleteIcon'/>
        </div>
          { item.clicked && 
            <div className="itemList__detail">
              <div>{item.amount} {item.measurement}</div>
              <button onClick={() => {
                navigate(`/items/${item.uniqueId}`);
              }}> DETAILS </button>
            </div>
          }
        </li>))}
      </ul> 
  )
  
  return (
    <div>
      Items in the fridge: {items.length}
      <div className="tools">
      <Link to = "/items/add"> <SiAddthis /> </Link>
      </div>
    <div className='ItemList'>
      { loading ? < BounceLoader size={150} color="#8aff99"/> : ItemRender }
    </div> 
    </div>
  )
}

export default ItemList;
