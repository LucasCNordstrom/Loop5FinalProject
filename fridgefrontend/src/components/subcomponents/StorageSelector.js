import React from "react";
import { Form } from "react-bootstrap";

const StorageSelector = ({ displayBy, handleChange }) => {
  return (
    <Form.Group className="sort-by">
      <input
        label="All"
        type="radio"
        name="storage"
        value=""
        className="displayBy"
        onChange={handleChange}
        checked={displayBy === ""}
      />
      <input
        label="Fridge"
        type="radio"
        name="storage"
        value="Fridge"
        className="displayBy"
        onChange={handleChange}
        checked={displayBy === "Fridge"}
      />
      <input
        label="Freezer"
        type="radio"
        name="storage"
        value="Freezer"
        className="displayBy"
        onChange={handleChange}
        checked={displayBy === "Freezer"}
      />
      <input
        label="Pantry"
        type="radio"
        name="storage"
        value="Pantry"
        className="displayBy"
        onChange={handleChange}
        checked={displayBy === "Pantry"}
      />
    </Form.Group>
  );
};

export default StorageSelector;
