import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AppNavigator from "./components/AppNavigator";
import AuthNavigator from "./components/AuthNavigator";

const Navigation = () => {
  const user = false;

  return (
    <NavigationContainer>
      {!user ? <AuthNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
