import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { AppNavigationProp } from "../../../../../types/navigation";

const HeaderLogo = () => {
  const navigation = useNavigation<AppNavigationProp>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Update")}>
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
