import React from "react";
import { motion,AnimatePresence } from "framer-motion";
import ItemListDetails from "./ItemListDetails";

export default function ItemList({
  items,
  search,
  displayBy,
  onDelete,
  itemDetails,
}) {
  let countdown = 0;
  const today = Date.parse(new Date());

  //assign color of items dependant on expirydate
  const assignColor = (exp) => {
    countdown = calcCountdown(exp);
    if (countdown <= 0) {
      return "black-color";
    } else if (countdown < 4) {
      return "red-color";
    } else if (countdown < 7) {
      return "orange-color";
    } else if (countdown < 10) {
      return "yellow-color";
    } else {
      return "green-color";
    }
  };

  const calcCountdown = (exp) => {
    return Math.ceil((Date.parse(exp) - today) / (1000 * 60 * 60 * 24));
  };

  return (
    <ul className="item-ul">
        {items
          .filter((list) => {
            if (displayBy === "") {
              return list;
            } else if (list.location.includes(displayBy)) {
              return list;
            }
          })
          .filter((list) => {
            if (search === "") {
              return list;
            } else if (list.name.toLowerCase().includes(search.toLowerCase())) {
              return list;
            }
          })
          .map((item) => (
            <motion.li
              key={item.uniqueId}
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: 300}}
              className={assignColor(item.expiryDate)}
            >
              <span className="item-li">
                  <div className="items">
                    <div className="list-button" onClick={() => {itemDetails(item.uniqueId);}}>
                    </div>
                <h5> {item.name} </h5>
                <h5> {calcCountdown(item.expiryDate)} days left </h5>
                  <motion.img 
                  whileHover={{ scale: 1.5 }}
                  alt="Delete icon"
                  src="https://cdn-icons-png.flaticon.com/512/484/484611.png"
                  className="deleteIcon"
                  onClick={() => onDelete(item.uniqueId, item)}
                  /></div>
              </span>
              <AnimatePresence>{item.clicked && <ItemListDetails item={item} itemDetails={itemDetails}/>}</AnimatePresence>
            </motion.li>
          ))}
    </ul>
  );
}
