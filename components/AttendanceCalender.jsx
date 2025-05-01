import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

const AttendanceCalender = ({ attendanceMarkedDates, handleDate }) => {
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const formatted = {};
    Object.keys(attendanceMarkedDates).forEach((date) => {
      formatted[date] = {
        selected: true,
        selectedColor: "green", // Change color if needed
      };
    });
    setMarkedDates(formatted);
  }, [markedDates]);

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

export default AttendanceCalender;
