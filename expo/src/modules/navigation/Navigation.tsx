import { NavigationContainer } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../stores/store";
import AppNavigator from "./components/AppNavigator";
import AuthNavigator from "./components/AuthNavigator";

const Navigation = () => {
  const { user } = useStore().userStore;

  return (
    <NavigationContainer>
      {!user ? <AuthNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
};

export default observer(Navigation);
