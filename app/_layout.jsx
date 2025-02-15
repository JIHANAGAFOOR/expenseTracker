// app/_layout.jsx
import { StyleSheet } from "react-native";
import React from "react";
import { Stack, Slot } from "expo-router";
import { Provider } from "react-redux";
import store, { persistor } from "../store/index";
import { PersistGate } from "redux-persist/integration/react";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="(tab)"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
        </Stack>
      </PersistGate>
    </Provider>
  );
};

export default RootLayout;
