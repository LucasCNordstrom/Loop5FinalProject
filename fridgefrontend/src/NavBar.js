import "./NavBar.css";
import { Link } from "react-router-dom";

function ItemList() {
  return (
    <div className="NavBar--list">
      <div>
        Homepage
      </div>
      <div>
        Items
      </div>
      <div>
        <Link to="user"> User </Link>
      </div>
    </div>
  );
}

export default ItemList;
