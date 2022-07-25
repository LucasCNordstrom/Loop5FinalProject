import { getAuth } from "firebase/auth";
import {initializeApp} from "firebase/app"


//TODO: MAKE IT A SECRET

const firebaseConfig = {
    apiKey: "AIzaSyBM243PNhydxpk32wyRk0nUomDlFy9AucA",
    authDomain: "fridgeapp-45c8b.firebaseapp.com",
    projectId: "fridgeapp-45c8b",
    storageBucket: "fridgeapp-45c8b.appspot.com",
    messagingSenderId: "303473993114",
    appId: "1:303473993114:web:23b913b04155ebff6b4623"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;