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
      <Link to = "/items"> <img src="https://cdn-icons.flaticon.com/png/512/2697/premium/2697385.png?token=exp=1658412536~hmac=67f873b8ccfbb2eb1b48d048a6ed50eb"/> </Link>
      </div>
      <div>
        <Link to = "/user"> <img src="https://cdn-icons-png.flaticon.com/512/64/64572.png" className="profile"/> </Link>
      </div>
    </nav>
  );
}

export default ItemList;
