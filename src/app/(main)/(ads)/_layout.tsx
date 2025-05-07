import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' options={{ animation: 'slide_from_right' }} />
        </Stack>
    )
}

export default _layout