import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import { userContext } from '@/src/utils/context/ContextApi';
const AuthPopUp = ({ setIsAuthNotificationVisible }: { setIsAuthNotificationVisible: (visible: { status: boolean, message: string }) => void }) => {
    const { isAuthNotificationVisible } = userContext();
    return (
        <View className='w-full h-80 bg-zinc-900 rounded-[35px] p-6 border border-zinc-700 flex justify-between'>
            <View className='w-full flex-row items-center justify-between'>
                <Text className='text-zinc-300 text-2xl font-bold'>Alert <Text className='text-red-400'> (Error)</Text> </Text>
               
            </View>
            <View className='w-full py-5 bg-zinc-800 px-5 rounded-2xl flex-row items-center gap-3 border border-zinc-700'>
                <TouchableOpacity className='p-3 bg-red-500 rounded-full items-center justify-center '>
                    <Feather name="alert-triangle" size={30} color="white" />
                </TouchableOpacity>
                <Text className='text-zinc-300   text-wrap '  >
                    {isAuthNotificationVisible.message}
                </Text>
            </View>
            <TouchableOpacity className='w-full bg-zinc-600 rounded-full py-5 flex items-center justify-center'
                onPress={() => {
                    setIsAuthNotificationVisible({ status: false, message: "" })
                }}
                activeOpacity={0.8}
            >
                <Text className='text-zinc-300 text-xl font-bold'>Close</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AuthPopUp