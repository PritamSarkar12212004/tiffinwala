import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'

const _layout = () => {
  return (
    <MainLayOut />
  )
}
const MainLayOut = () => {
  return (
    <>
      <StatusBar hidden />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="index" />
      </Stack>
    </>
  )
}

export default _layout