import React from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

const AttendanceCalender = ({ attendanceMarkedDates, handleDate }) => {
  const handleDayPress = (day) => {
    const date = day.dateString;
    handleDate(date);
  };

  return (
    <View>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={attendanceMarkedDates}
      />
    </View>
  );
};

export default AttendanceCalender;
