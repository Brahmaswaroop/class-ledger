import { View, Text, StyleSheet } from "react-native";
import { useRef } from "react";
import { useRouter } from "expo-router";
import { useInternetStatus } from "@/utils/useInternetStatus";
import { Button } from "react-native-paper";

export default function NoInternetScreen() {
  const isConnected = useInternetStatus();
  const router = useRouter();
  const hasNavigated = useRef(false);
  const retryConnection = () => {
    console.log(isConnected);

    if (isConnected && !hasNavigated.current) {
      hasNavigated.current = true;
      router.replace("/"); // Navigate to home
    } else if (!isConnected) {
      hasNavigated.current = false; // Reset so it can navigate again later
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🚫 No Internet Connection</Text>
      <Button onPress={() => retryConnection()}>retry</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, color: "red", fontWeight: "bold" },
});
