import { Profile } from "./profile";

export interface Match {
  id: string;
  users: {
    [id: string]: Profile;
  };
  userMatched: string[];
  lastMessage: string | null;
  timestamp: Date;
}
