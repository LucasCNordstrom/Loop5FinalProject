// import "../CSS/ItemList.css";
// import { useState, useEffect } from "react";
// import BounceLoader from "react-spinners/BounceLoader";
// import { useNavigate } from "react-router-dom";
// import { useUserAuth } from "../context/UserAuthContext";
// import { requestOptionDel } from "../helperFunctions/helpers.js";
// import { products } from "../helperFunctions/products";

// const MiniGame = () => {


//   let something = JSON.parse(localStorage.getItem("items"));
//   const navigate = useNavigate();
//   const [answers, setAnswers] = useState([]);
//   const [score, setScore] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const today = Date.parse(new Date());

//   console.log(something);

//   function mathRandom(maxlength) {
//     return Math.floor(Math.random() * maxlength);
//   }

//   function generateRandomNumbers() {
//     let arr = [];
//     while (arr.length < 3) {
//       var r = mathRandom(products.length);
//       if (!arr.includes(r)) arr.push(r);
//     }
//     return arr;
//   }

//   let arr = generateRandomNumbers();

//   function shuffleArray(input) {
//     let array = [
//       { id: products[arr[0]], value: false },
//       { id: products[arr[1]], value: false },
//       { id: products[arr[2]], value: false },
//       { id: input, value: true },
//     ];
//     for (var i = array.length - 1; i > 0; i--) {
//       var j = Math.floor(Math.random() * (i + 1));
//       var temp = array[i];
//       array[i] = array[j];
//       array[j] = temp;
//     }
//     return array;
//   }

//   setAnswers(shuffleArray(something[mathRandom(something.length)].name));

//   console.log('firat array input is:' + something[10]);

//   const validateAnswer = (value) => {
//     if (value === true) {
//       setScore(+1);
//     } else if (value === false) {
//       setScore(0);
//     }
//   };

//   return (
//     <div>
//       Hi
//     </div>
//   );
// };

// export default MiniGame;
