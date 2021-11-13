import {
  GoogleAuthProvider,
  signInWithCredential,
  User as FirebaseUser,
} from "@firebase/auth";
import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
import { AuthSessionResult } from "expo-auth-session";
import { makeAutoObservable, runInAction } from "mobx";
import { User } from "../types/user";
import { auth, db } from "../utils/firebase";
import { resetStore } from "./store";

class UserStore {
  user: User | null = null;
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  reset = () => {
    this.user = null;
  };

  signInGoogle = async (response: AuthSessionResult) => {
    this.loading = true;

    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      await signInWithCredential(auth, credential);
    }

    runInAction(() => {
      this.loading = false;
    });
  };

  signOut = async () => {
    await auth.signOut();
    resetStore();
  };

  setUser = (user: FirebaseUser | null) => {
    if (user) {
      this.user = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName!,
        photoURL: user.photoURL!,
      };
    } else {
      this.user = null;
    }

    this.loading = false;
  };

  updateUserProfile = async (
    image: string,
    job: string,
    age: number,
    callback: () => void
  ) => {
    if (!this.user) return;

    await setDoc(doc(db, "users", this.user.uid), {
      id: this.user.uid,
      displayName: this.user.displayName,
      photoURL: image,
      job,
      age,
      timestamp: serverTimestamp(),
    });

    callback();
  };
}

export default UserStore;
