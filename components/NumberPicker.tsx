import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import useListOfPlays from "@/hooks/useListOfPlays";
import useNumberPicker from "@/hooks/useNumberPicker";
import makeKey from "@/utils/makeKey";
import sequence from "@/utils/toSequence";

import NumberPickerButton from "./NumberPickerButton";
import SelectedNumbersDisplay from "./SelectedNumbersDisplay";
import ThemedButton from "./ThemedButton";

export default function NumberPicker() {
  const router = useRouter();

  const selectionLimit = useNumberPicker((s) => s.selectionLimit);
  const selectedNumbers = useNumberPicker((s) => s.selectedNumbers);
  const isAtLimit = useNumberPicker((s) => s.isSelectionLimitReached);
  const selectionSize = useNumberPicker((s) => s.selectionSize);
  const setSelectedNumber = useNumberPicker((s) => s.setSelectedNumber);
  const unsetSelectedNumber = useNumberPicker((s) => s.unsetSelectedNumber);
  const clearSelectedNumbers = useNumberPicker((s) => s.clearSelectedNumbers);

  useEffect(() => () => clearSelectedNumbers(), [clearSelectedNumbers]);

  const toggleNumber = useCallback(
    (num: number) => {
      if (selectedNumbers.has(num)) unsetSelectedNumber(num);
      else setSelectedNumber(num);
    },
    [selectedNumbers, setSelectedNumber, unsetSelectedNumber]
  );

  const plays = useListOfPlays((s) => s.plays);
  const addPlay = useListOfPlays((s) => s.addPlay);
  const handlePlay = useCallback(() => {
    const numbers = [...selectedNumbers];
    let okToAdd = true;

    for (let play of plays) {
      if (sequence(numbers) === sequence(play.numbers)) okToAdd = false;
    }

    clearSelectedNumbers();
    if (!okToAdd) Alert.alert(`Numbers ${numbers} are already selected!`);
    else {
      addPlay(numbers);
      router.navigate("/");
    }
  }, [plays, router, addPlay, selectedNumbers, clearSelectedNumbers]);

  return (
    <View style={styles.container}>
      <SelectedNumbersDisplay />

      <View style={styles.wrapper}>
        <View style={styles.picker}>
          <Text style={styles.picker_heading}>
            Pick {selectionLimit} numbers
          </Text>

          <View style={styles.picker_matrix}>
            {Array.from<number>({ length: selectionSize }).map((_, i) => {
              const number = i + 1;
              return (
                <NumberPickerButton
                  number={number}
                  key={makeKey(number)}
                  onToggle={toggleNumber}
                  isSelected={selectedNumbers.has(number)}
                />
              );
            })}
          </View>
        </View>

        <ThemedButton block disabled={!isAtLimit} onPress={handlePlay}>
          Play Numbers
        </ThemedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
  },
  wrapper: {
    gap: 20,
    paddingHorizontal: 20,
  },
  picker: {
    gap: 20,
    display: "flex",
    alignItems: "center",
  },
  picker_heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  picker_matrix: {
    gap: 10,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
