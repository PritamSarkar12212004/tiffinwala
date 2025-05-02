import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="NewPost" />
            <Stack.Screen name="EditPost" />
            <Stack.Screen name="ProductFilterPage" />
        </Stack>
    )
}
export default _layout
