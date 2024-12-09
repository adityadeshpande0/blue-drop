import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "native-base";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import { RootStackParamList } from "../utils/routersRelated";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, API_URL_PROD } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
type UserProfileData = {
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
};
const UserProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedToken = await AsyncStorage.getItem("tokenAuth");
      console.log("Stored token:", storedToken);

      if (!storedToken) {
        console.error("Token is missing. Please log in again.");
        return;
      }

      try {
        const response = await axios.get(`${API_URL_PROD}/user-profile`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Response data:", response.data);
        setUserProfile(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {userProfile ? (
        <View style={styles.profileContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{userProfile.name}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userProfile.email}</Text>

          {userProfile.phoneNumber && (
            <>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{userProfile.phoneNumber}</Text>
            </>
          )}

          {userProfile.address && (
            <>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{userProfile.address}</Text>
            </>
          )}
        </View>
      ) : (
        <Text style={styles.errorText}>User profile not available.</Text>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  profileContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: "90%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
export default UserProfile;
