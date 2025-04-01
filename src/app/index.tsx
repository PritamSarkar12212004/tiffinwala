import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import LottiAnimation from '@/src/components/layout/LottiAnimation'
import LottiConstant from '@/src/constants/lotti/LottiConstant'
import BgColor from '../constants/color/BgColor'
import Color from '../constants/color/Color'
import { useRouter } from 'expo-router'
const index = () => {
    const router = useRouter()
    const loading = () => {
        setTimeout(() => {
            router.replace("/(auth)")
        }, 10)
    }
    useEffect(() => {
        loading()
    }, [])
    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor={BgColor.Primary} />
            <View className='w-full h-full  flex items-center justify-between py-10' style={{ backgroundColor: BgColor.Primary }}
            >
                <View></View>
                <LottiAnimation height={200} width={200} path={LottiConstant.mainLoading} bg={BgColor.Primary} />
                <View>
                    <Text className='text-white text-2xl font-bold' style={{ color: Color.Third }}>Welcome to the app</Text>
                </View>
            </View>
        </>

    )
}

export default index