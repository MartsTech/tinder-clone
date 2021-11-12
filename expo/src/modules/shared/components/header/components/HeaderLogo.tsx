import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const HeaderLogo = () => {
  return (
    <TouchableOpacity>
      <Image
        style={styles.logo}
        source={require("../../../../../../assets/images/icon.png")}
      />
    </TouchableOpacity>
  );
};

export default HeaderLogo;

const styles = StyleSheet.create({
  logo: {
    height: 56,
    width: 56,
  },
});
