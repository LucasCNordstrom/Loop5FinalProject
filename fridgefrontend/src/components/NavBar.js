import "../CSS/NavBar.css";
import { Link } from "react-router-dom";

function ItemList() {
  return (
    <div className="NavBar--list">
      <div>
      <Link to = "/"> Home </Link>
      </div>
      <div>
      <Link to = "/home/items"> Items </Link>
      </div>
      <div>
        <Link to = "/home/user"> User </Link>
      </div>
    </div>
  );
}

export default ItemList;
