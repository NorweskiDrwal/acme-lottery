import { Text, View } from "react-native";

import useNumberPicker from "@/hooks/useNumberPicker";
import { makeKey } from "@/utils";

export default function SelectedNumbersDisplay() {
  const selectionLimit = useNumberPicker((s) => s.selectionLimit);
  const selectedNumbers = useNumberPicker((s) => s.selectedNumbers);

  return (
    <View
      style={{
        gap: 10,
        height: 100,
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#f4511e",
      }}
    >
      {Array.from({ length: selectionLimit }).map((_, i) => {
        const number = [...selectedNumbers].at(i)!;
        const isSelected = selectedNumbers.has(number);

        return (
          <View
            key={makeKey(i)}
            style={{
              width: 50,
              height: 50,
              borderWidth: 1,
              display: "flex",
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isSelected ? "white" : "rgba(33, 12, 44, 0.8)",
            }}
          >
            <Text
              style={{
                fontSize: 26,
                fontWeight: "bold",
              }}
            >
              {number}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
