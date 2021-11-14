import { createContext, useContext } from "react";
import MatchStore from "./matchStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store {
  userStore: UserStore;
  profileStore: ProfileStore;
  matchStore: MatchStore;
}

export const store: Store = {
  userStore: new UserStore(),
  profileStore: new ProfileStore(),
  matchStore: new MatchStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};

export const resetStore = () => {
  store.profileStore.resetStore();
};
