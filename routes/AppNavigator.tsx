import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, Text, View } from "react-native";
import LandingScreen from "../components/landing/LandingScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
const Stack = createNativeStackNavigator();
const AppNavigator: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="landingscreen"
        >
          <Stack.Screen name="landingscreen" component={LandingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default AppNavigator;
