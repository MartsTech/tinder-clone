import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppNavigationProp } from "../../types/navigation";
import MatchContent from "./components/MatchContent";

const Match = () => {
  const navigation = useNavigation<AppNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/images/match.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <MatchContent />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text style={styles.buttonText}>Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Match;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(239, 68, 68, 1)",
    paddingTop: 80,
    opacity: 0.95,
  },
  imageContainer: {
    flex: 0.2,
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  button: {
    backgroundColor: "white",
    margin: 20,
    paddingHorizontal: 40,
    paddingVertical: 32,
    borderRadius: 9999,
    marginTop: 80,
  },
  buttonText: {
    textAlign: "center",
  },
});
