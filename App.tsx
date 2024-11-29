// import { StyleSheet } from "react-native";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./routes/AppNavigator";

export default function App() {
  return (
    <NativeBaseProvider>
      <AppNavigator />
    </NativeBaseProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// });
