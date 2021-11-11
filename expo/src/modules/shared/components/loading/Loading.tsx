import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});
