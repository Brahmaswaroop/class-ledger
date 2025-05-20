// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD5lqiAu6YOVwlLyDKP7FfzY0nPQ-0DdNM",
  authDomain: "tuition-management-001.firebaseapp.com",
  databaseURL:
    "https://tuition-management-001-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tuition-management-001",
  storageBucket: "tuition-management-001.appspot.com",
  messagingSenderId: "483466981443",
  appId: "1:483466981443:web:e7e5b488a897da0be5a4f6",
  measurementId: "G-Q70RJY8NQ2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Proper persistence for React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider, signInWithPopup };
