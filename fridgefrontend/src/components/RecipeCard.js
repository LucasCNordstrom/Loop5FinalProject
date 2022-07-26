import "../CSS/ItemList.css";
import { useState, useEffect } from "react";

function RecipeCard({ ingridient }) {
  const [recipeInformation, setRecipeInformation] = useState();

  const fetchRecipe = async (fetchIngridient) => {
    const picture = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${fetchIngridient}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.meals)
          return data.meals[Math.floor(Math.random() * data.meals.length)];
        throw new Error("No recipies found");
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      if (picture) fetchInfoAboutRecipe(picture.idMeal);
      else setRecipeInformation(null)
    }, 10);
  };

  const fetchInfoAboutRecipe = async (recipeId) => {
    await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRecipeInformation(data.meals[0]);
      });
  };

  useEffect(() => {
    fetchRecipe(ingridient);
  }, []);

  if(!recipeInformation) return (<><br/>No recipe</>)

  return (
    <>
      <div>
        <p>{recipeInformation.strMeal}</p>
        <br />
        <p>{recipeInformation.strCategory}</p>
        <br />
        <img
          src={recipeInformation.strMealThumb}
          alt={recipeInformation.strMeal}
        />
        <br />
        <a href={recipeInformation.strSource}>Link to recipe</a>
      </div>
    </>
  );
}

export default RecipeCard;
