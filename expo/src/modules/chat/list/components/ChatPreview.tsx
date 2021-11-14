import { observer } from "mobx-react-lite";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useStore } from "../../../../stores/store";
import { Match } from "../../../../types/match";

interface ChatPreviewProps {
  match: Match;
  onPress: () => void;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({ match, onPress }) => {
  const { users, userMatched, lastMessage } = match;
  const { user } = useStore().userStore;

  const otherUser = users[userMatched.find((id) => id !== user?.uid) as string];

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.avatar} source={{ uri: otherUser.photoURL }} />
      <View>
        <Text style={styles.name}>{otherUser.displayName}</Text>
        <Text>{lastMessage ? lastMessage : "Say Hi!"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default observer(ChatPreview);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "white",
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.4,
    elevation: 2,
  },
  avatar: {
    borderRadius: 9999,
    height: 64,
    width: 64,
    marginRight: 16,
  },
  name: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600",
  },
});
