import '../CSS/AddItem.css';
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function AddItem() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('Kg')
  const { user } = useUserAuth();
  const navigate = useNavigate();

  const requestOptions = {
    method : 'POST', headers : {'Content-Type':'application/json'}, body: {userId: user.uid, name: title, expiryDate: date, amount: amount, measurement: unit}
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title || !date || !amount) {
      setError(true);
      return;
    }

    if (e.key === "Enter") {
      document.getElementById("btnSubmit").click(); 
    }

    await fetch('http://localhost:7106/items', requestOptions);

    navigate('/items');
  }

  console.log(typeof date);

  return (
    <div>
      <h1> Add new Item:</h1>
      {error && <h4> Please do not leave fields empty!</h4>}
      <form id="addItem" onSubmit={onSubmit}>
        <div>
          <label> Item name: </label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div>
          <label> Expiration date: </label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label> Quantity: </label>
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)}/>
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="Kg">Kg</option>
            <option value="Liter">Liter</option>
        </select>
        </div>
        <input type="submit" id="btnSubmit"/>
      </form>
    </div>
  );
}

export default AddItem;
