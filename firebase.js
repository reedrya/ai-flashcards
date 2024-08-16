// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzWRK7EG4AtJboAkgoFUm8Vu4RZDhEYeA",
  authDomain: "flashcardsaas-56354.firebaseapp.com",
  projectId: "flashcardsaas-56354",
  storageBucket: "flashcardsaas-56354.appspot.com",
  messagingSenderId: "626715956577",
  appId: "1:626715956577:web:55d15b3638fc93d5db6120",
  measurementId: "G-9SB8QVCQ55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);