// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT_uoTnlBdWDbD2VzSjnMDokyVXjQYOIA",
  authDomain: "olx-clone-8fa50.firebaseapp.com",
  projectId: "olx-clone-8fa50",
  storageBucket: "olx-clone-8fa50.firebasestorage.app",
  messagingSenderId: "752005683805",
  appId: "1:752005683805:web:fcebbdba9012a54d1ccbb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);