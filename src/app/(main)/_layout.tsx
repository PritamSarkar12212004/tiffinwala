import { StatusBar, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import BgColor from '@/src/constants/color/BgColor'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Socket from '@/src/utils/socket/Socket'
import { userContext } from '@/src/utils/context/ContextApi'

const _layout = () => {
  const { userProfile } = userContext()
  useEffect(() => {
    Socket.connect()
    Socket.emit('register-user', userProfile?._id)
    return () => {
      Socket.disconnect()
    }
  }, [])
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
        <Stack.Screen name="(profile)" options={{ animation: "ios_from_right" }} />
      </Stack>
    </>
  )
}

export default _layout