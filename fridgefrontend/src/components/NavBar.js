import "../CSS/NavBar.css";
import { Link } from "react-router-dom";

function ItemList() {
  return (
    <div className="NavBar--list">
      <div>
      <Link to = "/home"> Home </Link>
      </div>
      <div>
      <Link to = "/items"> Items </Link>
      </div>
      <div>
        <Link to = "/user"> User </Link>
      </div>
    </div>
  );
}

export default ItemList;
