import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { useRouter } from "expo-router";
import React from "react";

export function MenuButtons({ title, link }) {
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
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Arial",
    color: "#eeeeee",
  },
});
