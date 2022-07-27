import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, useEffect } from "react";
import EditItem from "./EditItem";
import "../CSS/AddItem.css";
import RecipeCard from "./RecipeCard";

const ItemInfo = () => {
  const { id } = useParams();
  const [displaynextandback,setdisplaynextandback] = useState (false);
  const [displaygetinspired,setdisplaygetinspired] = useState (true);
  const [item, setItem] = useState();
  const [edit, setEdit] = useState(false);
  const [getRecipe, setGetRecipe] = useState(false);
  const navigate = useNavigate();
  const showrecipes =() =>{
    setGetRecipe(!getRecipe);
    setdisplaynextandback(true);
    setdisplaygetinspired(false);
  
  }
  const showgetinspired=()=>{
    setdisplaygetinspired(true);
    setdisplaynextandback(false);
    setGetRecipe(!getRecipe);
  }
  const updategetrecipe=()=>{

    setGetRecipe(getRecipe);
    console.log(getRecipe);
  }
  
  let localItems = JSON.parse(localStorage.getItem("items"))
  useEffect(() => {
    
    setItem(localItems.filter(item => item.uniqueId === id)[0])

  }, [edit, getRecipe]);

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
      <div>
      <p>
        Product name: {item.name}
      </p>
      <br/>
      <p>
        Product expiration date: {item.expiryDate.split('T')[0]}
      </p>
      <br />
      <p>
        Product quantity:
        {item.amount} {item.measurement}
      </p><br/>
      <p>
        Product stored in: <b>{item.location}</b>
      </p></div>
      <span className="item-info-buttons">
        <button 
          className="page-button" onClick={() => navigate(-1)}>
          Back
        </button>
        <button 
          className="page-button" onClick={() => setEdit(true)}>
          Edit
        </button>
        <br/>
        <button className={displaygetinspired? 'page-button' : 'hide-button'} onClick={(showrecipes)}>Get inspired  </button>
        <button className={displaynextandback?  'page-button': 'hide-button'} onClick={(updategetrecipe)}>Next Recipe  </button>
        <button className={displaynextandback? 'page-button' : 'hide-button'} onClick={(showgetinspired)}>BacktoItemdetails  </button>
        {getRecipe && <RecipeCard ingridient={item.name}/>}
        
      </span>
    </div>
  );
}
export default ItemInfo;
