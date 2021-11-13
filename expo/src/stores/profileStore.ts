import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
  Unsubscribe,
} from "@firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import { Profile } from "../types/profile";
import { User } from "../types/user";
import { db } from "../utils/firebase";

class ProfileStore {
  profileRegistery = new Map<string, Profile>();
  userProfile: Profile | null = null;
  profileLoading = true;
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

  subscribeStore = (user: User) => {
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

    this.unsubscribeProfiles = onSnapshot(
      collection(db, "users"),
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
}

export default ProfileStore;
