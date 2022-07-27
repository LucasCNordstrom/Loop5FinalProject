import "../CSS/AddItem.css";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDate } from "../helperFunctions/helpers";
import { Form } from "react-bootstrap";
import { capitalizeFirstLetter } from "../helperFunctions/helpers.js";
import StorageForm from "./subcomponents/StorageForm";
import UnitForm from "./subcomponents/UnitForm";
import { FridgeApiControllerUrl } from "../GlobalVariables";

function AddItem() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("Kg");
  const [storage, setStorage] = useState("");
  const [isActive, setIsActive] = useState(true);
  const { user } = useUserAuth();
  const navigate = useNavigate();
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
    const postRequestOptions = {
      method: "POST",
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
        UniqueId: "something",
      }),
    };
    e.preventDefault();
    try {
      console.log("trying once")
      await fetch(
        `${FridgeApiControllerUrl}`,
        postRequestOptions
      );
      localStorage.setItem("should fetch", JSON.stringify(true));
    } catch (error) {
      console.log(error);
    }
    setIsActive(current => !current);
    navigate("/items");
  };
  useEffect(() => {}, [storage]);

  return (
    <div className="add">
      <Form id="addItem" onSubmit={onSubmit}>
        <h3>Add new item:</h3>
        <p>Product name: </p>
        <Form.Group>
          <Form.Control
            type="text"
            className="input"
            value={title}
            maxLength="25"
            onChange={(e) => setTitle(capitalizeFirstLetter(e.target.value))}
            required={true}
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
            required={true}
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
        <button style={{pointerEvents: isActive ? "auto" : "none"}}      
          type="submit" id="btnSubmit" className="page-button">
          Submit
        </button>
      </Form>
    </div>
  );
}
export default AddItem;
