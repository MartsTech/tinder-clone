import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  Login: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Chat: undefined;
  Update: undefined;
  Match: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<AppStackParamList>;
