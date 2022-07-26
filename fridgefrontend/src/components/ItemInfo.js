import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, useEffect } from "react";
import EditItem from "./EditItem";
import "../CSS/AddItem.css";

const ItemInfo = () => {
  const { id } = useParams();
  const [item, setItem] = useState();
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  let localItems = JSON.parse(localStorage.getItem("items"))
  useEffect(() => {
    
    setItem(localItems.filter(item => item.uniqueId === id)[0])

  }, [edit]);

  const changeEdit = () => {
    setEdit(false);
  };

  if (!item) return (<>Loading...</>)

  return edit ? (
    <>
      <EditItem item={item} onChange={changeEdit} />
    </>
  ) : (
    <div className="item-info">
      <p>
        Product name: <b>{item.name}</b>
      </p>
      <p>
        Product expiration date: <b>{item.expiryDate.split('T')[0]}</b>
      </p>
      <p>
        Product quantity:
        <b>
          {item.amount} {item.measurement}
        </b>
      </p>
      <p>
        Product stored in: <b>{item.location}</b>
      </p>
      <span className="item-info-buttons">
        <button 
          className="page-button" onClick={() => navigate(-1)}>
          Back
        </button>
        <button 
          className="page-button" onClick={() => setEdit(true)}>
          Edit
        </button>
      </span>
    </div>
  );
}
export default ItemInfo;
