import '../CSS/AddItem.css';
import { useUserAuth } from "../context/UserAuthContext";
import { useState } from 'react';
import {formatDate} from '../helperFunctions/helpers';
import { Form, Button } from "react-bootstrap";


function EditItem({item, onChange}) {
  const [title, setTitle] = useState(item.name);
  const [date, setDate] = useState(item.expiryDate.split('T')[0]);
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState(item.amount);
  const [unit, setUnit] = useState(item.measurement)
  const [storage, setStorage] = useState(item.location);
  const { user } = useUserAuth();
  const today = formatDate(new Date());
  const limitValue = (e) => {
    const value = e.target.value;
    if(value.length > 3) {return };
    setAmount(value);
  }

  const handleChange = e => {
    e.persist();
    setStorage(e.target.value)
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
        await fetch(`https://loop5finalproject.azurewebsites.net/Items/edit`, requestPut)
      } catch (error) {
        console.log(error);
      }
    onChange();
  }

  return (
    <div className='add'>
      <Form id="addItem" onSubmit={onSubmit}>
      <h3>Edit item:</h3>
      <p>Product name: </p>
        <Form.Group>
          <Form.Control type="text" className="input" value={title} maxLength="25" onChange={(e) => setTitle(e.target.value)}/>
        </Form.Group>

        <p>Expiration date: </p>
        <Form.Group>
          <Form.Control type="date" className="input" value={date} min={today} onChange={(e) => setDate(e.target.value)} />
        </Form.Group>
        
        <p>Storage: </p>
        <Form.Group>
        <input type="radio" name="storage" id='fridge' value="Fridge" className="storage"
              onChange={handleChange} checked={storage === "Fridge"}/>
        <label htmlFor="fridge"><img src='https://cdn-icons-png.flaticon.com/512/483/483850.png' className='sel-icon fridge-icon'/></label>
        <input type="radio" name="storage" id='freezer' value="Freezer" className="storage"
              onChange={handleChange} checked={storage === "Freezer"}/>
        <label htmlFor="freezer"><img src='https://cdn-icons-png.flaticon.com/512/445/445903.png' className='sel-icon freezer-icon'/></label>
        <input type="radio" name="storage" id='pantry' value="Pantry" className="storage"
              onChange={handleChange} checked={storage === "Pantry"}/>
        <label htmlFor="pantry"><img src='https://cdn-icons-png.flaticon.com/512/6785/6785540.png' className='sel-icon pantry-icon'/></label>
        <p> Current selection: {storage} </p>
      </Form.Group>

      <p> Amount: </p>
        <Form.Group> 
          <Form.Control className="input" type="number" min="0" value={amount} onChange={limitValue}/>

          <Form.Select className="input unit-size" value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option selected={unit === "Kg"} value="Kg" >Kg</option>
            <option selected={unit === "Liter"} value="Liter">Liter</option>
            <option selected={unit === "Pieces"} value="Pieces" >Pieces</option>
          </Form.Select>
        </Form.Group>
        
        {error && <h4> Please do not leave fields empty!</h4>}
        <Button className="page-button" onClick={() => onChange()}> Cancel </Button>
        <Button type="submit" className="page-button"> Submit </Button>
      </Form>
    </div>
  );
}
export default EditItem;