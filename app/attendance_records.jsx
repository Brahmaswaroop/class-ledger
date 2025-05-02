import { View, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AttendanceCalender from "@/components/AttendanceCalender";
import {
  fetchAllStudents,
  fetchAttendanceDates,
  fetchStudentAttendances,
  uploadAttendanceDates,
  uploadStudentAttendances,
} from "@/components/DatabaseMethods";
import StudentButtons from "@/components/StudentButtons";

const attendance_records = () => {
  const [attendanceDates, setAttendanceDates] = useState({});
  const [studentAttendance, setStudentAttendance] = useState({});
  const [students, setStudents] = useState({});

  const fetchData = async () => {
    const data1 = await fetchAttendanceDates();
    setAttendanceDates(data1 || {});
    const data2 = await fetchStudentAttendances();
    setStudentAttendance(data2 || {});
    const students = await fetchAllStudents();
    setStudents(students || {});
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
        <View style={styles.container}>
          {Object.entries(students).map(([id, student]) => (
            <StudentButtons
              IdOfStudent={id}
              title={student.name}
              onPress={(studentId, presentState) => {
                if (presentState) {
                  setStudentAttendance((prev) => {
                    dates = prev[studentId] || []
                    updatedDates = presentState ? [...dates, selectedDate] :
                  })
                } else {
                  studentAttendance[id].remove(selectedDate);
                }
              }}
            ></StudentButtons>
          ))}
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
