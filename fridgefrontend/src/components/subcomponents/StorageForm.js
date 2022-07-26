import React from "react";
import { Form } from "react-bootstrap";

export default function StorageForm({ handleChange, storage }) {
  return (
    <Form.Group>
      <input
        type="radio"
        name="storage"
        id="fridge"
        value="Fridge"
        className="storage"
        onChange={handleChange}
        checked={storage === "Fridge"}
      />
      <label htmlFor="fridge">
        <img
          alt="fridge-icon"
          src="https://cdn-icons-png.flaticon.com/512/483/483850.png"
          className="sel-icon fridge-icon"
        />
      </label>
      <input
        type="radio"
        name="storage"
        id="freezer"
        value="Freezer"
        className="storage"
        onChange={handleChange}
        checked={storage === "Freezer"}
      />
      <label htmlFor="freezer">
        <img
          alt="freezer-icon"
          src="https://cdn-icons-png.flaticon.com/512/445/445903.png"
          className="sel-icon freezer-icon"
        />
      </label>
      <input
        type="radio"
        name="storage"
        id="pantry"
        value="Pantry"
        className="storage"
        onChange={handleChange}
        checked={storage === "Pantry"}
      />
      <label htmlFor="pantry">
        <img
          alt="pantry-icon"
          src="https://cdn-icons-png.flaticon.com/512/6785/6785540.png"
          className="sel-icon pantry-icon"
        />
      </label>
      <p> Current selection: {storage} </p>
    </Form.Group>
  );
}
