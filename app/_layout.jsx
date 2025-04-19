import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#190087",
          },
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "500",
            fontFamily: "Arial",
          },
          contentStyle: {
            backgroundColor: "#E8E6F3",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "500",
              fontFamily: "Arial",
            },
          }}
        />
        <Stack.Screen
          name="attendance_manager"
          options={{ title: "Attendance Manager" }}
        />
      </Stack>
    </PaperProvider>
  );
}
