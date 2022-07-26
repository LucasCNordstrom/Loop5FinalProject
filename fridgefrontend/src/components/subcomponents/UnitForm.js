import React from "react";
import { Form } from "react-bootstrap";

export default function UnitForm({ amount, limitValue, unit, setUnit }) {
  return (
    <Form.Group>
      <Form.Control
        className="input"
        type="number"
        min="0"
        value={amount}
        onChange={limitValue}
        required={true}
      />
      <Form.Select
        className="input unit-size"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="Kg">Kg</option>
        <option value="Liter">Liter</option>
        <option value="Pieces">Pieces</option>
      </Form.Select>
    </Form.Group>
  );
}
