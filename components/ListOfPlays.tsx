import { useRouter } from "expo-router";
import { FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import useListOfPlays from "@/hooks/useListOfPlays";

import ListOfPlaysItem from "./ListOfPlaysItem";
import ThemedButton from "./ThemedButton";

export default function ListOfPlays() {
  const router = useRouter();
  const plays = useListOfPlays((s) => s.plays);
  const isLimitReached = useListOfPlays((s) => s.isPlaysLimitReached);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <FlatList
          data={plays}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 10 }}
          renderItem={(props) => <ListOfPlaysItem {...props} />}
          ListFooterComponent={
            <ThemedButton
              block
              variant="outline"
              disabled={isLimitReached}
              onPress={() => router.navigate("/play")}
            >
              Add Play
            </ThemedButton>
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
