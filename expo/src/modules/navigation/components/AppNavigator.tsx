import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ChatScreen from "../../../screens/ChatScreen";
import HomeScreen from "../../../screens/HomeScreen";
import { AppStackParamList } from "../../../types/navigation";

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
