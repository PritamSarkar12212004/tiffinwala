import { View, Text } from 'react-native'
import React from 'react'
import MainTiffinCard from '../cards/MainTiffinCard'
const MainCardShow = () => {
    return (
        <View className='w-full px-2  flex gap-5'>
            <MainTiffinCard />
            <MainTiffinCard />
            <MainTiffinCard />
            <MainTiffinCard />
            <MainTiffinCard />
            <MainTiffinCard />
        </View>
    )
}

export default MainCardShow