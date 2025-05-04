import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    return (
        <Stack screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
        }}>
            <Stack.Screen name="Profile" />
            <Stack.Screen name="ProfileEdit" />
            <Stack.Screen name="YourPosts" />
        </Stack>
    )
}
export default _layout
