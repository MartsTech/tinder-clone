import { observer } from "mobx-react-lite";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useStore } from "../../../stores/store";

const MatchContent = () => {
  const { currentMatch } = useStore().matchStore;

  if (!currentMatch) return null;

  const { users, userMatched } = currentMatch;

  const currentUser = users[userMatched[0]];
  const otherUser = users[userMatched[1]];

  return (
    <>
      <Text style={styles.title}>
        You and {otherUser.displayName} have liked each other.
      </Text>
      <View style={styles.images}>
        <Image style={styles.image} source={{ uri: currentUser.photoURL }} />
        <Image style={styles.image} source={{ uri: otherUser.photoURL }} />
      </View>
    </>
  );
};

export default observer(MatchContent);

const styles = StyleSheet.create({
  title: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  images: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  image: {
    height: 128,
    width: 128,
    borderRadius: 9999,
  },
});
