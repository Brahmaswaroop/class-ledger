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
import StudentButtons from "@/components/buttons/StudentButtons";
import ActionButton from "@/components/buttons/ActionButton";

const AttendanceRecords = () => {
  const [attendanceDates, setAttendanceDates] = useState({});
  const [studentAttendance, setStudentAttendance] = useState({});
  const [students, setStudents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchData = async () => {
    const data1 = await fetchAttendanceDates();
    setAttendanceDates(data1 || {});
    const data2 = await fetchStudentAttendances();
    setStudentAttendance(data2 || {});
    const studentsData = await fetchAllStudents();
    setStudents(studentsData || {});
  };

  useEffect(() => {
    fetchData();
  }, []);

  const uploadData = async () => {
    if (Object.keys(attendanceDates).length > 0) {
      const result = await uploadAttendanceDates(attendanceDates);
    }
    if (Object.keys(studentAttendance).length > 0) {
      const result = await uploadStudentAttendances(studentAttendance);
    }
  };

  return (
    <ScrollView style={styles.main_container}>
      <View style={styles.section_container}>
        <AttendanceCalender
          attendanceMarkedDates={attendanceDates}
          handleDate={(date) => {
            setSelectedDate(date);
          }}
        />
      </View>
      {selectedDate && (
        <View style={styles.section_container}>
          {Object.entries(students).map(([id, student]) => (
            <StudentButtons
              key={id}
              IdOfStudent={id}
              title={student.name}
              presentState={studentAttendance[id]?.includes(selectedDate)}
              onPress={(studentId, presentState) => {
                const dates = studentAttendance[studentId] || [];
                let updatedDates = dates;
                if (presentState) {
                  updatedDates = [...dates, selectedDate];
                } else {
                  updatedDates = dates.filter((date) => date !== selectedDate);
                }
                setStudentAttendance((prev) => ({
                  ...prev,
                  [studentId]: updatedDates,
                }));
              }}
            />
          ))}
          <ActionButton
            title={"Submit"}
            handlePress={() => {
              var hasAttendanceMarked = false;
              Object.values(studentAttendance).forEach((dates) => {
                if (dates?.includes(selectedDate)) {
                  hasAttendanceMarked = true;
                }
              });
              if (hasAttendanceMarked) {
                setAttendanceDates((prev) => ({
                  ...prev,
                  [selectedDate]: {
                    selected: true,
                    selectedColor: "green",
                  },
                }));
              } else {
                setAttendanceDates((prev) => ({
                  ...prev,
                  [selectedDate]: {},
                }));
              }
              uploadData();
              setSelectedDate(null);
            }}
          ></ActionButton>
        </View>
      )}
    </ScrollView>
  );
};

export default AttendanceRecords;

const styles = StyleSheet.create({
  main_container: {
    flex: "auto",
    padding: 10,
    backgroundColor: "#E8E6F3",
  },
  section_container: {
    flex: "auto",
    padding: 18,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});
