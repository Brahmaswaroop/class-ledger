import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MenuButtons } from "@/components/MenuButtons";

export default function App() {
  console.log("App component rendered");
  return (
    <>
      <View style={styles.container}>
        <Image source={require("../assets/banner.jpg")} style={styles.banner} />
        <View style={styles.buttonsContainer}>
          <MenuButtons title="Attendance" link="/attendance_manager" />
          <MenuButtons title="Student details" link="/attendance" />
          <MenuButtons title="Fees Ledger" link="/userForm" />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  banner: {
    marginTop: 10,
    marginBottom: 10,
    height: 200,
    width: "100%",
    borderRadius: 20,
    resizeMode: "cover",
  },
  buttonsContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    padding: 10,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
});
