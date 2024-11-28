import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LandingScreen from "../components/landing/LandingScreen";
import { RootStackParamList } from "../utils/routersRelated";
import Login from "../components/authentication/Login";


const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="landingscreen"
        >
          <Stack.Screen name="landingscreen" component={LandingScreen} />
          <Stack.Screen name="login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
