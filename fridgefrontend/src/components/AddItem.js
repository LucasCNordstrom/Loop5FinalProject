import '../CSS/AddItem.css';
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import {formatDate} from '../helperFunctions/helpers';
import { Form, Button } from "react-bootstrap";
import {capitalizeFirstLetter} from '../helperFunctions/helpers.js';


function AddItem() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('Kg')
  const [storage, setStorage] = useState('');
  const { user } = useUserAuth();
  const navigate = useNavigate();
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
    if (!title || !date || !amount || !storage) {
      setError(true);
      return;
    }
    try {
      await fetch(`https://loop5finalproject.azurewebsites.net/items`, requestOptions)
    } catch (error) {
      console.log(error);
    }
    navigate('/items');
  }
  useEffect(() => {}, [storage]);
  return (
    <div className='add'>
      <Form id="addItem" onSubmit={onSubmit}>
      <h3>Add new item:</h3>
        <p>Product name: </p>
        <Form.Group>
          <Form.Control type="text" className="input" value={title} maxLength="25" onChange={(e) => setTitle(capitalizeFirstLetter(e.target.value))}/>
        </Form.Group>

        <p>Expiration date: </p>
        <Form.Group>
          <Form.Control type="date" className="input" value={date} min={today} onChange={(e) => setDate(e.target.value)} />
        </Form.Group>

        <p>Storage: </p>
      <Form.Group>
        <input type="radio" name="storage" id='fridge' value="Fridge" className="storage"
              onChange={handleChange} />
        <label htmlFor="fridge"><img alt="fridge-icon" src='https://cdn-icons-png.flaticon.com/512/483/483850.png' className='sel-icon fridge-icon'/></label>
        <input type="radio" name="storage" id='freezer' value="Freezer" className="storage"
              onChange={handleChange} />
        <label htmlFor="freezer"><img alt="freezer-icon" src='https://cdn-icons-png.flaticon.com/512/445/445903.png' className='sel-icon freezer-icon'/></label>
        <input type="radio" name="storage" id='pantry' value="Pantry" className="storage"
              onChange={handleChange} />
        <label htmlFor="pantry"><img alt="pantry-icon" src='https://cdn-icons-png.flaticon.com/512/6785/6785540.png' className='sel-icon pantry-icon'/></label>
        <p> Current selection: {storage} </p>
      </Form.Group>

        <p> Amount: </p>
        <Form.Group> 
          <Form.Control className="input" type="number" min="0" value={amount} onChange={limitValue}/>
          <Form.Select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="Kg">Kg</option>
            <option value="Liter">Liter</option>
            <option value="Pieces">Pieces</option>
          </Form.Select>
        </Form.Group>
        {error && <h4> Please do not leave fields empty!</h4>}
        <Button type="submit" id="btnSubmit" className='page-button'> Submit </Button>
      </Form>
    </div>
  );
}
export default AddItem;