import { db } from "./firebase";
import { ref, set, get, update, remove } from "firebase/database";

export const getAllData = async () => {
  const snapshot = await get(ref(db));
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
};

export const getStudents = async () => {
  const snapshot = await get(ref(db, "students"));
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
};

export const getStudentById = async (studentId) => {
  const snapshot = await get(ref(db, `students/${studentId}`));
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
};

export const addStudent = async (studentId, studentData) => {
  try {
    await set(ref(db, `students/${studentId}`), studentData);
    console.log("Student added successfully");
  } catch (error) {
    console.error("Error adding student:", error);
  }
};

export const updateStudent = async (studentId, studentData) => {
  try {
    await update(ref(db, `students/${studentId}`), studentData);
    console.log("Student updated successfully");
  } catch (error) {
    console.error("Error updating student:", error);
  }
};

export const deleteStudent = async (studentId) => {
  try {
    await remove(ref(db, `students/${studentId}`));
    console.log("Student deleted successfully");
  } catch (error) {
    console.error("Error deleting student:", error);
  }
};
