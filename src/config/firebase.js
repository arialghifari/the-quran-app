// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjRgfrlsDdnVtrpvS_i-aKl5T4WloP1PE",
  authDomain: "the-quran-app-d1c8c.firebaseapp.com",
  projectId: "the-quran-app-d1c8c",
  storageBucket: "the-quran-app-d1c8c.appspot.com",
  messagingSenderId: "538190269957",
  appId: "1:538190269957:web:540aa1321c1e38419b566c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
