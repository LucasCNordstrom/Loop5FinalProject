import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EditItem from "./EditItem";
import "../CSS/AddItem.css";
import RecipeCard from "./RecipeCard";
import BounceLoader from "react-spinners/BounceLoader";

const ItemInfo = () => {
  const { id } = useParams();
  const [displaynextandback, setdisplaynextandback] = useState(false);
  const [displaygetinspired, setdisplaygetinspired] = useState(true);
  const [item, setItem] = useState();
  const [edit, setEdit] = useState(false);
  const [getRecipe, setGetRecipe] = useState(false);
  const [nextRecipe, setNextRecipe] = useState(0)
  const navigate = useNavigate();

  const showrecipes = () => {
    setGetRecipe(!getRecipe);
    setdisplaynextandback(true);
    setdisplaygetinspired(false);
  };

  const updategetrecipe = () => {
    setGetRecipe(getRecipe);
    setNextRecipe(nextRecipe + 1);
    console.log(nextRecipe);
  };

  let localItems = JSON.parse(localStorage.getItem("items"));

  useEffect(() => {
    setItem(localItems.filter((item) => item.uniqueId === id)[0]);
  }, [edit, getRecipe, id, localItems]);

  const changeEdit = () => {
    setEdit(false);
  };

  if (!item) return <BounceLoader className="loader" size={150} color="white" />

  return edit ? (
    <>
      <EditItem item={item} onChange={changeEdit} />
    </>
  ) : (
    <div className="item-info">
      <div>
        <p>Product name: {item.name}</p>
        <br />
        <p>Product expiration date: {item.expiryDate.split("T")[0]}</p>
        <br />
        <p>
          Product quantity:
          {item.amount} {item.measurement}
        </p>
        <br />
        <p>
          Product stored in: <b>{item.location}</b>
        </p>
      </div>
      <span className="item-info-buttons">
        <button className="page-button" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="page-button" onClick={() => setEdit(true)}>
          Edit
        </button>
        <br />
        <button
          className={displaygetinspired ? "page-button next-recipe-btn" : "hide-button"}
          onClick={showrecipes}
        >
          Get inspired
        </button>
        <button
          className={displaynextandback ? "page-button next-recipe-btn" : "hide-button"}
          onClick={updategetrecipe}
        >
          Next Random Recipe!
        </button>

        {getRecipe && <RecipeCard ingridient={item.name} nextRecipe={nextRecipe}/>}
      </span>
    </div>
  );
};
export default ItemInfo;
