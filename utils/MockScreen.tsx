import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Button,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { RootStackParamList } from "./routersRelated";
import CustomButton from "../components/button/CustomButton";

type LandingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "mockscreen"
>;

const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;

const MocksScreen: React.FC<LandingScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={[styles.container, { marginTop: statusBarHeight }]}>
      <View style={styles.content}>
        <Text
          style={{
            color: "red",
            fontWeight: "700",
            textAlign: "left",
            marginBottom: 15,
          }}
        >
          [Dev Mode]
        </Text>
        <Text style={styles.header}>
          Use this screen to navigate to different components
        </Text>
        <CustomButton
          onPress={() => navigation.navigate("login")}
          title="Login"
        />
        <CustomButton
          title="Register"
          onPress={() => navigation.navigate("register")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    // alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
    color: "#333",
  },
});

export default MocksScreen;
