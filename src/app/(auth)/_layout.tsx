import { Stack } from 'expo-router';
import React from 'react';
import BgColor from '@/src/constants/color/BgColor';
import { SafeAreaView, StatusBar } from 'react-native';
import AuthNotificationWraper from '@/src/components/layout/AuthNotificationWraper';
const AuthLayout = () => {
  return (
    <SafeAreaView className='w-full h-full'>
      <AuthNotificationWraper>
        <MainLayout />
      </AuthNotificationWraper>
    </SafeAreaView>
  );
};
const MainLayout = () => {
  return (<>
    <StatusBar barStyle='light-content' backgroundColor={BgColor.Primary} />

    <Stack
      screenOptions={{
        headerShown: false,
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
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: 'Sign Up',
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="user-info"
        options={{
          title: 'Complete Profile',
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="LocationPicker"
        options={{
          title: 'Select Location',
          headerShown: true,
          animation: 'slide_from_right',
        }}
      />

    </Stack>
  </>

  )
}

export default AuthLayout;