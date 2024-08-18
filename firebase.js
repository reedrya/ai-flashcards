// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
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

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics only on the client-side
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { db, analytics };
