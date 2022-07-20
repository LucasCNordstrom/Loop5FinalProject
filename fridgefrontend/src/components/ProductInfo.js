import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, useEffect } from 'react';


function ProductInfo() {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch(`https://loop5finalproject.azurewebsites.net/items/plswork`)
    .then(response => response.json())
    .then(data => setItem(data));
    setLoading(false);
  };

  console.log('dis is id:');
  console.log(id);
  console.log(item);

  useEffect(() => {fetchData()}, []);

  return (
    <div >
      <div> {item.name} </div>
      <div> {item.expiryDate} </div>
      <div> {item.amount} {item.measurement} </div>
      <button> Edit </button>
    </div>
  );
}

export default ProductInfo;
