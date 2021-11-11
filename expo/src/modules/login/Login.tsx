import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useSignInGoogle from "../../hooks/useSignInGoogle";

const Login = () => {
  const [signInGoogle, loading] = useSignInGoogle();

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.background}
        source={require("../../../assets/images/tinder.png")}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => !loading && signInGoogle()}
        >
          <Text style={styles.buttonText}>Sign In & Get Swiping</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  button: {
    position: "absolute",
    bottom: 160,
    width: 210,
    marginHorizontal: "25%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "600",
  },
});
