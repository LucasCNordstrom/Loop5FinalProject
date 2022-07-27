import React from "react";
import { useNavigate } from "react-router-dom";

const ItemListDetails = ({ item, itemDetails }) => {
  const navigate = useNavigate();

  return (
    <span
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
    </span>
  );
};

export default ItemListDetails;
