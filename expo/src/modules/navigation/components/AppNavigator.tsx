import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ChatListScreen from "../../../screens/ChatListScreen";
import ChatMessagesScreen from "../../../screens/ChatMessagesScreen";
import HomeScreen from "../../../screens/HomeScreen";
import MatchScreen from "../../../screens/MatchScreen";
import UpdateScreen from "../../../screens/UpdateScreen";
import { AppStackParamList } from "../../../types/navigation";

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Group>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ChatList" component={ChatListScreen} />
        <Stack.Screen name="ChatMessages" component={ChatMessagesScreen} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: "modal",
        }}
      >
        <Stack.Screen name="Update" component={UpdateScreen} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: "transparentModal",
        }}
      >
        <Stack.Screen name="Match" component={MatchScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppNavigator;
