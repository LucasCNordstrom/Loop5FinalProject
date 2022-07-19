import '../CSS/ItemList.css';
import { useState, useEffect } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { SiAddthis } from 'react-icons/si';
import { Link } from "react-router-dom";

function sortFunction(a,b){  
  var dateA = new Date(a.expiryDate).getTime();
  var dateB = new Date(b.expiryDate).getTime();
  return dateA > dateB ? 1 : -1;  
}; 

const ItemList = () => {
  const [items, setItems] = useState([]);
  let link = '';

  const itemDetails = (name) => {
    setItems(items.map((item) => item.name === name ? {...item, clicked: !item.clicked} : item));
    console.log();
  }

  const fetchData = () => {
    fetch(`https://loop5finalproject.azurewebsites.net/items`)
    .then(response => response.json())
    .then(data => setItems(data.sort(sortFunction)))
  };

  useEffect(() => {fetchData()}, []);

  console.log(items);
  
  return (
    <div className='ItemList'>
      Items in the fridge: {items.length}
      <div className="tools">
      <Link to = "/home/add"> <SiAddthis /> </Link>
        </div>
      <ul>
      {items.map((item)=> (
        <li className='ItemList--list' onClick={() => {itemDetails(item.name)}} key={item.name}> 
        <div className='ItemList--list__components'>
          <div> {item.name} </div>
          <div> {item.expiryDate} </div>
          < RiDeleteBin5Fill className='deleteIcon'/>
        </div>
          { item.clicked && 
            <div className="itemList__detail">
              <div>{item.amount} {item.measurement}</div>
              <div><Link to = {`${item.name}` }> EDIT </Link></div>
            </div>
          }
        </li>))}
        </ul>
    </div>
  )
}

export default ItemList;
