// utils/AppDataContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  fetchAllData,
  fetchAllStudents,
  fetchAttendanceDates,
  fetchStudentAttendances,
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
  const [attendanceDates, setAttendanceDates] = useState({});
  const [studentAttendance, setStudentAttendance] = useState({});
  const [feesByMonth, setFeesByMonth] = useState({});
  const [studentFees, setStudentFees] = useState({});

  // Load from AsyncStorage on app start
  useEffect(() => {
    (async () => {
      try {
        // const stored = await AsyncStorage.getItem("appData");
        // if (stored) {
        //   const parsed = JSON.parse(stored);
        //   setStudents(parsed.students || {});
        //   setFeesByMonth(parsed.feesByMonth || {});
        //   setStudentAttendance(parsed.studentAttendance || {});
        //   setStudentFees(parsed.studentFees || {});
        //   setAllData(parsed.allData || {});
        // }
        {
          const data1 = await fetchAllStudents();
          const data2 = await fetchFeesByMonth();
          const data3 = await fetchStudentAttendances();
          const data4 = await fetchStudentFees();
          const data5 = await fetchAllData();
          const data6 = await fetchAttendanceDates();
          setStudents(data1);
          setFeesByMonth(data2);
          setStudentAttendance(data3);
          setStudentFees(data4);
          setAllData(data5);
          setAttendanceDates(data6);
        }
      } catch (err) {
        console.log("Error loading local data:", err);
      }
    })();
  }, []);

  const setAll = async ({
    allData,
    students,
    attendanceDates,
    studentAttendance,
    feesByMonth,
    studentFees,
  }) => {
    const dataToStore = {
      students: students || {},
      feesByMonth: feesByMonth || {},
      attendanceDates: attendanceDates || {},
      studentAttendance: studentAttendance || {},
      studentFees: studentFees || {},
      allData: allData || {},
    };

    setStudents(dataToStore.students);
    setFeesByMonth(dataToStore.feesByMonth);
    setAttendanceDates(dataToStore.attendanceDates);
    setStudentAttendance(dataToStore.studentAttendance);
    setStudentFees(dataToStore.studentFees);
    setAllData(dataToStore.allData);

    try {
      await AsyncStorage.setItem("appData", JSON.stringify(dataToStore));
    } catch (err) {
      console.log("Error saving local data:", err);
    }
  };

  return (
    <AppDataContext.Provider
      value={{
        students,
        feesByMonth,
        attendanceDates,
        studentAttendance,
        studentFees,
        allData,
        setAll,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
