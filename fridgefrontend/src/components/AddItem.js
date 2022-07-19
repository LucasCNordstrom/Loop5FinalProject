import '../CSS/AddItem.css';
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { UserAuthContextProvider } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState } from 'react';

function AddItem() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('Kg')
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title || !date || !amount) {
      setError(true);
      return;
    }

    if (e.key === "Enter") {
      document.getElementById("btnAddTodo").click(); 
    }

    navigate('/home/items');
  }

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
        <input type="submit" id="btnAddTodo"/>
      </form>
    </div>
  );
}

export default AddItem;
