import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../shared/components/header";
import Cards from "./components/Cards";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Cards />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
