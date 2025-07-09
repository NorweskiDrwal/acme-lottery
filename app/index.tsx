import { useCallback } from "react";
import { Alert, View } from "react-native";

import ListOfPlays from "@/components/ListOfPlays";
import ThemedButton from "@/components/ThemedButton";
import useListOfPlays from "@/hooks/useListOfPlays";

export default function Home() {
  const plays = useListOfPlays((s) => s.plays);

  const handlePurchase = useCallback(() => {
    let selection = "";
    plays.forEach((p) => (selection = `${selection}\n${p.numbers.toString()}`));
    Alert.alert(`Your plays are:`, selection);
  }, [plays]);

  return (
    <View
      style={{
        padding: 20,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <ListOfPlays />

      <ThemedButton block disabled={!plays?.length} onPress={handlePurchase}>
        Purchase
      </ThemedButton>
    </View>
  );
}
