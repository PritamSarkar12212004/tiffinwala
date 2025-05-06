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
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="index" />
      </Stack>
    </>
  )
}

export default _layout