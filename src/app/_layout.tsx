import "../../global.css"
import React from 'react'
import { Stack } from 'expo-router'
import { ContextProvider } from "../utils/context/ContextApi"

const _layout = () => {
  return <ContextProvider><MainLayout /></ContextProvider>
}
const MainLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  )
}

export default _layout