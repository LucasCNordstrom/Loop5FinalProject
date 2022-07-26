import "../CSS/ItemList.css";
import { useState, useEffect } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { requestOptionDel } from "../helperFunctions/helpers.js";
import { products } from "../helperFunctions/products";

const MiniGame = () => {
    
    let localItems = JSON.parse(localStorage.getItem("items"))

  const navigate = useNavigate();
  const [answers, setAnswers] = useState();
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const today = Date.parse(new Date());

  function mathRandom(maxlength) {
    return Math.floor(Math.random() * maxlength);
  }

  function shuffleArray() {
    let array = [];
    while(array.length < 3) {
        var random = products[mathRandom(products.length)];
        if(!array.includes(random) && !localItems.includes(random)) array.push({id: random, value: false})
    }
    while(array.length < 4){
        random = localItems[mathRandom(localItems.length)].name
        if(!array.includes(random)) array.push({id: random, value: true})
    }
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  useEffect(() => {
    const tempanswers = shuffleArray()
    setAnswers(tempanswers);
  }, [score]);

  const validateAnswer = (value) => {
    if (value === true) {
      setScore(score + 1);
    } else if (value === false) {
      setScore(0);
    }
  };

  if (!answers) return <>Loading...</>
  if (localItems.length < 11) return <p> Sorry you must have at least 10 items to play! You need {10 - localItems.length} more items. </p>
  return (
    <div>
      Which one of these products exist in your list?
      <button onClick={() => validateAnswer(answers[0].value)}> {answers[0].id}</button>
      <button onClick={() => validateAnswer(answers[1].value)}> {answers[1].id}</button>
      <button onClick={() => validateAnswer(answers[2].value)}> {answers[2].id}</button>
      <button onClick={() => validateAnswer(answers[3].value)}> {answers[3].id}</button>
      <p> Total score: {score} </p>
    </div>
  );
};

export default MiniGame;
