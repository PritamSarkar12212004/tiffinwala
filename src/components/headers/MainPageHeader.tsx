import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { userContext } from '@/src/utils/context/ContextApi';
import { useRouter } from 'expo-router';

const MainPageHeader = () => {
    const navigation = useNavigation()
    const { userProfile, userTemLocation } = userContext()
    const router = useRouter()

    return (
        <View className='w-full py-4  flex items-center justify-between px-3 gap-2 flex-row'>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("LocationPage" as never)}
                className='flex-row items-center gap-2 flex-1 mr-2'
            >
                <Entypo name="location" size={24} color="gray" />
                <Text className='text-zinc-400 text-lg overflow-hidden font-bold' numberOfLines={1}>
                    {userTemLocation?.formattedAddress ? userTemLocation?.formattedAddress : userTemLocation?.address}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => router.push("/(main)/Profile")}>
                <Image source={{ uri: userProfile?.User_Image }} className='w-14 h-14 rounded-full' />
            </TouchableOpacity>
        </View>
    )
}

export default MainPageHeader