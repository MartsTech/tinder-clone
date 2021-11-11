import {
  GoogleAuthProvider,
  signInWithCredential,
  User as FirebaseUser,
} from "@firebase/auth";
import { AuthSessionResult } from "expo-auth-session";
import { makeAutoObservable, runInAction } from "mobx";
import { User } from "../types/user";
import { auth } from "../utils/firebase";
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
        email: user.email!,
        displayName: user.displayName!,
        photoURL: user.photoURL!,
      };
    } else {
      this.user = null;
    }

    this.loading = false;
  };
}

export default UserStore;
