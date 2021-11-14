import {
  collection,
  doc,
  DocumentData,
  FieldValue,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  startAfter,
  Unsubscribe,
  where,
} from "@firebase/firestore";
import { makeAutoObservable } from "mobx";
import * as RootNavigation from "../modules/navigation/components/RootNavigation";
import { Match } from "../types/match";
import { Profile } from "../types/profile";
import { User } from "../types/user";
import { db } from "../utils/firebase";
import { store } from "./store";

class MatchStore {
  currentMatch: Match | null = null;
  matchRegistery = new Map<string, Match>();
  matchesLimit = 15;
  hasMore = false;
  lastMatchTimestamp: FieldValue | null = null;
  unsubscribeMatches?: Unsubscribe;

  constructor() {
    makeAutoObservable(this);
  }

  get matches() {
    return Array.from(this.matchRegistery.values()).sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  }

  resetStore = () => {
    this.currentMatch = null;
    this.matchRegistery.clear();
    this.matchesLimit = 15;
    this.hasMore = false;
    this.lastMatchTimestamp = null;

    if (this.unsubscribeMatches) {
      this.unsubscribeMatches();
      this.unsubscribeMatches = undefined;
    }
  };

  subscribeStore = async (user: User) => {
    this.unsubscribeMatches = onSnapshot(
      query(
        collection(db, "matches"),
        where("userMatched", "array-contains", user.uid),
        orderBy("timestamp", "desc"),
        limit(this.matchesLimit)
      ),
      this.setMatches
    );
  };

  loadMore = async () => {
    if (!this.hasMore) return;

    const { user } = store.userStore;

    if (!user) return;

    const matchesSnap = await getDocs(
      query(
        collection(db, "matches"),
        where("userMatched", "array-contains", user.uid),
        orderBy("timestamp", "desc"),
        startAfter(this.lastMatchTimestamp),
        limit(this.matchesLimit)
      )
    );

    this.setMatches(matchesSnap);
  };

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

  selectMatch = (id: string) => {
    if (this.matchRegistery.has(id)) {
      this.currentMatch = this.matchRegistery.get(id) as Match;
      RootNavigation.navigate("ChatMessages");
    } else {
      this.currentMatch = null;
    }
  };

  private setMatches = (snap: QuerySnapshot<DocumentData>) => {
    snap.docs.forEach((doc) => {
      if (!doc.exists()) return;

      this.setLastMatchTimestamp(doc);

      this.matchRegistery.set(doc.id, this.getMatch(doc));
    });
  };

  private getMatch = (snap: QueryDocumentSnapshot<DocumentData>): Match => {
    return {
      id: snap.id,
      users: snap.data().users,
      userMatched: snap.data().userMatched,
      timestamp: new Date(snap.data().timestamp?.toDate()),
    };
  };

  private setLastMatchTimestamp = (
    doc: QueryDocumentSnapshot<DocumentData>
  ) => {
    if (!this.lastMatchTimestamp) {
      this.lastMatchTimestamp = doc.data().timestamp;
    } else {
      const lastTimestamp = new Date(
        // @ts-ignore
        this.lastMatchTimestamp?.toDate()
      ).getTime();

      const currentTimestamp = new Date(
        doc.data().timestamp?.toDate()
      ).getTime();

      if (currentTimestamp < lastTimestamp) {
        this.lastMatchTimestamp = doc.data().timestamp;
      }
    }
  };

  private combineIds = (firstId: string, secondId: string) => {
    if (firstId > secondId) {
      return firstId + secondId;
    }
    return secondId + firstId;
  };
}

export default MatchStore;
