// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAD5AWBDcE_O-AaavyIWBJrM2GAit-hfn8",
  authDomain: "garden-12856.firebaseapp.com",
  projectId: "garden-12856",
  storageBucket: "garden-12856.firebasestorage.app",
  messagingSenderId: "657229909840",
  appId: "1:657229909840:web:6cb43bb4b71b9ee42ba655",
  measurementId: "G-6Y64WH66M9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
export { app, auth, firestore };

