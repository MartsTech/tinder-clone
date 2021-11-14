import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import Home from "../modules/home";
import Loading from "../modules/shared/components/loading";
import { useStore } from "../stores/store";
import { AppStackParamList } from "../types/navigation";

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, "Home">;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { userProfile, profileLoading } = useStore().profileStore;

  useEffect(() => {
    if (!userProfile && !profileLoading) {
      navigation.replace("Update");
    }
  }, []);

  if (!userProfile && profileLoading) {
    return <Loading />;
  }

  return <Home />;
};

export default observer(HomeScreen);
