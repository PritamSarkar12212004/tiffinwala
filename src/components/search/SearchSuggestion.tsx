import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const SearchSuggestion = () => {
    return (
        <View className='w-full px-2 flex flex-row items-center justify-between'>
            <TouchableOpacity className=' px-4 py-3 rounded-full bg-zinc-900 '>
                <Text className='text-green-500 font-bold text-lg'>Vegetarian</Text>
            </TouchableOpacity>
            <TouchableOpacity className=' px-4 py-3 rounded-full bg-zinc-900 '>
                <Text className='text-red-500 font-bold text-lg'>Non-vegetarian</Text>
            </TouchableOpacity>
            <TouchableOpacity className=' px-4 py-3 rounded-full bg-zinc-900 '>
                <Text className='text-blue-500 font-bold text-lg'>Vegan</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SearchSuggestion