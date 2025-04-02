import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import LottiAnimation from '@/src/components/layout/LottiAnimation'
import LottiConstant from '@/src/constants/lotti/LottiConstant'
import BgColor from '../constants/color/BgColor'
import Color from '../constants/color/Color'
import { useRouter } from 'expo-router'
import { getFullData, getTemData, } from '../functions/storage/Storage'
import AuthToken from '../constants/token/AuthToken'
import { userContext } from '../utils/context/ContextApi'
const index = () => {
    const router = useRouter()

    // call hooks
    const { setUserProfile } = userContext()
    const authChaker = async () => {
        const tempLogin = getTemData(AuthToken.TemLogin)
        const fullLogin = getFullData(AuthToken.UserInfo)
        if (tempLogin) {
            router.replace("/user-info" as any)
        } else if (fullLogin) {
            setUserProfile(fullLogin)
            router.replace("/(main)/(tab)" as any)
        } else {
            router.replace("/(auth)" as any)
        }
    }
    const loading = () => {
        setTimeout(() => {
            authChaker()
        }, 1000)
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