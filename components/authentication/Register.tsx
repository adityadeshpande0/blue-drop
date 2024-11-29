import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios";

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
    setErrors({ ...errors, [field]: "" }); // Clear errors on input change
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
        "",
        form,
        { headers: { "Content-Type": "application/json" } }
      );
      Alert.alert("Success", "User registered successfully!");
      setForm({ name: "", email: "", phoneNumber: "", password: "" }); // Reset form
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

      <View style={styles.formField}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={[styles.input, errors.name ? styles.errorInput : null]}
          placeholder="Enter your name"
          value={form.name}
          onChangeText={(value) => handleChange("name", value)}
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
      </View>

      <View style={styles.formField}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, errors.email ? styles.errorInput : null]}
          placeholder="Enter your email"
          value={form.email}
          onChangeText={(value) => handleChange("email", value)}
          keyboardType="email-address"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      </View>

      <View style={styles.formField}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={[styles.input, errors.phoneNumber ? styles.errorInput : null]}
          placeholder="Enter your phone number"
          value={form.phoneNumber}
          onChangeText={(value) => handleChange("phoneNumber", value)}
          keyboardType="phone-pad"
        />
        {errors.phoneNumber ? (
          <Text style={styles.errorText}>{errors.phoneNumber}</Text>
        ) : null}
      </View>

      <View style={styles.formField}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[styles.input, errors.password ? styles.errorInput : null]}
          placeholder="Enter your password"
          value={form.password}
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry
        />
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}
      </View>

      <Button
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
  formField: {
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

export default Register;
