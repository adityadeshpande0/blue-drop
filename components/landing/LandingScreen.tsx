import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, SafeAreaView, Text, View } from "react-native";
import { RootStackParamList } from "../../utils/routersRelated";

type LandingScreenProps = NativeStackScreenProps<RootStackParamList, "landingscreen">

const LandingScreen: React.FC<LandingScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Welcome to Blue Drop !</Text>
        <Button onPress={()=>navigation.navigate("login")} title="Login" />
        <Button title="Register" />
      </View>
    </SafeAreaView>
  );
};
export default LandingScreen;
