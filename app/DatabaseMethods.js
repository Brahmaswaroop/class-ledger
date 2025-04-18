import { View, Text } from "react-native";
import React from "react";
import { db } from "./firebase";
import { ref, set, get, child, update, remove } from "firebase/database";

export const getStudents = async () => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, "students"));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No data available");
  }
};

export const getStudentById = async (studentId) => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `students/${studentId}`));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No data available");
  }
};
