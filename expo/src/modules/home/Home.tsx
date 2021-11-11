import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Button, View } from "react-native";
import { AppNavigationProp } from "../../types/navigation";

const Home = () => {
  const navigation = useNavigation<AppNavigationProp>();

  return (
    <View>
      <Button
        title="Go to Chat Screen"
        onPress={() => navigation.navigate("Chat")}
      />
    </View>
  );
};

export default Home;
