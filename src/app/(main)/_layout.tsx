import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import BgColor from '@/src/constants/color/BgColor'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const _layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className='w-full h-full'>
        <MainLayout />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}
const MainLayout = () => {
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor={BgColor.Primary} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tab)" options={{ animation: "slide_from_bottom" }} />
        <Stack.Screen name="SearchPage" options={{ animation: "slide_from_bottom" }} />
        <Stack.Screen name="LocationPage" options={{ animation: "ios_from_right" }} />
        <Stack.Screen name="Profile" options={{ animation: "ios_from_right" }} />
      </Stack>
    </>
  )
}

export default _layout