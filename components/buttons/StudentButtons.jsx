import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function StudentButtons({
  IdOfStudent,
  presentState = false,
  title,
  onPress,
}) {
  const handlePress = () => {
    const newPresentState = !presentState;
    onPress(IdOfStudent, newPresentState);
  };
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.menuButtons,
          { backgroundColor: presentState ? "#03C03C" : "#FEFEFA" },
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
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 10,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Arial",
    color: "#000",
  },
});
