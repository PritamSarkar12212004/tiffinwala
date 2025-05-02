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
      <Stack.Screen name="ShowProduct" />
      <Stack.Screen name="SearchPage" />
      <Stack.Screen name="ViewPost" />
      <Stack.Screen name="Settings" />
      <Stack.Screen name="Notifications" />
      <Stack.Screen name="PromotionAnalytics" />
      <Stack.Screen name="Promotions" />
      <Stack.Screen name="LocationPicker" />
      <Stack.Screen name="NewPromotion" />
      <Stack.Screen name="HelpSupport" />
      <Stack.Screen name="LocationPage" />
      <Stack.Screen name="EditPromotion" />
      <Stack.Screen name="DarkMode" />
      <Stack.Screen name="About" />
    </Stack>
  </SafeAreaView>
}


export default _layout