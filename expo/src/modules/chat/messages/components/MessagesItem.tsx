import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Message } from "../../../../types/message";

interface MessageItemProps {
  message: Message;
  sender: boolean;
}

const MessagesItem: React.FC<MessageItemProps> = ({ message, sender }) => {
  const { value, photoURL } = message;

  return (
    <View style={[styles.container, sender ? styles.sender : styles.receiver]}>
      {!sender && <Image style={styles.avatar} source={{ uri: photoURL }} />}
      <Text style={styles.text}>{value}</Text>
    </View>
  );
};

export default MessagesItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    alignSelf: "flex-start",
  },
  sender: {
    backgroundColor: "rgba(124, 58, 237, 1)",
    borderTopRightRadius: 0,
    marginLeft: "auto",
  },
  receiver: {
    position: "relative",
    backgroundColor: "rgba(248, 113, 113, 1)",
    borderTopLeftRadius: 0,
    marginLeft: 56,
  },
  avatar: {
    position: "absolute",
    top: 0,
    left: -56,
    height: 48,
    width: 48,
    borderRadius: 9999,
  },
  text: {
    color: "white",
  },
});
