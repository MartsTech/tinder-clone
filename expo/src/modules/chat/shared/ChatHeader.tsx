import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppNavigationProp } from "../../../types/navigation";

interface ChatHeaderProps {
  title: string;
  callEnabled?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  callEnabled = false,
}) => {
  const navigation = useNavigation<AppNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
        <Text style={styles.backText}>{title}</Text>
      </View>

      {callEnabled && (
        <TouchableOpacity style={styles.callButton}>
          <Foundation name="telephone" size={20} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  back: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 24,
    lineHeight: 32,
  },
  callButton: {
    borderRadius: 9999,
    marginRight: 16,
    padding: 12,
    backgroundColor: "rgba(254, 202, 202, 1)",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
