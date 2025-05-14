import React from 'react'
import { Stack } from 'expo-router'
import { SafeAreaView, StatusBar } from 'react-native'

const _layout = () => {
  return (
    <MainLayOut />
  )
}

const MainLayOut = () => {
  return (
    <>

      <SafeAreaView className="flex-1 bg-black">


      
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
          <Stack.Screen name="index" />
        </Stack>
      </SafeAreaView>
    </>
  )
}

export default _layout