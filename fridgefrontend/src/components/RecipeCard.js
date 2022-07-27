import "../CSS/ItemList.css";
import "../CSS/RecipeCard.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion"

function RecipeCard({ ingridient, nextRecipe }) {
  const [recipeInformation, setRecipeInformation] = useState();

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
    fetchRecipe(ingridient);
  }, [nextRecipe, ingridient]);

  if(!recipeInformation) return (<><br/>No recipe</>)

  return (
    <>
      <div className="Recipe-section">
        <p>Meal Name : {recipeInformation.strMeal}
        <br/>
        Category : {recipeInformation.strCategory}</p>
        
        <a href={recipeInformation.strSource} target="_blank" rel="noreferrer">
          <motion.img className="Recipe-Image"
            whileHover={{ scale: 1.1 }}
            src={recipeInformation.strMealThumb}
            alt={recipeInformation.strMeal}
        /></a>
        </div>
      
      
    </>
  );
}

export default RecipeCard;
