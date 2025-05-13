import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import MenuButtons from "@/components/buttons/MenuButtons";

export default function App() {
  console.log("App component rendered");
  return (
    <>
      <ScrollView style={styles.container}>
        <Image
          source={require("@/assets/Class ledger.jpg")}
          style={styles.banner}
          resizeMode="cover"
        />
        <View style={styles.buttonsContainer}>
          <MenuButtons title="Attendance" link="/attendance_records" />
          <MenuButtons title="Student details" link="/student_records" />
          <MenuButtons title="Fees Ledger" link="fees_records" />
        </View>
      </ScrollView>
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
  },
  buttonsContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    padding: 10,
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
});
