import { Button } from "native-base";
import React from "react";
import { StyleSheet, ViewStyle, TextStyle } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: string;
  disabled?: boolean;
  onPressIn?: () => void;
  onPressOut?: () => void;
  size: string;
};

const LinkButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  style = {},
  textStyle = {},
  disabled = false,
  onPressIn,
  variant,
  onPressOut,
  size,
}) => {
  return (
    <Button
      style={[styles.button, style, disabled && styles.disabledButton]}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
      variant={variant}
      size={size}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: { backgroundColor: "" },
  disabledButton: {
    backgroundColor: "#bdbdbd",
  },
});

export default LinkButton;
