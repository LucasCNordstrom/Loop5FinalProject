import "../CSS/NavBar.css";
import { Link } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { RiFileList3Fill } from 'react-icons/ri';
import { IoIosHome } from 'react-icons/io';


function ItemList() {
  return (
    <nav className="NavBar--list">
      <div>
      <Link to = "/home"> <img src="https://cdn-icons-png.flaticon.com/512/553/553376.png"/> </Link>
      </div>
      <div>
      <Link to = "/items"> <img src="https://cdn-icons-png.flaticon.com/512/507/507205.png"/> </Link>
      </div>
      <div>
        <Link to = "/user"> <img src="https://cdn-icons-png.flaticon.com/512/64/64572.png" className="profile"/> </Link>
      </div>
    </nav>
  );
}

export default ItemList;
