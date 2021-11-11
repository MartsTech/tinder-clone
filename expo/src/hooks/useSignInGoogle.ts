import { GOOGLE_WEB_CLIENT_ID } from "@env";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { useStore } from "../stores/store";

const useSignInGoogle = () => {
  const { signInGoogle } = useStore().userStore;

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: GOOGLE_WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (response) {
      signInGoogle(response);
    }
  }, [response]);

  const singIn = () => {
    try {
      void promptAsync();
    } catch (err) {}
  };

  return [singIn, !request] as const;
};

export default useSignInGoogle;
