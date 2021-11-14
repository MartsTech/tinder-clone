import { createContext, useContext } from "react";
import MatchStore from "./matchStore";
import MessageStore from "./messageStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store {
  userStore: UserStore;
  profileStore: ProfileStore;
  matchStore: MatchStore;
  messageStore: MessageStore;
}

export const store: Store = {
  userStore: new UserStore(),
  profileStore: new ProfileStore(),
  matchStore: new MatchStore(),
  messageStore: new MessageStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
