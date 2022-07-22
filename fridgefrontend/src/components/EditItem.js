import '../CSS/AddItem.css';
import { useUserAuth } from "../context/UserAuthContext";
import { useState } from 'react';
import {formatDate} from '../helperFunctions/helpers';
import { Form, Button } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";


function EditItem({item, onChange}) {
  const [title, setTitle] = useState(item.name);
  const [date, setDate] = useState(item.expiryDate);
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState(item.amount);
  const [unit, setUnit] = useState(item.measurement)
  const [storage, setStorage] = useState(item.location);
  const { user } = useUserAuth();
  const today = formatDate(new Date);
  const limitValue = (e) => {
    const value = e.target.value;
    if(value.length > 3) {return };
    setAmount(value);
  }
  console.log('title: ' + title + ' date: ' + date + ' amount: ' + amount + ' unit: ' + unit + ' storage ' + storage);

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
    <div>
      <Form onSubmit={onSubmit}>
      <p>Product name: </p>
        <Form.Group>
          <Form.Control type="text" value={title} maxLength="25" onChange={(e) => setTitle(e.target.value)}/>
        </Form.Group>
        <p>Expiration date: </p>
        <Form.Group>
          <Form.Control type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)} />
        </Form.Group>
        <p>Storage: </p>
        <ToggleButtonGroup className="storage-sel" type="radio" name="radio">
          <ToggleButton className="radio-hide" value='Fridge' onChange={handleChange} >
          <img src='https://cdn-icons-png.flaticon.com/512/483/483850.png' className='sel-icon fridge-icon'/>
        </ToggleButton>
          <ToggleButton className="radio-hide" value='Freezer' onChange={handleChange} >
          <img src='https://cdn-icons-png.flaticon.com/512/445/445903.png' className='sel-icon freezer-icon'/>
        </ToggleButton>
          <ToggleButton className="radio-hide" value='Pantry' onChange={handleChange} >
          <img src='https://cdn-icons-png.flaticon.com/512/6785/6785540.png' className='sel-icon pantry-icon'/>
        </ToggleButton>
      </ToggleButtonGroup>
      <p> Amount: </p>
        <Form.Group> 
          <Form.Control className="item-quantity" type="number" min="0" value={amount} onChange={limitValue}/>
          <Form.Select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="Kg">Kg</option>
            <option value="Liter">Liter</option>
            <option value="Pieces">Pieces</option>
          </Form.Select>
        </Form.Group>
        
        {error && <h4> Please do not leave fields empty!</h4>}
        <Button onClick={() => onChange()}> Cancel </Button>
        <Button type="submit"> Submit </Button>
      </Form>
    </div>


    // <div>
    //   <h1> Edit item:</h1>
    //   {error && <h4> Please do not leave fields empty!</h4>}
    //   <Form id="addItem" onSubmit={onSubmit}>
    //     <div>
    //       <label> Item name: </label>
    //       <input type="text" value={title} maxLength="25" placeholder={item.name} onChange={(e) => setTitle(e.target.value)}/>
    //     </div>
    //     <div>
    //       <label> Expiration date: </label>
    //       <input type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)} />
    //     </div>
    //     <div>
    //     <p>Storage: </p>
    //     <ToggleButtonGroup className="storage-sel" type="radio" name="radio">
    //     <ToggleButton className="radio-hide" value='Fridge' onChange={handleChange}>
    //       <img src='https://cdn-icons-png.flaticon.com/512/483/483850.png' className='sel-icon fridge-icon'/>
    //     </ToggleButton>
    //     <ToggleButton className="radio-hide" value='Freezer' onChange={handleChange}>
    //       <img src='https://cdn-icons-png.flaticon.com/512/445/445903.png' className='sel-icon freezer-icon'/>
    //     </ToggleButton>
    //     <ToggleButton className="radio-hide" value='Pantry' onChange={handleChange}>
    //       <img src='https://cdn-icons-png.flaticon.com/512/6785/6785540.png' className='sel-icon pantry-icon'/>
    //     </ToggleButton>
    //   </ToggleButtonGroup>
      
    //   </div>
    //     <div>
    //       <label> Quantity: </label>
    //       <input type="number" min="0" value={amount} placeholder={item.amount} onChange={limitValue}/>
    //       <select value={unit} onChange={(e) => setUnit(e.target.value)}>
    //         <option value="Kg">Kg</option>
    //         <option value="Liter">Liter</option>
    //         <option value="Pieces">Pieces</option>
    //     </select>
    //     </div>
    //     <input type="submit" id="btnSubmit"/>
    //     <button onClick={() => onChange()}> Cancel </button>
    //   </Form>
    // </div>
  );
}
export default EditItem;