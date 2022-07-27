import "../CSS/ItemList.css";
import "../CSS/RecipeCard.css";
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
      <div className="Recipe-section">
        <p>Meal Name : {recipeInformation.strMeal}
        <br/>
        Category : {recipeInformation.strCategory}</p>
        <div className="recipes">
        <div className="Recipe"><img className="Recipe-Image"
          src={recipeInformation.strMealThumb}
          alt={recipeInformation.strMeal}
        /></div>
       <div className="Recipe">
        <a href={recipeInformation.strSource}>Link to recipe</a></div>
      </div>
      </div>
    </>
  );
}

export default RecipeCard;
