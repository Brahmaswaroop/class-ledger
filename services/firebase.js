import { initializeApp, getApps } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
  GoogleAuthProvider,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Auth with persistence only once
let auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
