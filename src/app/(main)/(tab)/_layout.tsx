import { SafeAreaView } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import BgColor from '@/src/constants/color/BgColor'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const _layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MainLayout />
    </GestureHandlerRootView>
  )
}

const MainLayout = () => {
  return <SafeAreaView className='w-full h-full' style={{ backgroundColor: BgColor.Primary }}>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />

    </Stack>
  </SafeAreaView>
}


export default _layout