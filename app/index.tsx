import ListOfPlays from "@/components/ListOfPlays";
import StyledButton from "@/components/StyledButton";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View
      style={{
        padding: 20,
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <ListOfPlays />

      <StyledButton block onPress={() => router.navigate("/play")}>
        Add Play
      </StyledButton>
    </View>
  );
}
