import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function MenuButtons({ title, handlePress }) {
  return (
    <View>
      <TouchableOpacity
        style={styles.menuButtons}
        onPress={() => {
          handlePress();
        }}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  menuButtons: {
    padding: 18,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#00AEEF",
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
