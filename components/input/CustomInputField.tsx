import React from "react";
import { FormControl, Input, Text } from "native-base";

interface CustomInputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (field: string, value: string) => void;
  name: string;
  keyboardtype?: "default" | "email-address" | "phone-pad";
  secureTextEntry?: boolean;
  errorMessage?: string;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  keyboardtype = "default",
  secureTextEntry = false,
  errorMessage,
}) => {
  return (
    <FormControl isInvalid={!!errorMessage} mb={4}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => onChange(name, text)}
        keyboardType={keyboardtype}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
      {errorMessage ? (
        <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default CustomInputField;
