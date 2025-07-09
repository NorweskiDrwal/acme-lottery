import { Pressable, PressableProps, Text } from "react-native";

export interface StyledButtonProps extends PressableProps {
  color?: string;
  block?: boolean;
  variant?: "outline" | "solid";
}

export default function StyledButton({
  disabled,
  children,
  block = false,
  color = "red",
  variant = "solid",
  ...props
}: React.PropsWithChildren<StyledButtonProps>) {
  return (
    <Pressable
      disabled={disabled}
      style={{
        display: "flex",
        borderRadius: 100,
        paddingVertical: 10,
        alignItems: "center",
        paddingHorizontal: 20,
        width: block ? "100%" : "auto",
        borderWidth: variant === "outline" ? 1 : 0,
        backgroundColor: disabled
          ? "lightgrey"
          : variant === "outline"
          ? "transparent"
          : color,
      }}
      {...props}
    >
      <Text>{children}</Text>
    </Pressable>
  );
}
