import { observer } from "mobx-react-lite";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "../../../stores/store";
import ChatHeader from "../shared/components/ChatHeader";
import ChatPreview from "./components/ChatPreview";

const ChatList = () => {
  const { matches, matchesLimit, loadMore, hasMore, selectMatch } =
    useStore().matchStore;

  return (
    <SafeAreaView>
      <ChatHeader title="Chat" />
      {matches.length > 0 ? (
        <FlatList
          style={styles.container}
          data={matches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatPreview match={item} onPress={() => selectMatch(item.id)} />
          )}
          initialNumToRender={matchesLimit}
          onEndReachedThreshold={0.5}
          onEndReached={loadMore}
          ListFooterComponent={() =>
            hasMore ? <ActivityIndicator size="large" color="#FF5864" /> : null
          }
        />
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No matches at the moment 😢</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default observer(ChatList);

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  empty: {
    padding: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 28,
  },
});
