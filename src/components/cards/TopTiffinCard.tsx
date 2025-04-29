import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Color from '@/src/constants/color/Color'
import { useRouter } from 'expo-router'
import { userContext } from '@/src/utils/context/ContextApi'

interface TopTiffinCardProps {
    item: {
        _id: string;
        postTitle: string;
        price?: number;
        rating?: number;
        image?: string;
        cuisine?: string;
        deliveryTime?: string;
        totalLikes?: number;
        totalViews?: number;
    }
}

const TopTiffinCard = ({ item }: TopTiffinCardProps) => {
    const { setMainData } = userContext();

    const router = useRouter();
    const navigatePage = () => {
        setMainData(item)
        router.push('/ShowProduct')
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            className="bg-[#2D2D2D] rounded-xl overflow-hidden mb-4"
            onPress={() => navigatePage()}
        >
            {/* Image Container */}
            <View className="h-40 relative">
                <Image
                    source={{ uri: item.postCoverImage[0] }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
                {/* Rating Badge */}
                {item.rating && (
                    <View className="absolute top-2 right-2 bg-[#FF6B35] px-2 py-1 rounded-full flex-row items-center">
                        <Ionicons name="star" size={14} color="white" />
                        <Text className="text-white text-xs font-semibold ml-1">{item.rating}</Text>
                    </View>
                )}
            </View>
            {/* Content Container */}
            <View className="p-4">
                <Text className="text-white text-lg font-semibold mb-2">{item.postTitle}</Text>
                {/* Stats Row */}
                <View className="flex-row items-center space-x-4 gap-2">
                    {/* Likes */}
                    <View className="flex-row items-center">
                        <Ionicons name="heart" size={16} color={Color.Third} />
                        <Text className="text-white ml-1 font-bold">{item.productLikes?.length || 0}</Text>
                    </View>
                    {/* Views */}
                    <View className="flex-row items-center">
                        <Ionicons name="eye" size={16} color={Color.Third} />
                        <Text className="text-gray-400 text-sm ml-1">{item.postTotalViews || 0}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default TopTiffinCard 