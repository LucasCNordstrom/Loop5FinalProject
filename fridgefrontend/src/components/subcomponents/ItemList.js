import React from 'react'
import { motion, AnimatePresence } from "framer-motion"
import ItemListDetails from './ItemListDetails';

export default function ItemList({items, search, displayBy, onDelete, itemDetails}) {
    let countdown = 0;
    const today = Date.parse(new Date());

    //assign color of items dependant on expirydate
    const assignColor = (exp) =>  {
    countdown = calcCountdown(exp);
    if (countdown <= 0) {return "black-color"}
    if (countdown < 4) { return "red-color"}
    if (countdown < 7) { return "orange-color"}
    if (countdown < 10) {return "yellow-color"}
    {return "green-color"}
  }

  const calcCountdown = (exp) => {
    return Math.ceil((Date.parse(exp) - today) / (1000 * 60 * 60 * 24))
  }

  return (
    <ul className='item-ul'>
      <AnimatePresence>
      {items
      .filter((list) => {
        if (displayBy === "") {return list}
        else if(list.location.includes(displayBy)) {return list}
      })
      .filter((list) => {
        if(search === "") {return list}
        else if(list.name.toLowerCase().includes(search.toLowerCase())) {return list}
      }).map((item)=> (
        <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: 700 }} className={assignColor(item.expiryDate)} key={item.uniqueId}>
          <span className='item-li' onClick={() => {itemDetails(item.uniqueId)}}>
            <h5> {item.name} </h5>
            <h5> {calcCountdown(item.expiryDate)} days left </h5>
            <motion.img  whileHover={{ scale: 1.5}} alt="Delete icon" src='https://cdn-icons-png.flaticon.com/512/484/484611.png' className='deleteIcon' 
              onClick={() => onDelete(item.uniqueId, item)}/>
          </span>

          <AnimatePresence>
          { item.clicked && 
            <ItemListDetails item={item}/> }
          </AnimatePresence>

        </motion.li>))}
        </AnimatePresence>
      </ul> 
  )
}
