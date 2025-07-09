import NumberPicker from "@/components/NumberPicker";
import { StyleSheet, View } from "react-native";

export default function PlayScreen() {
  return (
    <View style={styles.container}>
      <NumberPicker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
