import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { userContext } from '@/src/utils/context/ContextApi';

const FilterCard = ({ item }: { item: any }) => {
    const { setMainData } = userContext()
    const navigatePage = () => {
        setMainData(item)
        router.push('/ShowProduct')
    }
    return (
        <TouchableOpacity
            onPress={() => navigatePage()}
            activeOpacity={0.8}
            className="bg-[#2D2D2D] rounded-xl p-4 mb-3"
        >
            <View className="flex-row">
                <View className="w-24 h-24 rounded-lg bg-gray-700">
                    <Image
                        source={{ uri: item.postCoverImage[0] }}
                        className="w-full h-full rounded-lg"
                        resizeMode="cover"
                    />
                </View>
                <View className="flex-1 ml-3">
                    <View className="flex-row justify-between items-start">
                        <Text className="text-white font-semibold text-lg flex-1">{item.postTitle}</Text>
                        {item.isVeg && (
                            <View className="bg-green-500 rounded-full px-2 py-1">
                                <Text className="text-white text-xs">Veg</Text>
                            </View>
                        )}
                    </View>
                    <Text className="text-gray-400 text-sm">
                        {item.postDescription.length > 20
                            ? item.postDescription.slice(0, 20) + '...'
                            : item.postDescription}
                    </Text>
                    <View className="flex-row items-center mt-1">
                        <AntDesign name="heart" size={14} color="red" />
                        <Text className="text-white ml-1 font-bold">{item.productLikes?.length || 0}</Text>
                        <Text className="text-white ml-4">₹{item.postPrice}</Text>
                        <Text className="text-gray-400 ml-4">{item.distance}km</Text>
                    </View>
                    {/* <Text className="text-gray-400 text-xs mt-1">{item.cuisine}</Text> */}
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default FilterCard