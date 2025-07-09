import { useRouter } from "expo-router";
import {
  FlatList,
  type ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import useListOfPlays from "@/hooks/useListOfPlays";
import makeKey from "@/utils/makeKey";

import ThemedButton from "./ThemedButton";

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
    display: "flex",
    borderRadius: 20,
    backgroundColor: "#e5e7e8",
  },
  numbers_wrapper: {
    gap: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  number_wrapper: {
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  number_text: {
    fontSize: 26,
    fontWeight: "bold",
  },
});

function Item({
  item: { id, numbers },
}: ListRenderItemInfo<{ id: string; numbers: number[] }>) {
  const removePlay = useListOfPlays((s) => s.removePlay);

  return (
    <View style={styles.container}>
      <View style={styles.numbers_wrapper}>
        {numbers.map((num) => (
          <View key={makeKey(num)} style={styles.number_wrapper}>
            <Text style={styles.number_text}>{num}</Text>
          </View>
        ))}
      </View>

      <ThemedButton
        fontColor="#000"
        onPress={() => removePlay(id)}
        style={{ backgroundColor: "#cccdce" }}
      >
        delete
      </ThemedButton>
    </View>
  );
}

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
          renderItem={(props) => <Item {...props} />}
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
