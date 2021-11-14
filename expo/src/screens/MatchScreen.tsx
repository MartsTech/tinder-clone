import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import Match from "../modules/match";
import { useStore } from "../stores/store";
import { AppStackParamList } from "../types/navigation";

type MatchScreenProps = NativeStackScreenProps<AppStackParamList, "Match">;

const MatchScreen: React.FC<MatchScreenProps> = ({ navigation }) => {
  const { currentMatch } = useStore().matchStore;

  useEffect(() => {
    if (!currentMatch) {
      navigation.replace("Home");
    }
  }, [currentMatch, navigation]);

  return <Match />;
};

export default observer(MatchScreen);
