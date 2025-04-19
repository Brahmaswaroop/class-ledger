import React, { useState } from "react";
import { View, Button, Platform, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Calender() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <View style={{ marginTop: 100, padding: 20 }}>
      {Platform.OS === "web" ? (
        <>
          <input
            type="date"
            value={date.toISOString().split("T")[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </>
      ) : (
        <>
          <Button title="Pick a Date" onPress={() => setShow(true)} />
          {show && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "calendar"}
              onChange={onChange}
            />
          )}
        </>
      )}

      <Text style={{ marginTop: 20 }}>
        Selected Date: {date.toDateString()}
      </Text>
    </View>
  );
}
