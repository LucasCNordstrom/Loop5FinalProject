import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase";

const initializeAuth = () => {
    initializeApp(firebaseConfig);
}

export default initializeAuth;
