import { Menu, Button } from "react-native-paper";
import React, { useState } from "react";
import { Platform, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default DateSelector = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  let newDate = new Date();
  return (
    <View>
      {Platform.OS === "android" && (
        <>
          <Button
            style={{ marginBottom: 10 }}
            mode="contained"
            onPress={() => setVisible(true)}
          >
            {selected || "Select Date"}
          </Button>
          {visible && (
            <DateTimePicker
              value={selected ? new Date(selected) : newDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setVisible(false);
                if (date) {
                  setSelected(date.toLocaleDateString());
                }
              }}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = {
  menu: {
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  button: {
    backgroundColor: "#004E64",
    color: "#004E64",
    fontSize: 16,
  },
};
