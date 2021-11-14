import {
  collection,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  setDoc,
  Unsubscribe,
  where,
} from "@firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import { Profile } from "../types/profile";
import { User } from "../types/user";
import { db } from "../utils/firebase";
import { store } from "./store";

class ProfileStore {
  profileRegistery = new Map<string, Profile>();
  userProfile: Profile | null = null;
  profileLoading = true;
  passes: { id: string }[] = [];
  unsubscribeUserProfile?: Unsubscribe;
  unsubscribeProfiles?: Unsubscribe;

  constructor() {
    makeAutoObservable(this);
  }

  get profiles() {
    return Array.from(this.profileRegistery.values());
  }

  resetStore = () => {
    this.profileRegistery.clear();
    this.userProfile = null;
    this.profileLoading = true;

    if (this.unsubscribeProfiles) {
      this.unsubscribeProfiles();
      this.unsubscribeProfiles = undefined;
    }

    if (this.unsubscribeUserProfile) {
      this.unsubscribeUserProfile();
      this.unsubscribeUserProfile = undefined;
    }
  };

  subscribeStore = async (user: User) => {
    this.unsubscribeUserProfile = onSnapshot(
      doc(db, "users", user.uid),
      (snap) => {
        runInAction(() => {
          if (snap.exists()) {
            this.userProfile = this.getProfile(snap);
          } else {
            this.userProfile = null;
          }
          this.profileLoading = false;
        });
      }
    );

    const passedIds = await getDocs(
      collection(db, "users", user.uid, "passes")
    ).then((snap) => snap.docs.map((doc) => doc.id));

    const matchedIds = await getDocs(
      collection(db, "users", user.uid, "matches")
    ).then((snap) => snap.docs.map((doc) => doc.id));

    this.unsubscribeProfiles = onSnapshot(
      query(
        collection(db, "users"),
        where("id", "not-in", [...passedIds, ...matchedIds, user.uid])
      ),
      this.setProfiles
    );
  };

  setProfiles = (snap: QuerySnapshot<DocumentData>) => {
    snap.docs.forEach((doc) => {
      if (doc.exists()) {
        this.profileRegistery.set(doc.id, this.getProfile(doc));
      }
    });
  };

  getProfile = (snap: QueryDocumentSnapshot<DocumentData>): Profile => {
    return {
      id: snap.data().id,
      displayName: snap.data().displayName,
      job: snap.data().job,
      age: snap.data().age,
      photoURL: snap.data().photoURL,
      timestamp: new Date(snap.data().timestamp?.toDate()),
    };
  };

  passProfile = async (cardIndex: number) => {
    if (this.profiles.length <= cardIndex || cardIndex < 0) return;

    const userSwiped = this.profiles[cardIndex];

    if (!this.userProfile) return;

    await setDoc(
      doc(db, "users", this.userProfile.id, "passes", userSwiped.id),
      {
        id: userSwiped.id,
      }
    );
  };

  matchProfile = async (cardIndex: number) => {
    if (this.profiles.length <= cardIndex || cardIndex < 0) return;

    const userSwiped = this.profiles[cardIndex];

    if (!this.userProfile) return;

    await setDoc(
      doc(db, "users", this.userProfile.id, "matches", userSwiped.id),
      {
        id: userSwiped.id,
      }
    );

    await store.matchStore.checkMatch(this.userProfile, userSwiped);
  };
}

export default ProfileStore;
