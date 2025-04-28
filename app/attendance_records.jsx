import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import AttendanceCalender from "@/components/AttendanceCalender";

const attendance_records = () => {
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.calender}>
          <AttendanceCalender />
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
