import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import React from "react";

export default function NavigationButton({ title, link }) {
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity
        style={styles.menuButtons}
        onPress={() => router.push(link)}
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
