import { Stack } from "expo-router";

import HeaderTitle from "@/components/HeaderTitle";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#1080e8" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerTitle: () => <HeaderTitle title="Your Numbers" /> }}
      />

      <Stack.Screen
        name="play"
        options={{ headerTitle: () => <HeaderTitle title="Lucky Lotto" /> }}
      />
    </Stack>
  );
}
