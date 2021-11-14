import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { TouchableOpacity } from "react-native";
import { AppNavigationProp } from "../../../../../types/navigation";

const HeaderChat = () => {
  const navigation = useNavigation<AppNavigationProp>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("ChatList")}>
      <Ionicons name="chatbubbles-sharp" size={40} color="#FF5864" />
    </TouchableOpacity>
  );
};

export default HeaderChat;
