import '../CSS/AddItem.css';
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import {formatDate} from '../helperFunctions/helpers';
import { Form } from "react-bootstrap";

function AddItem() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('Kg')
  const [storage, setStorage] = useState('');
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const today = formatDate(new Date);

  const limitValue = (e) => {
    const value = e.target.value;
    if(value.length > 3) {return };
    setAmount(value);
  }

  const onSubmit = async (e) => {
    const requestOptions = {
      method : 'POST', 
      headers: {
        Accept: '*/*', 
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        Name: title,
        ExpiryDate: date,
        Amount: amount,
        Unit: unit,
        Location: storage,
        UserId: user.uid,
        UniqueId: 'something'
      })
  };
    e.preventDefault();

    if (!title || !date || !amount) {
      setError(true);
      return;
    }

    if (e.key === "Enter") {
      document.getElementById("btnSubmit").click(); 
    }
    try {
      await fetch(`https://loop5finalproject.azurewebsites.net/Items`, requestOptions)
    } catch (error) {
      console.log(error);
    }

    navigate('/items');
  }

  return (
    <div className='add'>
      <h1> Add new Item:</h1>
      {error && <h4> Please do not leave fields empty!</h4>}
      <form id="addItem" onSubmit={onSubmit}>
        <div>
          <label> Item name: </label>
          <input type="text" value={title} maxLength="25" onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div>
          <label> Expiration date: </label>
          <input type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          Storage:
            <label> 
              <input className="storage-input" type="radio" value='Fridge' name='storage'  onChange={(e) => setStorage(e.target.value)} checked/>
              <img src='https://cdn-icons-png.flaticon.com/512/483/483850.png' className='sel-icon fridge-icon'/>
            </label>
            <label> 
              <input className="storage-input" type="radio" value='Freezer' name='storage' onChange={(e) => setStorage(e.target.value)} />
              <img src='https://cdn-icons-png.flaticon.com/512/445/445903.png' className='sel-icon freezer-icon' />  
            </label>
              <label> 
              <input className="storage-input" type="radio" value='Pantry' name='storage' onChange={(e) => setStorage(e.target.value)} />
              <img src='https://cdn-icons-png.flaticon.com/512/6785/6785540.png' className='sel-icon pantry-icon' />   
            </label>
        </div>
        <div>
          <label> Quantity: </label>
          <input type="number" min="0" value={amount} onChange={limitValue}/>
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="Kg">Kg</option>
            <option value="Liter">Liter</option>
            <option value="Liter">Pieces</option>
        </select>
        </div>
        <input type="submit" id="btnSubmit"/>
      </form>
    </div>
  );
}

export default AddItem;
