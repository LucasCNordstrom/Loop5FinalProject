import React from 'react'
import { Form } from "react-bootstrap";


const StorageSelector = ({displayBy, handleChange}) => {

  return (
      <Form.Group className="sort-by">
        <input type="radio" name="storage" value="" className="displayBy"
              onChange={handleChange} checked={displayBy === ""}/>
        <label htmlFor="fridge">All</label>
        <input type="radio" name="storage" value="Fridge" className="displayBy"
              onChange={handleChange} checked={displayBy === "Fridge"}/>
        <label htmlFor="fridge">Frige</label>
        <input type="radio" name="storage" value="Freezer" className="displayBy"
              onChange={handleChange} checked={displayBy === "Freezer"}/>
        <label htmlFor="freezer">Freezer</label>
        <input type="radio" name="storage" value="Pantry" className="displayBy"
              onChange={handleChange} checked={displayBy === "Pantry"}/>
        <label htmlFor="pantry">Pantry</label>
      </Form.Group>
  )
}

export default StorageSelector;
