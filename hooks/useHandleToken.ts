import { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const useHandleToken = () => {
  const [token, setToken] = useState<string | null>(null);

  const storeToken = async (
    tokenIndentifier: string,
    newToken: string
  ): Promise<void> => {
    try {
      await AsyncStorage.setItem(tokenIndentifier, newToken);
      setToken(newToken);
    } catch (error) {
      console.error("Error storing token:", error);
    }
  };

  const getToken = async (
    tokenIndentifier: string,
    storedTokenValue: string
  ): Promise<string | null> => {
    try {
      const storedToken = await AsyncStorage.getItem(tokenIndentifier);
      setToken(storedTokenValue);
      return storedToken;
    } catch (error) {
      return null;
    }
  };

  return { storeToken, token, getToken };
};

export default useHandleToken;
