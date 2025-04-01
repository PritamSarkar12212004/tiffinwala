import { View, Text } from 'react-native'
import React from 'react'

const MainPageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <View className='w-full  flex flex-col gap-3 mb-60 '>
            {children}
        </View>
    )
}

export default MainPageLayout