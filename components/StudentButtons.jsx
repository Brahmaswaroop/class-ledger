import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

export default function StudentButtons({ IdOfStudent, title, onPress }) {
  const [studentId, setStudentId] = useState(null);
  const [presentState, setPresentState] = useState(false);
  useEffect(() => {
    setStudentId(IdOfStudent);
  }, []);
  const handlePress = () => {
    setPresentState((prev) => !prev);
    onPress(studentId, presentState);
  };
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.menuButtons,
          { backgroundColor: presentState ? "50C878" : "#FEFEFA" },
        ]}
        onPress={() => handlePress()}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  menuButtons: {
    padding: 18,
    marginBottom: 20,
    alignItems: "center",
    borderRadius: 10,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Arial",
    color: "#eeeeee",
  },
});
