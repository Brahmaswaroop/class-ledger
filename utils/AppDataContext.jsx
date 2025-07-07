// utils/AppDataContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  fetchAllData,
  fetchStudents,
  fetchAttendanceByDates,
  fetchAttendanceByStudent,
  fetchFeesByMonth,
  fetchStudentFees,
} from "@/utils/DatabaseMethods";

export const AppDataContext = createContext(null);

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return context;
};

export const AppDataProvider = ({ children }) => {
  const [allData, setAllData] = useState({});
  const [students, setStudents] = useState({});
  const [attendanceByDates, setAttendanceByDates] = useState({});
  const [attendanceByStudent, setAttendanceByStudent] = useState({});
  const [feesByMonth, setFeesByMonth] = useState({});
  const [studentFees, setStudentFees] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data1 = await fetchStudents();
        const data2 = await fetchAttendanceByDates();
        const data3 = await fetchAttendanceByStudent();
        const data4 = await fetchFeesByMonth();
        const data5 = await fetchStudentFees();
        const data6 = await fetchAllData();
        setStudents(data1);
        setAttendanceByDates(data2);
        setAttendanceByStudent(data3);
        setFeesByMonth(data4);
        setStudentFees(data5);
        setAllData(data6);
      } catch (err) {
        console.log("Error loading local data:", err);
      }
    })();
  }, [refresh]);

  // const setAll = async ({
  //   allData,
  //   students,
  //   attendanceByDates,
  //   attendanceByStudent,
  //   feesByMonth,
  //   studentFees,
  // }) => {
  //   const dataToStore = {
  //     students: students || {},
  //     feesByMonth: feesByMonth || {},
  //     attendanceByDates: attendanceByDates || {},
  //     attendanceByStudent: attendanceByStudent || {},
  //     studentFees: studentFees || {},
  //     allData: allData || {},
  //   };

  //   setStudents(dataToStore.students);
  //   setFeesByMonth(dataToStore.feesByMonth);
  //   setAttendanceByDates(dataToStore.attendanceByDates);
  //   setAttendanceByStudent(dataToStore.attendanceByStudent);
  //   setStudentFees(dataToStore.studentFees);
  //   setAllData(dataToStore.allData);

  //   try {
  //     await AsyncStorage.setItem("appData", JSON.stringify(dataToStore));
  //   } catch (err) {
  //     console.log("Error saving local data:", err);
  //   }
  // };

  return (
    <AppDataContext.Provider
      value={{
        students,
        feesByMonth,
        attendanceByDates,
        attendanceByStudent,
        studentFees,
        allData,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
