import { db } from "./firebase";
import { ref, set, get } from "firebase/database";

export const fetchAllData = async () => {
  const snapshot = await get(ref(db));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No data available");
    return null;
  }
};

const studentRef = (id = "") => ref(db, `Students/${id}`);

export const fetchAllStudents = async () => {
  const snapshot = await get(studentRef());
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No students available");
    return null;
  }
};

export const uploadAllStudents = async (data) => {
  try {
    await set(ref(db, "Students/"), data);
    return 1;
  } catch (error) {
    console.error("Error setting all students:", error);
    return null;
  }
};

const attendanceDatesRef = ref(db, "Attendance/MarkedDates");

export const fetchAttendanceDates = async () => {
  const snapshot = await get(attendanceDatesRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No attendance dates available");
    return null;
  }
};

export const uploadAttendanceDates = async (data) => {
  try {
    await set(attendanceDatesRef, data);
    return 1;
  } catch (error) {
    console.error("Error setting attendance dates:", error);
    return null;
  }
};

const studentAttendanceRef = ref(db, "Attendance/StudentAttendance");

export const fetchStudentAttendances = async () => {
  const snapshot = await get(studentAttendanceRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No student attendance available");
    return null;
  }
};

export const uploadStudentAttendances = async (data) => {
  try {
    await set(studentAttendanceRef, data);
    return 1;
  } catch (error) {
    console.error("Error setting attendance:", error);
    return null;
  }
};

const feesByMonthRef = ref(db, "Fees/feesByMonth");

export const fetchFeesByMonth = async () => {
  const snapshot = await get(feesByMonthRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No months with fee available");
    return null;
  }
};

export const uploadFeesByMonth = async (data) => {
  try {
    await set(feesByMonthRef, data);
    return 1;
  } catch (error) {
    console.error("Error setting months with fee:", error);
    return null;
  }
};

const studentFeesRef = ref(db, "Fees/StudentFees");

export const fetchStudentFees = async () => {
  const snapshot = await get(studentFeesRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No student fee data available");
    return null;
  }
};

export const uploadStudentFees = async (data) => {
  try {
    await set(studentFeesRef, data);
    return 1;
  } catch (error) {
    console.error("Error setting student fee data:", error);
    return null;
  }
};
