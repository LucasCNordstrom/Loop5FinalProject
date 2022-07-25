import React from 'react'
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const ItemListDetails = ({item}) => {
    const navigate = useNavigate();

    
  return (
        <motion.span initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} className='item-details'>
        <p> Expiration date: {item.expiryDate.split('T')[0]} </p>
        <p>Quantity: {item.amount} {item.measurement}</p>
        <p> Stored in: {item.location} </p>
        <Button onClick={() => {
            navigate(`/items/${item.uniqueId}`);
        }}> DETAILS </Button>
        </motion.span>
  )
}

export default ItemListDetails;
