import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, useEffect } from "react";
import EditItem from "./EditItem";
import "../CSS/AddItem.css";

function ItemInfo() {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    fetch(`https://loop5finalproject.azurewebsites.net/Items/${id}`)
      .then((response) => response.json())
      .then((data) => setItem(data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [edit]);

  const changeEdit = () => {
    setEdit(false);
  };

  if (loading) return <ClipLoader />;

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
        Product expiration date: <b>{item.expiryDate}</b>
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
