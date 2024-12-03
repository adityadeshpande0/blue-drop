import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { View } from "native-base";

const LandingScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Blue Drop Application !</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "blue",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
});

export default LandingScreen;
