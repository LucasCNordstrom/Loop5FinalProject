// import '../CSS/ItemList.css';
// import { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import BounceLoader from "react-spinners/BounceLoader";
// import { useNavigate } from "react-router-dom";
// import { useUserAuth } from "../context/UserAuthContext";
// import {requestOptionDel} from '../helperFunctions/helpers.js';
// import { products } from '../helperFunctions/products';


// const MiniGame = () => {
//   const navigate = useNavigate();
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [score, setScore] = useState(0);
//   const { user } = useUserAuth();
//   const today = Date.parse(new Date());

//   function mathRandom(maxlength) {
//     return Math.floor(Math.random() * maxlength)
//   }

//   function generateRandomNumbers () {
//     let arr = [];
//     while(arr.length < 3){
//       var r = mathRandom(products.length);
//       if(!arr.includes(r)) arr.push(r);
//     }
//     return arr;
//   }

//   let arr = generateRandomNumbers();

//   function shuffleArray(input) {
//     let array = [{id: products[arr[0]], value: false}, {id: products[arr[1]], value: false}, {id: products[arr[2]],  value: false}, {id: input, value: true}];
//     for (var i = array.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//     }
//     return array;
//   }

//   arr = generateRandomNumbers(items[mathRandom].name)

//   const validateAnswer  = (value) => {
//     if(value === true) {setScore(+1)}
//     else if (value === false) {setScore(0)}
//   }

//   useEffect(() => {}, [user]);

//   return (
//     <div> 
//       { loading ? <> Loading... </> :
//         <>
//           <p> Which of these items is on your list?</p>
//           <button onClick={() => validateAnswer(answers[0].value)}> {answers[0].id}</button>
//           <button onClick={() => validateAnswer(answers[1].value)}> {answers[1].id}</button>
//           <button onClick={() => validateAnswer(answers[2].value)}> {answers[2].id}</button>
//           <button onClick={() => validateAnswer(answers[3].value)}> {answers[3].id}</button>  
//           <p> Current score {score} </p>
//       </>
//       }
//     </div> 
//   )
// }

// export default MiniGame;
