import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-deck-swiper";

interface CardsButtonsProps {
  swipeRef: React.RefObject<Swiper<any>>;
}

const CardsButtons: React.FC<CardsButtonsProps> = ({ swipeRef }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.buttonFailure]}
        onPress={() => swipeRef.current?.swipeLeft()}
      >
        <Entypo name="cross" size={30} color="red" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonSuccess]}
        onPress={() => swipeRef.current?.swipeRight()}
      >
        <AntDesign name="heart" size={24} color="green" />
      </TouchableOpacity>
    </View>
  );
};

export default CardsButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 32,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    width: 64,
    height: 64,
  },
  buttonFailure: {
    backgroundColor: "rgba(254, 202, 202, 1)",
  },
  buttonSuccess: {
    backgroundColor: "rgba(167, 243, 208, 1)",
  },
});
