import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
const MainPageHeader = () => {
    const navigation = useNavigation()
    return (
        <View className='w-full py-4 flex items-center justify-between px-3 flex-row'>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("LocationPage")} className='flex-row items-center gap-2'>
                <Entypo name="location" size={24} color="gray" />
                <Text className='text-zinc-400 text-lg font-bold'>
                    Vasudev Nagar,Hingna,Nagpur...
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Image source={{ uri: "https://i.pinimg.com/736x/e5/fe/63/e5fe636acda5e34f6fdbe39b49bc721e.jpg" }} className='w-14 h-14 rounded-full' />
            </TouchableOpacity>
        </View>
    )
}

export default MainPageHeader