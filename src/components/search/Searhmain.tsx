import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from 'expo-router';
const Searhmain = () => {
    const navigation = useNavigation()
    return (
        <View className='w-full flex items-center justify-center px-2'>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("SearchPage")} className='w-full h-16 rounded-3xl  bg-zinc-900/60 flex px-5 flex-row items-center gap-3' >
                <AntDesign name="search1" size={30} color="gray" />
                <Text className='text-white/40 text-lg font-bold'>Mess name, Area name</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Searhmain