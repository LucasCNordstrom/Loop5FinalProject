import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, useEffect } from "react";
import EditItem from "./EditItem";
import '../CSS/ProductInfo.css';

function ProductInfo() {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    fetch(`https://loop5finalproject.azurewebsites.net/items/${id}`)
      .then((response) => response.json())
      .then((data) => setItem(data))
      .then(setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [edit]);
  

  const changeEdit = () => {
    setEdit(false);
  }
if(item.location === undefined) return <></>
  return edit ?  (
  <div>
    < EditItem item={item} onChange={changeEdit} />
  </div>) 
  :
  (
    <div>
        <div>
          <div> {item.name} </div>
          <div> {item.expiryDate} </div>
          <div>
            {item.amount} {item.measurement}
          </div>
          <div> {item.location} </div>
          <button onClick={() => setEdit(true)}> Edit </button>
          <button onClick={() => navigate(-1)}> BACK  </button>
        </div>
    </div> )
}
export default ProductInfo;