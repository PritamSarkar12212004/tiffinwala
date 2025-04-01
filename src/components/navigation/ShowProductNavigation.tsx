import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from 'expo-router';
const ShowProductNavigation = () => {
  const navigation = useNavigation()
  const [isFavorite, setIsFavorite] = useState(false)
  return (

    <View className=' top-0  w-full flex flex-row absolute items-center justify-between px-2 py-3' style={{ zIndex: 5 }}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} className='w-14 h-14 bg-zinc-600/60 rounded-full flex items-center justify-center'>
        <Feather name="arrow-left" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setIsFavorite(!isFavorite)} className='w-14 h-14 bg-zinc-600/60 rounded-full flex items-center justify-center'>

        {
          isFavorite ? (
            <Feather name="heart" size={30} color="red" />
          ) : (
            <Feather name="heart" size={30} color="white" />
          )
        }
      </TouchableOpacity>

    </View>
  )
}

export default ShowProductNavigation