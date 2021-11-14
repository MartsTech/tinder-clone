import React, { useState } from "react";
import { Button, Keyboard, StyleSheet, TextInput, View } from "react-native";
import { useStore } from "../../../../stores/store";

const ChatInput = () => {
  const { sendMessage } = useStore().messageStore;
  const [input, setInput] = useState("");

  const handleSend = async (input: string) => {
    Keyboard.dismiss();
    const success = await sendMessage(input);

    if (success) {
      setInput("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Send Message..."
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={() => handleSend(input)}
      />
      <Button onPress={() => handleSend(input)} title="Send" color="#FF5864" />
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "rgba(229, 231, 235, 1)",
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 8,
  },
  input: {
    height: 40,
    fontSize: 20,
    lineHeight: 28,
  },
});
