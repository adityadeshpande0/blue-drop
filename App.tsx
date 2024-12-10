// import { StyleSheet } from "react-native";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./routes/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <AppNavigator />
      </NativeBaseProvider>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// });
