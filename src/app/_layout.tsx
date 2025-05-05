import "../../global.css";

import React from 'react';
import { Stack } from 'expo-router';
import { ContextProvider } from "../utils/context/ContextApi";

export default function Layout() {
  return (
    <ContextProvider>
      <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ContextProvider>
  );
}
