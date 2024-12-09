import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "native-base";
import { SafeAreaView, Text } from "react-native";
import { RootStackParamList } from "../utils/routersRelated";
import { useEffect } from "react";
import axios from "axios";
import { API_URL, API_URL_PROD } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserProfile: React.FC = () => {
  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedToken = await AsyncStorage.getItem("tokenAuth");
      console.log("Stored token:", storedToken);

      if (!storedToken) {
        console.error("Token is missing. Please log in again.");
        return;
      }

      try {
        const response = await axios.get(`${API_URL_PROD}/auth/user-profile`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Response data:", response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>User Profile</Text>
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;
