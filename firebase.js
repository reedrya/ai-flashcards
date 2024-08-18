// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeAEJJxfKZyRvSNIFST0fn_L6RUXI-z7Q",
  authDomain: "flashcardsaas-f830e.firebaseapp.com",
  projectId: "flashcardsaas-f830e",
  storageBucket: "flashcardsaas-f830e.appspot.com",
  messagingSenderId: "1099030063270",
  appId: "1:1099030063270:web:14866db714e2666f112c67",
  measurementId: "G-P0M58YD3PJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); 

export {db}