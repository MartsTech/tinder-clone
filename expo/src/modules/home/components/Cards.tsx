import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { useStore } from "../../../stores/store";
import { Profile } from "../../../types/profile";
import Card from "./Card";
import CardsButtons from "./CardsButtons";
import NoCard from "./NoCard";

const Cards = () => {
  const swipeRef = useRef<Swiper<any>>(null);
  const { profiles, passProfile, matchProfile } = useStore().profileStore;

  return (
    <>
      <View style={styles.container}>
        <Swiper
          ref={swipeRef}
          containerStyle={styles.swiper}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={passProfile}
          onSwipedRight={matchProfile}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: leftLabel,
            },
            right: {
              title: "MATCH",
              style: rightLabel,
            },
          }}
          renderCard={(card: Profile) =>
            card ? <Card key={card.id} card={card} /> : <NoCard />
          }
        />
      </View>
      <CardsButtons swipeRef={swipeRef} />
    </>
  );
};

export default observer(Cards);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -24,
  },
  swiper: {
    backgroundColor: "transparent",
  },
});

const leftLabel = StyleSheet.create({
  label: {
    textAlign: "right",
    color: "red",
  },
});

const rightLabel = StyleSheet.create({
  label: {
    color: "#4DED30",
  },
});
