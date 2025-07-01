import { View, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import {
  uploadAttendanceDates,
  uploadStudentAttendances,
} from "@/utils/DatabaseMethods";
import { useAppData } from "@/utils/AppDataContext";
import ToggleButton from "@/components/ToggleButton";
import ActionButton from "@/components/ActionButton";

const AttendanceRecords = () => {
  const [attendanceDates, setAttendanceDates] = useState({});
  const [studentAttendance, setStudentAttendance] = useState({});
  const [students, setStudents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const {
    attendanceDates: contextDates,
    studentAttendances: contextAttendance,
    students: contextStudents,
  } = useAppData();

  useEffect(() => {
    setAttendanceDates(contextDates || {});
    setStudentAttendance(contextAttendance || {});
    setStudents(contextStudents || {});
  }, [contextAttendance, contextDates, contextStudents]);

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
        <Calendar
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={attendanceDates}
          markingType={"multi-dot"}
        />
      </View>

      {selectedDate && (
        <View style={styles.section_container}>
          {Object.entries(students).map(([id, student]) => (
            <ToggleButton
              key={id}
              Id={id}
              title={student.name}
              currentState={studentAttendance[id]?.includes(selectedDate)}
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
              const hasAttendanceMarked = Object.values(studentAttendance).some(
                (dates) => dates?.includes(selectedDate)
              );
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
          />
        </View>
      )}
    </ScrollView>
  );
};

export default AttendanceRecords;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#E8E6F3",
  },
  section_container: {
    flex: 1,
    padding: 18,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});
