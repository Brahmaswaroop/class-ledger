// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD5lqiAu6YOVwlLyDKP7FfzY0nPQ-0DdNM",
  authDomain: "tuition-management-001.firebaseapp.com",
  databaseURL:
    "https://tuition-management-001-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tuition-management-001",
  storageBucket: "tuition-management-001.firebasestorage.app",
  messagingSenderId: "483466981443",
  appId: "1:483466981443:web:e7e5b488a897da0be5a4f6",
  measurementId: "G-Q70RJY8NQ2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider, signInWithPopup };
