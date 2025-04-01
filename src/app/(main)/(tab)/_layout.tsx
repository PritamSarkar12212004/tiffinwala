import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { Tabs } from 'expo-router'
import BgColor from '@/src/constants/color/BgColor'
import Ionicons from '@expo/vector-icons/Ionicons';
import Color from '@/src/constants/color/Color';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const _layout = () => {


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MainLayout />
    </GestureHandlerRootView>
  )
}

const MainLayout = () => {
  return <SafeAreaView className='w-full h-full' style={{ backgroundColor: BgColor.Primary }}>
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: style.tabBar, tabBarShowLabel: false }}>
      <Tabs.Screen name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className='h-14 w-40 flex items-center justify-center rounded-full' style={{ backgroundColor: focused ? Color.Primary : BgColor.Tertiary }}>
              <Ionicons name="home" color={focused ? "white" : "white"} size={30} />
            </View>
          ),
        }}
      />
      <Tabs.Screen name="Info" options={{
        tabBarIcon: ({ focused }) => (
          <View className='h-14 w-40 flex items-center justify-center rounded-full' style={{ backgroundColor: focused ? Color.Primary : BgColor.Tertiary }}>
            <MaterialIcons name="data-saver-off" color={focused ? "white" : "white"} size={30} />
          </View>
        ),
      }} />
    </Tabs>
  </SafeAreaView>
}

const style = StyleSheet.create({
  tabBar: {
    backgroundColor: BgColor.Secondary,
    borderTopWidth: 0,
    marginBottom: 0,
    marginTop: 0,
    marginLeft: 20,
    marginRight: 20,
    position: 'absolute',
    bottom: 30,
    borderRadius: 100,
    paddingTop: 15,
    height: 70,
    shadowColor: 'transparent',

  }

})
export default _layout