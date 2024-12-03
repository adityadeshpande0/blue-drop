import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "native-base";
import { SafeAreaView, Text } from "react-native";
import { RootStackParamList } from "../utils/routersRelated";

const Home: React.FC = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>This is home screen</Text>
      </View>
    </SafeAreaView>
  );
};
export default Home;
