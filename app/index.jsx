import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import NavigationButton from "@/components/buttons/MenuButtons";
import { useInternetStatus } from "@/components/useInternetStatus";
import { Redirect } from "expo-router";

export default function App() {
  const isConnected = useInternetStatus();
  if (!isConnected) {
    return <Redirect href="/NoInternetScreen" />;
  }
  console.log("App component rendered");

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/class_ledger.jpg")}
        style={styles.banner}
        resizeMode="cover"
      />
      <View style={styles.buttonsContainer}>
        <NavigationButton title="Attendance" link="/AttendanceScreen" />
        <NavigationButton title="Student details" link="/StudentRecordScreen" />
        <NavigationButton title="Fees Ledger" link="/FeesRecordScreen" />
      </View>
    </ScrollView>
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
