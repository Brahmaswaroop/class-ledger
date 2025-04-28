import React, { useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

const AttendanceCalendar = (attendanceMarkedDates, handleDate) => {
  const [markedDates, setMarkedDates] = useState({});
  setMarkedDates(attendanceMarkedDates);
  for (let index = 0; index < Object.keys(markedDates).length; index++) {
    date = Object.keys(markedDates).at(index);
    setMarkedDates((prev) => ({
      ...prev,
      [date]: {
        selected: true,
        selectedColor: "green", // Change color if needed
      },
    }));
  }

  const handleDayPress = (day) => {
    const date = day.dateString;
    handleDate(date);
  };

  return (
    <View>
      <Calendar onDayPress={handleDayPress} markedDates={markedDates} />
    </View>
  );
};

export default AttendanceCalendar;
