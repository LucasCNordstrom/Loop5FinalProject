import '../CSS/EditItem.css';
import { useUserAuth } from "../context/UserAuthContext";
import { useState } from 'react';
import {formatDate} from '../helperFunctions/helpers';
import { useNavigate } from "react-router-dom";


function AddItem({item, onChange}) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('')
  const [storage, setStorage] = useState('');
  const { user } = useUserAuth();
  const today = formatDate(new Date);

  const limitValue = (e) => {
    const value = e.target.value;
    if(value.length > 3) {return };
    setAmount(value);
  }

  const onSubmit = async (e) => {
    const requestPut = {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: title,
        ExpiryDate: date,
        Amount: amount,
        Unit: unit,
        Location: storage,
        UserId: user.uid,
        UniqueId: item.uniqueId,
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
        await fetch(`https://localhost:7106/Items/edit`, requestPut)
      } catch (error) {
        console.log(error);
      }
    onChange();
  }

  return (
    <div>
      <h1> Edit item:</h1>
      {error && <h4> Please do not leave fields empty!</h4>}
      <form id="addItem" onSubmit={onSubmit}>
        <div>
          <label> Item name: </label>
          <input type="text" value={title} maxLength="25" placeholder={item.name} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div>
          <label> Expiration date: </label>
          <input type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          Storage:
            <label> 
              <input type="radio" value='Fridge' name='storage'  onChange={(e) => setStorage(e.target.value)} checked/>
              Fridge  </label>
            <label> 
              <input type="radio" value='Freezer' name='storage' onChange={(e) => setStorage(e.target.value)} />
              Freezer  </label>
              <label> 
              <input type="radio" value='Pantry' name='storage' onChange={(e) => setStorage(e.target.value)} />
              Pantry  </label>
              {console.log(storage)}
        </div>
        <div>
          <label> Quantity: </label>
          <input type="number" min="0" value={amount} placeholder={item.amount} onChange={limitValue}/>
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="Kg">Kg</option>
            <option value="Liter">Liter</option>
            <option value="Pieces">Pieces</option>
        </select>
        </div>
        <input type="submit" id="btnSubmit"/>
        <button onClick={() => onChange()}> Cancel </button>
      </form>
    </div>
  );
}
export default AddItem;