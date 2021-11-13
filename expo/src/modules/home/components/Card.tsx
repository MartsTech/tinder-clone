import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface CardProps {
  card: {
    firstName: string;
    lastName: string;
    photoURL: string;
    job: string;
    age: number;
  };
}

const Card: React.FC<CardProps> = ({ card }) => {
  const { firstName, lastName, photoURL, job, age } = card;

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: photoURL }} />
      <View style={styles.details}>
        <View>
          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
          <Text>{job}</Text>
        </View>
        <Text style={styles.age}>{age}</Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "white",
    height: "80%",
    borderRadius: 12,
  },
  image: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    borderRadius: 12,
  },
  details: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    width: "100%",
    height: 80,
    paddingHorizontal: 24,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.4,
    elevation: 2,
  },
  name: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "bold",
  },
  age: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
  },
});
