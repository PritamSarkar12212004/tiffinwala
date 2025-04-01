import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const PageNavigation = ({ path }: { path: string }) => {
    const navigation = useNavigation();
    return (
        <View className='w-full py-2 flex flex-row items-center justify-between'>
            <TouchableOpacity activeOpacity={0.8} className='w-14' onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={35} color="white" />
            </TouchableOpacity>
            <View>
                <Text className='text-xl text-white font-semibold'>{path}</Text>
            </View>
            <TouchableOpacity className='w-14'>
            </TouchableOpacity>
        </View>
    )
}

export default PageNavigation