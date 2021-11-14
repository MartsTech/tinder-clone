import { observer } from "mobx-react-lite";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useStore } from "../../../../stores/store";
import MessagesItem from "./MessagesItem";

const MessagesList = () => {
  const { messages, messageLimit, hasMore, loadMore } = useStore().messageStore;
  const { user } = useStore().userStore;

  if (!user) return null;

  return (
    <FlatList
      style={styles.container}
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MessagesItem message={item} sender={item.senderId === user.uid} />
      )}
      inverted={true}
      initialNumToRender={messageLimit}
      onEndReachedThreshold={0.5}
      onEndReached={loadMore}
      ListFooterComponent={() =>
        hasMore ? <ActivityIndicator size="large" color="#FF5864" /> : null
      }
    />
  );
};

export default observer(MessagesList);

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    paddingLeft: 16,
  },
});
