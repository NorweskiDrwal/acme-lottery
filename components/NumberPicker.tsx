import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { Alert, Pressable, Text, View } from "react-native";

import useListOfPlays from "@/hooks/useListOfPlays";
import useNumberPicker from "@/hooks/useNumberPicker";
import { makeKey, sequence } from "@/utils";

import SelectedNumbersDisplay from "./SelectedNumbersDisplay";
import StyledButton from "./StyledButton";

export default function NumberPicker() {
  const router = useRouter();

  const selectionLimit = useNumberPicker((s) => s.selectionLimit);
  const selectedNumbers = useNumberPicker((s) => s.selectedNumbers);
  const isAtLimit = useNumberPicker((s) => s.isSelectionLimitReached);
  const numberArrayLength = useNumberPicker((s) => s.numberArrayLength);
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

    if (!okToAdd) Alert.alert(`Numbers ${numbers} are already selected!`);
    else {
      addPlay(numbers);
      router.navigate("/");
    }

    clearSelectedNumbers();
  }, [plays, router, addPlay, selectedNumbers, clearSelectedNumbers]);

  return (
    <View
      style={{
        gap: 20,
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SelectedNumbersDisplay />

      <View
        style={{
          display: "flex",
          paddingHorizontal: 20,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            gap: 20,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            Pick {selectionLimit} numbers
          </Text>

          <View
            style={{
              gap: 10,
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            {Array.from<number>({ length: numberArrayLength }).map((_, i) => {
              const number = i + 1;
              const isSelected = selectedNumbers.has(number);
              return (
                <Pressable
                  key={makeKey(number)}
                  onPress={() => toggleNumber(number)}
                  style={{
                    width: 50,
                    height: 50,
                    borderWidth: 1,
                    display: "flex",
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isSelected ? "lightgrey" : "transparent",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 26,
                      fontWeight: "bold",
                      color: isAtLimit ? "grey" : "unset",
                    }}
                  >
                    {number}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <StyledButton block disabled={!isAtLimit} onPress={() => handlePlay()}>
          Play Numbers
        </StyledButton>
      </View>
    </View>
  );
}
