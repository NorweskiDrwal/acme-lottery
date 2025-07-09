import NumberPicker from "@/components/NumberPicker";
import { View } from "react-native";

export default function PlayScreen() {
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <NumberPicker />
    </View>
  );
}
