// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxFzF_XfuBhSn0j2tHN9ZioR0PBUIg168",
  authDomain: "the-quran-app-1f843.firebaseapp.com",
  projectId: "the-quran-app-1f843",
  storageBucket: "the-quran-app-1f843.appspot.com",
  messagingSenderId: "441801810604",
  appId: "1:441801810604:web:4cb78656a3d3185d72b509"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
