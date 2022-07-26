import "../CSS/AddItem.css";
import { useUserAuth } from "../context/UserAuthContext";
import { useState } from "react";
import { formatDate } from "../helperFunctions/helpers";
import { Form } from "react-bootstrap";
import StorageForm from "./subcomponents/StorageForm";
import UnitForm from "./subcomponents/UnitForm";
import { useNavigate } from "react-router-dom";

function EditItem({ item, onChange }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(item.name);
  const [date, setDate] = useState(item.expiryDate.split("T")[0]);
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState(item.amount);
  const [unit, setUnit] = useState(item.measurement);
  const [storage, setStorage] = useState(item.location);
  const { user } = useUserAuth();
  const today = formatDate(new Date());
  const limitValue = (e) => {
    const value = e.target.value;
    if (value.length > 3) {
      return;
    }
    setAmount(value);
  };

  const handleChange = (e) => {
    e.persist();
    setStorage(e.target.value);
  };
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
      }),
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
      await fetch(
        `https://loop5finalproject.azurewebsites.net/Items/edit`,
        requestPut
      );
      localStorage.setItem("should fetch", JSON.stringify(true));
    } catch (error) {
      console.log(error);
    }
    navigate("/items");
  };

  return (
    <div className="add">
      <Form id="addItem" onSubmit={onSubmit}>
        <h3>Edit item:</h3>
        <p>Product name: </p>
        <Form.Group>
          <Form.Control
            type="text"
            className="input"
            value={title}
            maxLength="25"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <p>Expiration date: </p>
        <Form.Group>
          <Form.Control
            type="date"
            className="input"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <p>Storage: </p>
        <StorageForm handleChange={handleChange} storage={storage} />

        <p> Amount: </p>
        <UnitForm
          amount={amount}
          limitValue={limitValue}
          unit={unit}
          setUnit={setUnit}
        />
        {error && <h4> Please do not leave fields empty!</h4>}
        <button 
          className="page-button" onClick={() => onChange()}>
          Cancel
        </button>
        <button 
          type="submit" className="page-button">
          Submit
        </button>
      </Form>
    </div>
  );
}
export default EditItem;
