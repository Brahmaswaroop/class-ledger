import { View, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import {
  uploadAttendanceByStudent,
  uploadAttendanceByDates,
} from "@/utils/DatabaseMethods";
import { useAppData } from "@/utils/AppDataContext";
import ToggleButton from "@/components/ToggleButton";
import ActionButton from "@/components/ActionButton";

const AttendanceRecords = () => {
  const {
    attendanceByDates: contextAttendanceByDates,
    attendanceByStudent: contextAttendanceByStudent,
    students: contextStudents,
    refresh,
    setRefresh,
  } = useAppData();

  const [attendanceByDates, setAttendanceByDates] = useState({});
  const [attendanceByStudent, setAttendanceByStudent] = useState({});
  const [calendarDates, setCalendarDates] = useState({});
  const [students, setStudents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [hasChanged, setHasChanged] = useState(false);

  // useEffect(() => {
  //   setRefresh((prev) => !prev);
  // }, []);

  useEffect(() => {
    setAttendanceByDates(contextAttendanceByDates || {});
    setAttendanceByStudent(contextAttendanceByStudent || {});
    setStudents(contextStudents || {});
    setCalendarDates(() => {
      const list = {};
      Object.keys(attendanceByDates).forEach((date) => {
        list[date] = {
          selected: true,
          selectedColor: "green",
        };
      });
      return list;
    });
  }, [refresh]);

  const toggleAttendance = (id, presentState) => {
    setAttendanceByStudent((prev) => {
      const dates = prev[id] || [];
      const updatedDates = presentState
        ? [...new Set([...dates, selectedDate])]
        : dates.filter((d) => d !== selectedDate);
      return { ...prev, [id]: updatedDates };
    });

    setAttendanceByDates((prev) => {
      const currentList = Array.isArray(prev[selectedDate])
        ? prev[selectedDate]
        : [];
      const updatedList = presentState
        ? [...new Set([...currentList, id])]
        : currentList.filter((studentId) => studentId !== id);
      return { ...prev, [selectedDate]: updatedList };
    });
    setHasChanged(true);
  };

  const handleSubmit = async () => {
    if (!Object.keys(attendanceByDates).length) return;
    if (!Object.keys(attendanceByStudent).length) return;

    await uploadAttendanceByDates(attendanceByDates);
    await uploadAttendanceByStudent(attendanceByStudent);
    console.log("Upload successful");

    setRefresh((prev) => !prev);
    setSelectedDate(null);
    setHasChanged(false);
  };

  return (
    <ScrollView style={styles.main_container}>
      <View style={styles.section_container}>
        <Calendar
          markedDates={calendarDates}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            setHasChanged(false);
          }}
        />
      </View>

      {selectedDate && (
        <View style={styles.section_container}>
          {Object.entries(students).map(([id, student]) => (
            <ToggleButton
              key={id}
              Id={id}
              title={student.name}
              currentState={(attendanceByStudent[id] || []).includes(
                selectedDate
              )}
              onPress={(presentState) => toggleAttendance(id, presentState)}
            />
          ))}

          <ActionButton
            title="Submit"
            handlePress={handleSubmit}
            disabled={!hasChanged}
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
