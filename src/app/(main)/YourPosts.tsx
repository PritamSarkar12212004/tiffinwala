import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import SettingsPageLayout from '@/src/components/layout/SettingsPageLayout'
import { useNavigation } from 'expo-router'

const YourPosts = () => {
    const navigation = useNavigation()

    const [posts] = useState([
        {
            id: 1,
            title: "Delicious Home Made Food",
            description: "Fresh and healthy tiffin service available",
            price: "₹2000/month",
            image: "https://example.com/food1.jpg",
            likes: 120,
            comments: 15,
            status: "active"
        },
        {
            id: 2,
            title: "Special Weekend Menu",
            description: "Exclusive weekend special dishes",
            price: "₹500/weekend",
            image: "https://example.com/food2.jpg",
            likes: 85,
            comments: 8,
            status: "active"
        },
        {
            id: 3,
            title: "Monthly Subscription",
            description: "Subscribe for monthly tiffin service",
            price: "₹1800/month",
            image: "https://example.com/food3.jpg",
            likes: 45,
            comments: 5,
            status: "inactive"
        }
    ]);

    return (
        <SettingsPageLayout title="Your Posts">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-zinc-400 text-sm">Manage your posts</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("NewPost")} className="bg-[#FFD700] px-4 py-2 rounded-lg flex-row items-center">
                        <Ionicons name="add-outline" size={20} color="black" />
                        <Text className="text-black font-semibold ml-2">New Post</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex gap-4">
                    {posts.map((post) => (
                        <View key={post.id} className="bg-zinc-800 rounded-xl overflow-hidden">
                            <View className="relative">
                                <View className="w-full h-48 bg-zinc-700 items-center justify-center">
                                    {post.image ? (
                                        <Image
                                            source={{ uri: post.image }}
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
                                        <Text className="text-white text-lg font-semibold">{post.title}</Text>
                                        <Text className="text-zinc-400 text-sm mt-1">{post.description}</Text>
                                    </View>
                                    <View className={`px-2 py-1 rounded-full ${post.status === 'active' ? 'bg-green-500/20' : 'bg-red-500/20'
                                        }`}>
                                        <Text className={`text-xs ${post.status === 'active' ? 'text-green-500' : 'text-red-500'
                                            }`}>
                                            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                                        </Text>
                                    </View>
                                </View>

                                <View className="flex-row justify-between items-center mt-4">
                                    <View className="flex-row items-center">
                                        <Ionicons name="heart-outline" size={20} color="#FFD700" />
                                        <Text className="text-zinc-400 ml-1">{post.likes}</Text>
                                        <Ionicons name="chatbubble-outline" size={20} color="#FFD700" className="ml-4" />
                                        <Text className="text-zinc-400 ml-1">{post.comments}</Text>
                                    </View>
                                    <Text className="text-[#FFD700] font-semibold">{post.price}</Text>
                                </View>

                                <View className="flex-row gap-2 mt-4">
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("EditPost")} className="flex-1 bg-zinc-700 py-2 rounded-lg flex-row items-center justify-center">
                                        <Ionicons name="pencil-outline" size={20} color="#FFD700" />
                                        <Text className="text-white ml-2">Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate("post-view")} className="flex-1 bg-zinc-700 py-2 rounded-lg flex-row items-center justify-center">
                                        <Ionicons name="eye-outline" size={20} color="#FFD700" />
                                        <Text className="text-white ml-2">View</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SettingsPageLayout>
    )
}

export default YourPosts 