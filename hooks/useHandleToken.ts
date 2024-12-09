import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useHandleToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const initializeToken = async () => {
      const storedToken = await AsyncStorage.getItem("authToken");
      if (storedToken) setToken(storedToken);
    };
    initializeToken();
  }, []);

  const storeToken = async (tokenIdentifier: string, newToken: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(tokenIdentifier, newToken);
      setToken(newToken);
    } catch (error) {
      console.error("Error storing token:", error);
    }
  };

  const getToken = async (tokenIdentifier: string): Promise<string | null> => {
    try {
      const storedToken = await AsyncStorage.getItem(tokenIdentifier);
      setToken(storedToken);
      return storedToken;
    } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
    }
  };

  return { storeToken, token, getToken };
};

export default useHandleToken;
