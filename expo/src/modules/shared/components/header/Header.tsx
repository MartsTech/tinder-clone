import React from "react";
import { StyleSheet, View } from "react-native";
import HeaderAvatar from "./components/HeaderAvatar";
import HeaderChat from "./components/HeaderChat";
import HeaderLogo from "./components/HeaderLogo";

const Header = () => {
  return (
    <View style={styles.container}>
      <HeaderAvatar />
      <HeaderLogo />
      <HeaderChat />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
