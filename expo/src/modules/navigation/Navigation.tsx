import { NavigationContainer } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../stores/store";
import Loading from "../shared/components/loading";
import AppNavigator from "./components/AppNavigator";
import AuthNavigator from "./components/AuthNavigator";
import { navigationRef } from "./components/RootNavigation";

const Navigation = () => {
  const { user, userLoading } = useStore().userStore;

  if (!user && userLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {!user ? <AuthNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
};

export default observer(Navigation);
