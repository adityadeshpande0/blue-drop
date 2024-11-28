import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LandingScreen from "../components/landing/LandingScreen";
import { RootStackParamList } from "../utils/routersRelated";
import Login from "../components/authentication/Login";
import MocksScreen from "../utils/MockScreen";
import Register from "../components/authentication/Register";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="mockscreen"
        >
          <Stack.Screen name="mockscreen" component={MocksScreen} />
          <Stack.Screen name="landingscreen" component={LandingScreen} />
          <Stack.Screen
            options={{
              headerShown: true,
            }}
            name="login"
            component={Login}
          />
          <Stack.Screen
            options={{
              headerShown: true,
            }}
            name="register"
            component={Register}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
