import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AttendanceCalender from "@/components/AttendanceCalender";
import {
  fetchAttendanceDates,
  fetchStudentAttendances,
  uploadAttendanceDates,
  uploadStudentAttendances,
} from "@/components/DatabaseMethods";

const attendance_records = () => {
  const [attendanceDates, setAttendanceDates] = useState({});
  const [studentAttendance, setStudentAttendance] = useState({});

  const fetchData = async () => {
    const data1 = await fetchAttendanceDates();
    setAttendanceDates(data1 || {});
    const data2 = await fetchStudentAttendances();
    setStudentAttendance(data2 || {});
  };
  useEffect(() => {
    fetchData();
  }, []);

  const uploadData = async () => {
    if (Object.keys(attendanceDates).length > 0) {
      const result = await uploadAttendanceDates(attendanceDates);
      console.log("Upload result:", result);
    }
  };
  useEffect(() => {
    uploadData();
  }, [attendanceDates]);

  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.calender}>
          <AttendanceCalender
            attendanceMarkedDates={attendanceDates}
            handleDate={(date) => {
              setSelectedDate(date);
              setAttendanceDates((prev) => ({
                ...prev,
                [date]: {
                  selected: true,
                  selectedColor: "green",
                },
              }));
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default attendance_records;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#E8E6F3",
  },
  calender: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});
