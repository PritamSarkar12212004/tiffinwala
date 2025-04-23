import { View, Text, TouchableOpacity, Dimensions, Image, } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const PostProductProfilecard = ({ item }: { item: any }) => {
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const { width } = Dimensions.get('window');

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            className='mr-4 bg-zinc-800 rounded-xl overflow-hidden'
            style={{ width: width * 0.7 }}
        >
            <View className="relative">
                <Image
                    source={{ uri: item.postCoverImage[0] }}
                    className='w-full h-48'
                    resizeMode='cover'

                />
                <View className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded-full">
                    <Text className="text-white text-xs">{formatDate(item.createdAt)}</Text>
                </View>
            </View>
            <View className="p-3">
                <Text className='text-white text-lg font-semibold mb-2'>{item.postTitle}</Text>
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-4">
                        <View className="flex-row items-center gap-1">
                            <Ionicons name="heart" size={16} color="#FF6B6B" />
                            <Text className="text-zinc-400 text-sm">{item.likes}</Text>
                        </View>

                    </View>
                    <TouchableOpacity className="bg-[#FFD700] p-2 rounded-full">
                        <Ionicons name="share-outline" size={16} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default PostProductProfilecard