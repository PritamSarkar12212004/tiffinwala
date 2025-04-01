import { Stack } from 'expo-router';
import React from 'react';
import BgColor from '@/src/constants/color/BgColor';
import { SafeAreaView, StatusBar } from 'react-native';

const AuthLayout = () => {
  return (
    <SafeAreaView className='w-full h-full'>
      <MainLayout />
    </SafeAreaView>
  );
};
const MainLayout = () => {
  return (<>
    <StatusBar barStyle='light-content' backgroundColor={BgColor.Primary} />

    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: BgColor.Primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Sign In',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: 'Sign Up',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="user-info"
        options={{
          title: 'Complete Profile',
          headerShown: true,
        }}
      />
    </Stack>
  </>

  )
}

export default AuthLayout;