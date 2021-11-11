import React from "react";
import { Button, View } from "react-native";
import useSignInGoogle from "../../hooks/useSignInGoogle";

const Login = () => {
  const [signInGoogle, loading] = useSignInGoogle();

  return (
    <View>
      <Button title="Login" disabled={loading} onPress={signInGoogle} />
    </View>
  );
};

export default Login;
