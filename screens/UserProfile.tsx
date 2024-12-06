import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "native-base";
import { SafeAreaView, Text } from "react-native";
import { RootStackParamList } from "../utils/routersRelated";

const UserProfile: React.FC = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>User Profile</Text>
      </View>
    </SafeAreaView>
  );
};
export default UserProfile;
