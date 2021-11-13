import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useStore } from "../../../../../stores/store";

const HeaderAvatar = () => {
  const { user, signOut } = useStore().userStore;

  return (
    <TouchableOpacity onPress={signOut}>
      <Image style={styles.avatar} source={{ uri: user?.photoURL }} />
    </TouchableOpacity>
  );
};

export default HeaderAvatar;

const styles = StyleSheet.create({
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 9999,
  },
});
