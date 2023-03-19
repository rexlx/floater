// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBvV7w3QRXRlxIR15yHOKIJgdNrV-ctFEI",
    authDomain: "plated-dryad-148318.firebaseapp.com",
    databaseURL: "https://plated-dryad-148318-default-rtdb.firebaseio.com",
    projectId: "plated-dryad-148318",
    storageBucket: "plated-dryad-148318.appspot.com",
    messagingSenderId: "776981729273",
    appId: "1:776981729273:web:970d200ef96243703b3728",
    measurementId: "G-F31VNZ7M7S"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
const db = getFirestore(app)
const authApi = getAuth(app)

// const tstamp = firebase.firestore.FieldValue.serverTimestamp

export { db, authApi }