import React, { useRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface CustomInputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (field: string, value: string) => void;
  name: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  secureTextEntry?: boolean;
  errorMessage?: string;
  placeholderTextColor?: string; // New Prop
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  keyboardType = "default",
  secureTextEntry = false,
  errorMessage,
  placeholderTextColor = "#999", // Default color
}) => {
  const inputRef = useRef<TextInput | null>(null);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        ref={inputRef}
        style={[styles.input, errorMessage ? styles.inputError : null]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor} // Apply placeholder text color
        value={value}
        onChangeText={(text) => onChange(name, text)}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    color:'#fff'
  },
  inputError: {
    borderColor: "#f00",
  },
  errorText: {
    color: "#f00",
    fontSize: 12,
    marginTop: 4,
  },
});

export default CustomInputField;
