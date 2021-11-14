import { createNavigationContainerRef } from "@react-navigation/native";
import { AppStackParamList } from "../../../types/navigation";

export const navigationRef = createNavigationContainerRef<AppStackParamList>();

export const navigate = (
  ...args:
    | [screen: keyof AppStackParamList]
    | [screen: keyof AppStackParamList, params: undefined]
) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...args);
  }
};
