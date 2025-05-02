import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { useNavigation, useRouter } from 'expo-router'
import { userContext } from '@/src/utils/context/ContextApi'

const MainSearchCard = ({ item }: { item: any }) => {
    const { setMainData } = userContext()
    const navigation = useNavigation()
    const handelNavigate = () => {
        setMainData(item)
        navigation.navigate("ShowProduct" as never)
    }
    return (

        <TouchableOpacity
            activeOpacity={0.8}
            className="bg-[#2D2D2D] rounded-xl p-4 mb-3"
            onPress={() => {
                handelNavigate()
            }}
        >
            <View className="flex-row">
                <View className="w-20 h-20 rounded-lg bg-gray-700" >
                    <Image source={{ uri: item.postCoverImage[0] }} className="w-full h-full rounded-lg" />
                </View>
                <View className="flex-1 ml-3">
                    <Text className="text-gray-400 text-sm">{item.postTitle}</Text>
                    <View className="flex-row items-center mt-1">
                        <Entypo name="heart" size={16} color="red" />
                        <Text className="text-gray-400 ml-1">{item.totalLikes}</Text>
                        <Text className="text-white ml-4">₹{item.postPrice}</Text>
                        <Text className="text-gray-400 ml-4">{item.distance}km</Text>
                    </View>
                    <View className="flex-row items-center mt-1">
                        <AntDesign name="eyeo" size={16} color="gray" />
                        <Text className="text-gray-400 ml-1">{item.totalViews}</Text>

                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MainSearchCard