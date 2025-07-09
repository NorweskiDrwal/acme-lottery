import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => (
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ color: "white" }}>Your Numbers</Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="play"
        options={{
          headerTitle: () => (
            <View style={{ display: "flex", alignItems: "center" }}>
              <Text style={{ color: "white" }}>Lucky Lotto</Text>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
