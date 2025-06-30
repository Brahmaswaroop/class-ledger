import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { AppDataProvider } from "@/utils/AppDataContext";

export default function RootLayout() {
  return (
    <AppDataProvider>
      <PaperProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#190087" },
            headerTitleAlign: "center",
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "500",
              fontFamily: "Arial",
            },
            contentStyle: { backgroundColor: "#E8E6F3" },
          }}
        />
      </PaperProvider>
    </AppDataProvider>
  );
}
