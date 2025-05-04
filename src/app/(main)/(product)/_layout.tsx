import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import SubPageWraper from '@/src/components/layout/SubPageWraper'

const _layout = () => {
    return (
        <SubPageWraper>

            <Stack screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}>
            </Stack>
        </SubPageWraper>
    )
}
export default _layout
