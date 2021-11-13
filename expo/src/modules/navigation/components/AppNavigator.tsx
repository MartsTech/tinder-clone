import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React from "react";
import ChatScreen from "../../../screens/ChatScreen";
import HomeScreen from "../../../screens/HomeScreen";
import UpdateScreen from "../../../screens/UpdateScreen";
import { useStore } from "../../../stores/store";
import { AppStackParamList } from "../../../types/navigation";
import Loading from "../../shared/components/loading";

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  const { userProfile, profileLoading } = useStore().profileStore;

  if (!userProfile && profileLoading) {
    return <Loading />;
  }

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      {userProfile && (
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Group>
      )}
      <Stack.Group
        screenOptions={{
          presentation: "modal",
        }}
      >
        <Stack.Screen name="Update" component={UpdateScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default observer(AppNavigator);
