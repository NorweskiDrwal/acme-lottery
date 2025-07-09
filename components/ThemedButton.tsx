import { Pressable, PressableProps, Text } from "react-native";

export interface ThemedButtonProps extends PressableProps {
  block?: boolean;
  fontColor?: string;
  variant?: "solid" | "outline";
}

export default function ThemedButton({
  style,
  variant,
  disabled,
  children,
  fontColor,
  block = false,
  ...props
}: React.PropsWithChildren<ThemedButtonProps>) {
  return (
    <Pressable
      disabled={disabled}
      style={(state) => [
        {
          display: "flex",
          borderRadius: 100,
          paddingVertical: 10,
          alignItems: "center",
          paddingHorizontal: 20,
          width: block ? "100%" : "auto",
          borderWidth: variant === "outline" ? 1 : 0,
          borderColor: variant === "outline" ? "#1080e8" : undefined,
          backgroundColor: disabled
            ? "#cfd3d3"
            : variant === "outline"
            ? "transparent"
            : "#1080e8",
        },
        typeof style === "function" ? style(state) : style,
      ]}
      {...props}
    >
      <Text
        style={{
          color: disabled
            ? "#687076"
            : variant === "outline"
            ? "#1080e8"
            : fontColor || "#ecedee",
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}
