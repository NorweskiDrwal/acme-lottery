import { Text, View } from "react-native";

export default function HeaderTitle({ title }: { title: string }) {
  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <Text style={{ color: "white" }}>{title}</Text>
    </View>
  );
}
