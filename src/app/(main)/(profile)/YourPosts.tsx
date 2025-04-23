import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import SettingsPageLayout from '@/src/components/layout/SettingsPageLayout'
import { useRouter } from 'expo-router'
import { userContext } from '@/src/utils/context/ContextApi'
import { FlatList } from 'react-native-gesture-handler'

interface Post {
    postCoverImage: string[];
    postTitle: string;
    postDescription: string;
    productLikes: number;
    postPrice: string;
    postStatus: 'Active' | 'Inactive';
}

const YourPosts = () => {
    const { product } = userContext()
    const router = useRouter()

    const renderPost = ({ item }: { item: Post }) => {
        return (
            <View className="bg-zinc-800 rounded-xl overflow-hidden mb-5">
                <View className="relative">
                    <View className="w-full h-48 bg-zinc-700 items-center justify-center">
                        {item.postCoverImage[0] ? (
                            <Image
                                source={{ uri: item.postCoverImage[0] }}
                                className="w-full h-full"
                            />
                        ) : (
                            <Ionicons name="image-outline" size={40} color="#FFD700" />
                        )}
                    </View>
                    <View className="absolute top-2 right-2">
                        <TouchableOpacity className="w-8 h-8 rounded-full bg-zinc-900 items-center justify-center">
                            <Ionicons name="ellipsis-vertical" size={20} color="#FFD700" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="p-4">
                    <View className="flex-row justify-between items-start mb-2">
                        <View className="flex-1">
                            <Text className="text-white text-lg font-semibold">{item.postTitle}</Text>
                            <Text className="text-zinc-400 text-sm mt-1">{item.postDescription}</Text>
                        </View>
                        <View className={`px-2 py-1 rounded-full ${item.postStatus === 'Active' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                            <Text className={`text-xs ${item.postStatus === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                                {
                                    item.postStatus ? "Active" : "Inactive"
                                }
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row justify-between items-center mt-4">
                        <View className="flex-row items-center">
                            <Ionicons name="heart-outline" size={20} color="#FFD700" />
                            <Text className="text-zinc-400 ml-1">{item.productLikes || 0}</Text>
                        </View>
                        <Text className="text-[#FFD700] font-semibold">{item.postPrice}</Text>
                    </View>

                    <View className="flex-row gap-2 mt-4">
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => router.push("/(main)/(product)/EditPost")}
                            className="flex-1 bg-zinc-700 py-2 rounded-lg flex-row items-center justify-center"
                        >
                            <Ionicons name="pencil-outline" size={20} color="#FFD700" />
                            <Text className="text-white ml-2">Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => router.push("/(main)/(product)/post-view")}
                            className="flex-1 bg-zinc-700 py-2 rounded-lg flex-row items-center justify-center"
                        >
                            <Ionicons name="eye-outline" size={20} color="#FFD700" />
                            <Text className="text-white ml-2">View</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <SettingsPageLayout title="Your Posts">
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-zinc-400 text-sm">Manage your posts</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => router.push("/(main)/(product)/NewPost")}
                    className="bg-[#FFD700] px-4 py-2 rounded-lg flex-row items-center"
                >
                    <Ionicons name="add-outline" size={20} color="black" />
                    <Text className="text-black font-semibold ml-2">New Post</Text>
                </TouchableOpacity>
            </View>
            <View className="flex gap-4 mb-20">
                <FlatList
                    data={product}
                    renderItem={renderPost}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SettingsPageLayout>
    )
}

export default YourPosts 