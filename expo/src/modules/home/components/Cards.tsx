import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import Card from "./Card";
import CardsButtons from "./CardsButtons";

const Cards = () => {
  const swipeRef = useRef<Swiper<any>>(null);

  return (
    <>
      <View style={styles.container}>
        <Swiper
          ref={swipeRef}
          containerStyle={styles.swiper}
          cards={data}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={() => {
            console.log("Swipe PASS");
          }}
          onSwipedRight={() => {
            console.log("Swipe MATCH");
          }}
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
          renderCard={(card) => <Card key={card.id} card={card} />}
        />
      </View>
      <CardsButtons swipeRef={swipeRef} />
    </>
  );
};

export default Cards;

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

const data = [
  {
    id: 1,
    firstName: "Martin",
    lastName: "Velkov",
    job: "Software Developer",
    photoURL:
      "https://scontent.fsof5-1.fna.fbcdn.net/v/t1.6435-9/98623228_869263836915098_3750787565137952768_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=84a396&_nc_ohc=E4OCo5DdeYwAX9T55zc&_nc_ht=scontent.fsof5-1.fna&oh=2b30cc9de436b5f5df46490cc014a9da&oe=61B63547",
    age: 17,
  },
  {
    id: 2,
    firstName: "Martin",
    lastName: "Velkov",
    job: "Software Developer",
    photoURL:
      "https://scontent.fsof5-1.fna.fbcdn.net/v/t1.6435-9/86382163_800893710418778_802688469468971008_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=YSHV9m8JfhMAX-Eciag&_nc_ht=scontent.fsof5-1.fna&oh=a6a716be885da2d9a76f8a4dbde2aad5&oe=61B4CEB0",
    age: 17,
  },
  {
    id: 3,
    firstName: "Martin",
    lastName: "Velkov",
    job: "Software Developer",
    photoURL:
      "https://scontent.fsof5-1.fna.fbcdn.net/v/t1.6435-9/107864546_907469693094512_4771878470408490696_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=84a396&_nc_ohc=XS88eh2cISEAX-tYWLU&_nc_ht=scontent.fsof5-1.fna&oh=2bd70511715a481afe8b51c1f02293d4&oe=61B65EFE",
    age: 17,
  },
];
