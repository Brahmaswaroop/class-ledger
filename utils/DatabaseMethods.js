import { db } from "@/services/firebase";
import { ref, set, get } from "firebase/database";

const fetchAllData = async () => {
  const snapshot = await get(ref(db));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No data available");
    return null;
  }
};

const studentRef = (id) => ref(db, `Students/${id}`);

const fetchStudents = async (id = "") => {
  const snapshot = await get(studentRef(id));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No students available");
    return null;
  }
};

const uploadStudents = async (data) => {
  try {
    await set(ref(db, "Students/"), data);
    return 1;
  } catch (error) {
    console.error("Error setting all students:", error);
    return null;
  }
};

const attendanceByDatesRef = ref(db, "Attendance/AttendanceByDates");

const fetchAttendanceByDates = async () => {
  const snapshot = await get(attendanceByDatesRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No attendance dates available");
    return null;
  }
};

const uploadAttendanceByDates = async (data) => {
  try {
    await set(attendanceByDatesRef, data);
    return 1;
  } catch (error) {
    console.error("Error setting attendance dates:", error);
    return null;
  }
};

const AttendanceByStudentRef = ref(db, "Attendance/AttendanceByStudent");

const fetchAttendanceByStudent = async () => {
  const snapshot = await get(AttendanceByStudentRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No AttendancesByStudent available");
    return null;
  }
};

const uploadAttendanceByStudent = async (data) => {
  try {
    await set(AttendanceByStudentRef, data);
    return 1;
  } catch (error) {
    console.error("Error setting attendance:", error);
    return null;
  }
};

const feesByMonthRef = ref(db, "Fees/feesByMonth");

const fetchFeesByMonth = async () => {
  const snapshot = await get(feesByMonthRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No months with fee available");
    return null;
  }
};

const uploadFeesByMonth = async (data) => {
  try {
    await set(feesByMonthRef, data);
    return 1;
  } catch (error) {
    console.error("Error setting months with fee:", error);
    return null;
  }
};

const studentFeesRef = ref(db, "Fees/StudentFees");

const fetchStudentFees = async () => {
  const snapshot = await get(studentFeesRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No student fee data available");
    return null;
  }
};

const uploadStudentFees = async (data) => {
  try {
    await set(studentFeesRef, data);
    return 1;
  } catch (error) {
    console.error("Error setting student fee data:", error);
    return null;
  }
};

export {
  fetchAllData,
  fetchStudents,
  uploadStudents,
  fetchAttendanceByDates,
  uploadAttendanceByDates,
  fetchAttendanceByStudent,
  uploadAttendanceByStudent,
  fetchFeesByMonth,
  uploadFeesByMonth,
  fetchStudentFees,
  uploadStudentFees,
};
