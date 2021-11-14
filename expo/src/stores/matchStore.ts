import {
  doc,
  DocumentData,
  getDoc,
  QueryDocumentSnapshot,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import { makeAutoObservable } from "mobx";
import * as RootNavigation from "../modules/navigation/components/RootNavigation";
import { Match } from "../types/match";
import { Profile } from "../types/profile";
import { db } from "../utils/firebase";

class MatchStore {
  currentMatch: Match | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  checkMatch = async (userProfile: Profile, userSwiped: Profile) => {
    const userWasMatched = await getDoc(
      doc(db, "users", userSwiped.id, "matches", userProfile.id)
    );

    if (userWasMatched.exists()) {
      this.createMatch(userProfile, userSwiped);
    }
  };

  createMatch = async (userProfile: Profile, userSwiped: Profile) => {
    const matchDoc = doc(
      db,
      "matches",
      this.combineIds(userProfile.id, userSwiped.id)
    );

    await setDoc(matchDoc, {
      users: {
        [userProfile.id]: userProfile,
        [userSwiped.id]: userSwiped,
      },
      userMatched: [userProfile.id, userSwiped.id],
      timestamp: serverTimestamp(),
    });

    const match = await getDoc(matchDoc);

    if (!match.exists()) return;

    this.currentMatch = this.getMatch(match);

    RootNavigation.navigate("Match");
  };

  getMatch = (snap: QueryDocumentSnapshot<DocumentData>): Match => {
    return {
      users: snap.data().users,
      userMatched: snap.data().userMatched,
      timestamp: new Date(snap.data().timestamp?.toDate()),
    };
  };

  private combineIds = (firstId: string, secondId: string) => {
    if (firstId > secondId) {
      return firstId + secondId;
    }
    return secondId + firstId;
  };
}

export default MatchStore;
