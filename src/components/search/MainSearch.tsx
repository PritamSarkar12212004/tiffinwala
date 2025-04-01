import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const MainSearch = ({ search, setSearch }: any) => {
    const setInput = (text: string) => {
        setSearch(text)
    }
    const clearInput = () => {
        setSearch("")
    }
    return (
        <View className='w-full flex px-2 rounded-3xl'>
            <View className='w-full flex  flex-row items-center  justify-between bg-zinc-900/60 rounded-3xl  px-3'>
                <AntDesign name="search1" size={30} color="gray" />
                <TextInput value={search} onChangeText={(text) => setInput(text)} className='flex-auto h-16    flex px-5 flex-row items-center gap-3 placeholder:text-white/40 text-white text-lg font-bold' placeholder='Mess name, Area name' />
                {
                    search.length > 0 && (
                        <TouchableOpacity activeOpacity={0.8} onPress={clearInput}>

                            <MaterialIcons name="cancel" size={24} color="gray" onPress={() => setInput("")} />
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    )
}

export default MainSearch