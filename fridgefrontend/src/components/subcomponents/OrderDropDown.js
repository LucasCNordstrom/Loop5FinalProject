import React from 'react'
import { Form } from "react-bootstrap";


const OrderDropDown = ({orderBy, setOrderBy}) => {

  return (
    <Form.Group> 
      <Form.Select className="order-by" title="Order items by" value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
        <option value="expirationDate">Expiration Date</option>
        <option value="expirationDateRev">Expiration Date Descending</option>
        <option value="alphabetical">Alphabetically</option>
        <option value="alphabeticalRev">Alphabetically Descending</option>
        <option value="quantity">Amount</option>
        <option value="quantityRev">Amount Descending</option>
      </Form.Select>
    </Form.Group>
  )
}

export default OrderDropDown;
