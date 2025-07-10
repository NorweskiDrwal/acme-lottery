import { Pressable, StyleSheet, Text } from "react-native";

export default function NumberPickerButton({
  number,
  onToggle,
  isSelected,
}: {
  number: number;
  isSelected: boolean;
  onToggle: (number: number) => void;
}) {
  return (
    <Pressable
      onPress={() => onToggle(number)}
      style={[
        styles.button,
        { backgroundColor: isSelected ? "#1080e8" : "transparent" },
      ]}
    >
      <Text
        style={[
          styles.button_text,
          { color: isSelected ? "#ecedee" : "unset" },
        ]}
      >
        {number}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderWidth: 1,
    display: "flex",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  button_text: {
    fontSize: 26,
    fontWeight: "bold",
  },
});
