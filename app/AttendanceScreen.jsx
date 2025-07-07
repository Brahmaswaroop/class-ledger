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
  const [attendanceBydates, setAttendanceByDates] = useState({});
  const [attendanceByStudents, setAttendanceByStudents] = useState({});
  const [students, setStudents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const {
    attendanceBydates: contextAttendanceBydates,
    attendanceByStudents: contextAttendanceByStudents,
    students: contextStudents,
  } = useAppData();
  useEffect(() => {
    setAttendanceByDates(contextAttendanceBydates || {});
    setAttendanceByStudents(contextAttendanceByStudents || {});
    setStudents(contextStudents || {});
  }, [contextAttendanceByStudents, contextAttendanceBydates, contextStudents]);
  const [hasChanged, setHasChanged] = useState(false);

  const uploadData = async () => {
    await uploadAttendanceByDates(attendanceBydates);
    await uploadAttendanceByStudent(attendanceByStudents);
  };

  return (
    <ScrollView style={styles.main_container}>
      <View style={styles.section_container}>
        <Calendar
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={attendanceBydates}
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
              currentState={(attendanceByStudents[id] || []).includes(
                selectedDate
              )}
              onPress={(studentId, presentState) => {
                setAttendanceByStudents((prev) => {
                  const dates = prev[studentId] || [];
                  const updatedDates = presentState
                    ? [...dates, selectedDate]
                    : dates.filter((d) => d !== selectedDate);

                  return {
                    ...prev,
                    [studentId]: updatedDates,
                  };
                });

                setAttendanceByDates((prev) => {
                  const currentList = prev[selectedDate] || [];
                  const updatedList = presentState
                    ? [...new Set([...currentList, studentId])]
                    : currentList.filter((id) => id !== studentId);

                  return {
                    ...prev,
                    [selectedDate]: updatedList,
                  };
                });
              }}
            />
          ))}

          <ActionButton
            title={"Submit"}
            handlePress={() => {
              const hasAttendanceMarked = Object.values(
                attendanceByStudents
              ).some((dates) => dates?.includes(selectedDate));
              if (hasAttendanceMarked) {
                setAttendanceByDates((prev) => ({
                  ...prev,
                  [selectedDate]: {
                    selected: true,
                    selectedColor: "green",
                  },
                }));
              } else {
                setAttendanceByDates((prev) => {
                  const updated = { ...prev };
                  delete updated[selectedDate];
                  return updated;
                });
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
