import { StyleSheet, Text, View } from "react-native";

import useNumberPicker from "@/hooks/useNumberPicker";
import makeKey from "@/utils/makeKey";

export default function SelectedNumbersDisplay() {
  const selectionLimit = useNumberPicker((s) => s.selectionLimit);
  const selectedNumbers = useNumberPicker((s) => s.selectedNumbers);

  return (
    <View style={styles.container}>
      {Array.from({ length: selectionLimit }).map((_, i) => {
        const number = [...selectedNumbers].at(i)!;
        const isSelected = selectedNumbers.has(number);

        return (
          <View
            key={makeKey(i)}
            style={[
              styles.wrapper,
              {
                backgroundColor: isSelected ? "white" : "rgba(33, 12, 44, 0.3)",
              },
            ]}
          >
            <Text style={styles.text}>{number}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    height: 100,
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#1080e8",
  },
  wrapper: {
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 26,
    fontWeight: "bold",
  },
});
