// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXiWz83LWTRWYCLYZABH_rXahTRIlhzjU",
  authDomain: "cookingdad-v2.firebaseapp.com",
  projectId: "cookingdad-v2",
  storageBucket: "cookingdad-v2.appspot.com",
  messagingSenderId: "176225923622",
  appId: "1:176225923622:web:a31f36ea2ed7dc0d5d6ce7"
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(initFirebase);
