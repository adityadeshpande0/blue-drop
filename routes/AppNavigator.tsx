import React from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootStackParamList } from "../utils/routersRelated";
import Login from "../components/authentication/Login";
import MocksScreen from "../utils/MockScreen";
import Register from "../components/authentication/Register";
import Home from "../screens/Home";
import LandingScreen from "../screens/LandingScreen";
import UserProfile from "../screens/UserProfile";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

  return (
    <SafeAreaProvider>
      <View style={[styles.container, { marginTop: statusBarHeight }]}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: Platform.OS === "ios",
            }}
            initialRouteName="mockscreen"
          >
            <Stack.Screen name="mockscreen" component={MocksScreen} />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="login"
              component={Login}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="register"
              component={Register}
            />
            <Stack.Screen
              options={{ headerShown: true }}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="landing"
              component={LandingScreen}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                title: "Profile",
                headerBackTitle: "back",
              }}
              name="userprofile"
              component={UserProfile}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppNavigator;
