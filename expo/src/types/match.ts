import { Profile } from "./profile";

export interface Match {
  users: {
    [id: string]: Profile;
  };
  userMatched: string[];
  timestamp: Date;
}
