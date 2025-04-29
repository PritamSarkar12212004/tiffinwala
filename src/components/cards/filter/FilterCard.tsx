import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const FilterCard = ({ item }: { item: any }) => {
    return (
        <TouchableOpacity
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
                    {/* <Text className="text-gray-400 text-sm">{item.restaurant}</Text> */}
                    <View className="flex-row items-center mt-1">
                        <Ionicons name="star" size={16} color="#FFD700" />
                        <Text className="text-gray-400 ml-1">10</Text>
                        <Text className="text-white ml-4">₹{item.postPrice}</Text>
                        {/* <Text className="text-gray-400 ml-4">{item.distance}km</Text> */}
                    </View>
                    {/* <Text className="text-gray-400 text-xs mt-1">{item.cuisine}</Text> */}
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default FilterCard