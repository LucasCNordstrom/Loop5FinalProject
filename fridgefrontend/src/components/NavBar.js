import "../CSS/NavBar.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function ItemList() {
  return (
    <nav className="NavBar--list">
      <div>
        <Link to="/home">
          <motion.img
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }} 
            src="https://cdn-icons-png.flaticon.com/512/553/553376.png"
            alt="home"
          />
        </Link>
      </div>
      <div>
        <Link to="/items">
          <motion.img
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }} 
            src="https://cdn-icons-png.flaticon.com/512/507/507205.png"
            alt="item-list"
          />
        </Link>
      </div>
      <div>
        <Link to="/user">
          <motion.img
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }} 
            src="https://cdn-icons-png.flaticon.com/512/64/64572.png"
            alt="user"
          />
        </Link>
      </div>
    </nav>
  );
}

export default ItemList;
