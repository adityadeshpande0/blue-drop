import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import CustomButton from "../button/CustomButton";
import CustomInputField from "../input/CustomInputField";
import LinkButton from "../button/LinkButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/routersRelated";
import { API_URL } from "@env";
type registerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "register"
>;

const Register: React.FC<registerScreenProps> = ({ navigation }) => {
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
      const response = await axios.post(`${API_URL}/register-user`, form, {
        headers: { "Content-Type": "application/json" },
      });
      Alert.alert(response.data);
      setForm({ name: "", email: "", phoneNumber: "", password: "" });
    } catch (error: any) {
      console.error(error);
      const message =
        error.response?.data?.message ||
        "Something went wrong. Try again later !";
      Alert.alert("Error", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome to Blue Drop !</Text>
        <Text style={styles.subTitle}>Register here to continue !</Text>
        <CustomInputField
          label="Name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          name="name"
          errorMessage={errors.name}
        />
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
          label="Phone Number"
          placeholder="Enter your phone number"
          value={form.phoneNumber}
          onChange={handleChange}
          name="phoneNumber"
          keyboardType="phone-pad"
          errorMessage={errors.phoneNumber}
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
          style={styles.registerButtonStyles}
          title={isSubmitting ? "Registering..." : "Register"}
          onPress={handleSubmit}
          disabled={isSubmitting}
        />
        <View style={styles.forgotView}>
          <Text>Already have account ?</Text>
          <LinkButton
            title="Login"
            onPress={() => navigation.navigate("login")}
            size="sm"
            variant="link"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    display: "flex",
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  registerButtonStyles: {
    marginVertical: 12,
  },
  forgotView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
});

export default Register;
