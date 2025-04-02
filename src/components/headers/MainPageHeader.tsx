import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { userContext } from '@/src/utils/context/ContextApi';

const MainPageHeader = () => {
    const navigation = useNavigation()
    const { userProfile } = userContext()

    const getTrimmedAddress = (address: string | undefined) => {
        if (!address) return "Select Location";
        return address.length > 25 ? address.substring(0, 25) + '...' : address;
    }

    return (
        <View className='w-full py-4 flex items-center justify-between px-3 flex-row'>
            <TouchableOpacity 
                activeOpacity={0.8} 
                onPress={() => navigation.navigate("LocationPage" as never)} 
                className='flex-row items-center gap-3 flex-1 mr-2'
            >
                <Entypo name="location" size={24} color="gray" />
                <Text className='text-zinc-400 text-lg font-bold' numberOfLines={1}>
                    {getTrimmedAddress(userProfile?.User_Address?.address)}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Profile" as never)}>
                <Image source={{ uri: userProfile?.User_Image }} className='w-14 h-14 rounded-full' />
            </TouchableOpacity>
        </View>
    )
}

export default MainPageHeader