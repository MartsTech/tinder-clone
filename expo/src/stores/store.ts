import { createContext, useContext } from "react";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store {
  userStore: UserStore;
  profileStore: ProfileStore;
}

export const store: Store = {
  userStore: new UserStore(),
  profileStore: new ProfileStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};

export const resetStore = () => {
  store.profileStore.resetStore();
};
