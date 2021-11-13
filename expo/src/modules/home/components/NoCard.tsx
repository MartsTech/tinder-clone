import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const NoCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No more profiles</Text>
      <Image
        style={styles.image}
        height={100}
        width={100}
        resizeMode="contain"
        source={require("../../../../assets/images/sad.png")}
      />
    </View>
  );
};

export default NoCard;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "white",
    height: "80%",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.4,
    elevation: 2,
  },
  text: {
    fontWeight: "bold",
    paddingBottom: 20,
  },
  image: {
    height: 80,
    width: "100%",
  },
});
