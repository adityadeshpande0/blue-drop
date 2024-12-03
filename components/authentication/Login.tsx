import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios";
import { RootStackParamList } from "..//..//utils/routersRelated";
import CustomButton from "../button/CustomButton";
import CustomInputField from "../input/CustomInputField";
import LinkButton from "../button/LinkButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type loginScreenProps =NativeStackScreenProps<
  RootStackParamList,
  "login"
>

const Login: React.FC<loginScreenProps> = ({navigation}) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
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
      email: "",
      password: "",
    };

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(form.email)
    ) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post("https://api.example.com/login", form, {
        headers: { "Content-Type": "application/json" },
      });
      Alert.alert("Success", "Login successful!");
      setForm({ email: "", password: "" });
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome to Blue Drop!</Text>
        <Text style={styles.subTitle}>Register here to continue !</Text>
        <CustomInputField
          label="Email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          name="email"
          keyboardType="email-address"
          errorMessage={errors.email}
        />
        <CustomInputField
          label="Password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          name="password"
          secureTextEntry
          errorMessage={errors.password}
        />
        <CustomButton
          style={styles.loginButtonStyles}
          title={isSubmitting ? "Logging in..." : "Login"}
          onPress={handleSubmit}
          disabled={isSubmitting}
        />
        <View style={styles.registerPrompt}>
          <Text>Don't have an account?</Text>
          <LinkButton
            title="Register"
            onPress={() => navigation.navigate('register')}
            size="sm"
            variant="link"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loginButtonStyles: {
    marginVertical: 12,
  },
  registerPrompt: {
    flexDirection: "row",
    alignItems: "center",
  },
  subTitle:{
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  }
});

export default Login;
