import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Button, View } from "react-native";
import { useStore } from "../../stores/store";
import { AppNavigationProp } from "../../types/navigation";

const Home = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const { signOut } = useStore().userStore;

  return (
    <View>
      <Button
        title="Go to Chat Screen"
        onPress={() => navigation.navigate("Chat")}
      />
      <Button title="Logout" onPress={signOut} />
    </View>
  );
};

export default Home;
