import { StatusBar } from "expo-status-bar";
import React from "react";
import AuthProvider from "./src/modules/auth/AuthProvider";
import Navigation from "./src/modules/navigation";
import { store, StoreContext } from "./src/stores/store";

const App = () => {
  return (
    <StoreContext.Provider value={store}>
      <AuthProvider>
        <Navigation />
        <StatusBar style="auto" />
      </AuthProvider>
    </StoreContext.Provider>
  );
};

export default App;
