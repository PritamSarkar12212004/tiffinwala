import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'


const PostProductProfileEmptyCard = (navigation: any) => {
    const router = useRouter()
    return (
        <View className='flex-1 items-center justify-center '>
            <View className='bg-zinc-800 rounded-2xl p-6 w-full items-center'>
                <View className='w-20 h-20 bg-zinc-700 rounded-full items-center justify-center mb-4'>
                    <Ionicons name="restaurant-outline" size={40} color="#FFD700" />
                </View>
                <Text className='text-white text-xl font-bold mb-2 text-center'>No Posts Yet</Text>
                <Text className='text-zinc-400 text-center mb-6'>Share your delicious tiffin service with the world</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => router.push("/(main)/(product)/NewPost" as never)}
                    className='bg-[#FFD700] py-3 px-6 rounded-full flex-row items-center'
                >
                    <Ionicons name="add-circle-outline" size={20} color="black" />
                    <Text className='text-black font-bold ml-2'>Create First Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PostProductProfileEmptyCard