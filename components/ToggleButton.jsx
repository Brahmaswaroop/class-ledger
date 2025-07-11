import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function ToggleButton({ currentState, title, onPress }) {
  const handlePress = () => {
    onPress(!currentState);
  };
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.menuButtons,
          { backgroundColor: currentState ? "#03C03C" : "#ff5c5c" },
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
    marginTop: 8,
    marginBottom: 8,
    alignItems: "center",
    borderRadius: 10,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Arial",
    color: "#000",
  },
});
