import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "../../../stores/store";
import ChatHeader from "../shared/components/ChatHeader";
import ChatInput from "./components/ChatInput";
import MessagesList from "./components/MessagesList";

const ChatMessages = () => {
  const { currentMatch } = useStore().matchStore;
  const { user } = useStore().userStore;

  if (!currentMatch || !user) return null;

  const otherUser =
    currentMatch.users[
      currentMatch.userMatched.find((id) => id !== user?.uid) as string
    ];

  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader title={otherUser.displayName} callEnabled />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <MessagesList />
        </TouchableWithoutFeedback>
        <ChatInput />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatMessages;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
