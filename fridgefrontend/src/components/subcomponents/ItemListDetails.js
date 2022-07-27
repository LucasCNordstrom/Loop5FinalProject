import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ItemListDetails = ({ item, itemDetails }) => {
  const navigate = useNavigate();

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="item-details"
      onClick={() => {itemDetails(item.uniqueId);}}
    >
      <p> Expiration date: {item.expiryDate.split("T")[0]} </p>
      <p> Quantity: {item.amount} {item.measurement} </p>
      <p> Stored in: {item.location} </p>
      <button 
        onClick={() => {
          navigate(`/items/${item.uniqueId}`);
        }}
      >
        DETAILS
      </button>
    </motion.span>
  );
};

export default ItemListDetails;
