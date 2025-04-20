import { db } from "./firebase";
import { ref, set, get, update, remove } from "firebase/database";

const studentRef = (id = "") => ref(db, `Students/${id}`);

export const getAllData = async () => {
  const snapshot = await get(ref(db));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No data available");
    return null;
  }
};

export const getStudents = async () => {
  const snapshot = await get(studentRef());
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No data available");
    return null;
  }
};

export const getStudentById = async (studentId) => {
  const snapshot = await get(studentRef(studentId));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No data available");
    return null;
  }
};

export const addStudent = async (studentData) => {
  try {
    const existingStudents = await getStudents();
    const studentCount = existingStudents
      ? Object.keys(existingStudents).length
      : 0;
    const studentId = `STD${String(studentCount + 1).padStart(3, "0")}`;
    await set(studentRef(studentId), studentData);
    return 1;
  } catch (error) {
    console.error("Error adding student:", error);
    return null;
  }
};

export const updateStudent = async (studentId, studentData) => {
  try {
    await update(studentRef(studentId), studentData);
    return 1;
  } catch (error) {
    console.error("Error updating student:", error);
    return null;
  }
};

export const deleteStudent = async (studentId) => {
  try {
    await remove(studentRef(studentId));
    return 1;
  } catch (error) {
    console.error("Error deleting student:", error);
    return null;
  }
};
