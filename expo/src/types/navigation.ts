import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  Login: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  ChatList: undefined;
  ChatMessages: undefined;
  Update: undefined;
  Match: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<AppStackParamList>;
