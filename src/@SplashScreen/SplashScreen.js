import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>... Loading</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 56,
    opacity: 0.5,
  },
});

export default SplashScreen;
