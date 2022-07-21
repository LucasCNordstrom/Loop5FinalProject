import '../CSS/AddItem.css';
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import {formatDate} from '../helperFunctions/helpers';

function AddItem() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('Kg')
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
      await fetch(`https://localhost:7106/Items`, requestOptions)
    } catch (error) {
      console.log(error);
      
    }
    navigate('/items');
  }
  return (
    <div>
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
