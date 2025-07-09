import { FlatList, type ListRenderItemInfo, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import useListOfPlays from "@/hooks/useListOfPlays";
import { useRouter } from "expo-router";
import StyledButton from "./StyledButton";

function Item({ item }: ListRenderItemInfo<{ id: string; numbers: number[] }>) {
  const removePlay = useListOfPlays((s) => s.removePlay);

  return (
    <View
      style={{
        gap: 10,
        padding: 20,
        width: "100%",
        display: "flex",
        borderRadius: 20,
        flexDirection: "column",
        backgroundColor: "lightgrey",
      }}
    >
      <View
        style={{
          gap: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {item.numbers.map((num) => (
          <View
            key={item.id + num}
            style={{
              width: 50,
              height: 50,
              display: "flex",
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                fontSize: 26,
                fontWeight: "bold",
              }}
            >
              {num}
            </Text>
          </View>
        ))}
      </View>

      <StyledButton onPress={() => removePlay(item.id)}>
        delete row
      </StyledButton>
    </View>
  );
}

export default function ListOfPlays() {
  const router = useRouter();
  const plays = useListOfPlays((s) => s.plays);
  const isLimitReached = useListOfPlays((s) => s.isPlaysLimitReached);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <SafeAreaProvider>
        <SafeAreaView>
          <FlatList
            data={plays}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 10 }}
            renderItem={(props) => <Item {...props} />}
          />
        </SafeAreaView>

        <StyledButton
          block
          disabled={isLimitReached}
          onPress={() => router.navigate("/play")}
        >
          Add Play
        </StyledButton>
      </SafeAreaProvider>
    </View>
  );
}
