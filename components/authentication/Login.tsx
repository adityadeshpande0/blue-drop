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
import { API_URL, API_URL_PROD } from "@env";
import useHandleToken from "../../hooks/useHandleToken";
import AsyncStorage from "@react-native-async-storage/async-storage";

type loginScreenProps = NativeStackScreenProps<RootStackParamList, "login">;

const Login: React.FC<loginScreenProps> = ({ navigation }) => {
  // const { token, storeToken, getToken } = useHandleToken();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    identifier: "",
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
      identifier: "",
      password: "",
    };

    if (!form.identifier.trim()) {
      newErrors.identifier = "Email/Phone Number is required";
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
        form.identifier
      ) &&
      !/^\+?[1-9]\d{1,14}$/.test(form.identifier)
    ) {
      newErrors.identifier = "Invalid email or phone number format";
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
      const response = await axios.post(`${API_URL_PROD}/login-user`, form, {
        headers: { "Content-Type": "application/json" },
      });

      const authToken = response.data.token;
      if (authToken) {
        await AsyncStorage.setItem("tokenAuth", authToken);
        const storedToken = await AsyncStorage.getItem("tokenAuth");
        console.log("test value", storedToken);
        Alert.alert("Success", "Login successful!");
        setForm({ identifier: "", password: "" });
        navigation.navigate("userprofile");
      } else {
        Alert.alert("Error", "Token not found in response.");
      }
    } catch (error: any) {
      console.error(error);
      const message =
        error.response?.data?.message || "The API is not integrated yet.";
      Alert.alert("Error", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={styles.title}>Log in to</Text>
          <Text style={styles.title2}>Blue Drop!</Text>
        </View>
        <CustomInputField
          label="Email or Phone Number"
          placeholder="Enter your email id or phone number"
          value={form.identifier}
          onChange={handleChange}
          name="identifier"
          keyboardType="email-address"
          errorMessage={errors.identifier}
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
          style={styles.loginButtonStyle}
          textStyle={{
            fontSize: 16,
            fontWeight: "600",
            color: "#00000",
            letterSpacing: 1,
          }}
          title={isSubmitting ? "Logging in..." : "Login"}
          onPress={handleSubmit}
          disabled={isSubmitting}
        />
        <View style={styles.registerPrompt}>
          <Text style={{ color: "#FFFFFF" }}>Don't have an account?</Text>
          <LinkButton
            title="Register"
            onPress={() => navigation.navigate("register")}
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
    backgroundColor: "#000000",
  },
  container: {
    flexGrow: 1,
    color: "white",
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 40,
  },
  title: {
    fontSize: 40,
    color: "white",
    marginBottom: 10,
    letterSpacing: 2,
  },
  title2: {
    fontSize: 40,
    color: "#64B5F6",
    marginBottom: 10,
    fontWeight: "600",
    letterSpacing: 4,
  },
  registerPrompt: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginButtonStyle: {
    marginVertical: 12,
    backgroundColor: "#64B5F6",
  },
});

export default Login;
