import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

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
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, errorMessage ? styles.errorInput : null]}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => onChange(name, text)}
        keyboardType={keyboardtype}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default CustomInputField;
