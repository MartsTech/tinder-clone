import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "../../stores/store";
import UpdateForm from "./components/UpdateForm";

const Update = () => {
  const { user } = useStore().userStore;

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require("../../../assets/images/logo.png")}
      />
      <Text style={styles.title}>Welcome {user?.displayName}</Text>
      <UpdateForm />
    </SafeAreaView>
  );
};

export default Update;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    height: 80,
    width: "100%",
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
    color: "rgba(107, 114, 128, 1)",
    padding: 8,
    fontWeight: "bold",
  },
});
