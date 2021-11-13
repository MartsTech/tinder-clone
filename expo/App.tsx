import { StatusBar } from "expo-status-bar";
import React from "react";
import Navigation from "./src/modules/navigation";
import { store, StoreContext } from "./src/stores/store";

const App = () => {
  return (
    <StoreContext.Provider value={store}>
      <Navigation />
      <StatusBar style="auto" />
    </StoreContext.Provider>
  );
};

export default App;
