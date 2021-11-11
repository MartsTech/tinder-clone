import { createContext, useContext } from "react";
import UserStore from "./userStore";

interface Store {
  userStore: UserStore;
}

export const store: Store = {
  userStore: new UserStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};

export const resetStore = () => {
  const { userStore } = store;
  userStore.reset();
};
