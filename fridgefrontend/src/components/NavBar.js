import "../CSS/NavBar.css";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from 'react-icons/fa';

function ItemList() {
  return (
    <div className="NavBar--list">
      <div>
      <Link to = "/home">  </Link>
      </div>
      <div>
      <Link to = "/items"> Items </Link>
      </div>
      <div>
        <Link to = "/user"> <FaRegUserCircle /> </Link>
      </div>
    </div>
  );
}

export default ItemList;
