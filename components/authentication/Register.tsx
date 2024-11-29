import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import axios from "axios";
import CustomButton from "../button/CustomButton";
import CustomInputField from "../input/CustomInputField";

const Register: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    };

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(form.email)
    ) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!form.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(form.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
      isValid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://api.example.com/register",
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      Alert.alert("Success", "User registered successfully!");
      setForm({ name: "", email: "", phoneNumber: "", password: "" });
    } catch (error: any) {
      console.error(error);
      const message =
        error.response?.data?.message || "The API is Not Integrated yet.";
      Alert.alert("Error", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Blue Drop!</Text>

      {/* Name Field */}
      <CustomInputField
        label="Name"
        placeholder="Enter your name"
        value={form.name}
        onChange={(field, value) => handleChange("name", value)}
        name="name"
        errorMessage={errors.name}
      />

      {/* Email Field */}
      <CustomInputField
        label="Email"
        placeholder="Enter your email id"
        value={form.email}
        onChange={(field, value) => handleChange("email", value)}
        keyboardtype="email-address"
        name="email"
        errorMessage={errors.email}
      />

      <CustomInputField
        label="Phone Number"
        placeholder="Enter your phone number"
        value={form.phoneNumber}
        onChange={(field, value) => handleChange("phoneNumber", value)}
        keyboardtype="phone-pad"
        name="phoneNumber"
        errorMessage={errors.phoneNumber}
      />
      <CustomInputField
        label="Password"
        placeholder="Enter your password"
        value={form.password}
        onChange={(field, value) => handleChange("password", value)}
        name="password"
        errorMessage={errors.password}
      />
      <CustomButton
        title={isSubmitting ? "Registering..." : "Register"}
        onPress={handleSubmit}
        disabled={isSubmitting}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default Register;
