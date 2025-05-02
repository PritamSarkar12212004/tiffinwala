import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import PageNavigation from '@/src/components/navigation/PageNavigation'
import ProfilePost from '@/src/components/layout/ProfilePost';
import ProfileOptions from '@/src/components/layout/ProfileOptions';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { userContext } from '@/src/utils/context/ContextApi';
const index = () => {
    const navigation = useNavigation()
    const { userProfile, userTemLocation, product, totalLikes, setTotalLikes, totalViews } = userContext()
    useEffect(() => {
        return () => {
            setTotalLikes(null)
        }
    }, [])
    return (
        <View className='flex-1 bg-black'>
            <SafeAreaView className="flex-1">
                <PageNavigation path="Profile" />
                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    {/* Profile Header */}
                    <View className="p-4">
                        <View className="flex-row items-center gap-4">
                            <View className="relative">
                                <Image
                                    source={{ uri: userProfile?.User_Image }}
                                    className="w-24 h-24 rounded-full border-2 border-[#FFD700]"
                                    resizeMode="cover"
                                />
                                <TouchableOpacity className="absolute bottom-0 right-0 bg-[#FFD700] p-2 rounded-full">
                                    <Ionicons name="camera" size={16} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View className="flex-1">
                                <Text className="text-white text-2xl font-bold">{userProfile?.User_Name}</Text>
                                <View className="flex-row items-center gap-2 mt-1">
                                    <Ionicons name="call" size={16} color="#FFD700" />
                                    <Text className="text-zinc-400">
                                        {userProfile?.User_Phone_Number}
                                    </Text>
                                </View>
                                <View className="flex-row  justify-center gap-2 mt-1">
                                    <Ionicons name="location" size={16} color="#FFD700" />
                                    <Text className="flex-auto text-zinc-400 text-sm">
                                        {userTemLocation?.formattedAddress ? userTemLocation?.formattedAddress : userTemLocation?.address}

                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Stats Section */}
                        <View className="flex-row justify-between mt-6 bg-zinc-800 p-4 px-10 rounded-xl">
                            <View className="items-center">
                                <Text className="text-white text-xl font-bold">{product.length}</Text>
                                <Text className="text-zinc-400 text-sm">Post</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-white text-xl font-bold">{totalLikes === null ? <ActivityIndicator size="small" color="#FFD700" /> : totalLikes}</Text>
                                <Text className="text-zinc-400 text-sm">Likes</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-white text-xl font-bold">{totalViews === null ? <ActivityIndicator size="small" color="#FFD700" /> : totalViews}</Text>
                                <Text className="text-zinc-400 text-sm">Views</Text>
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <View className="flex-row gap-3 mt-4">
                            <TouchableOpacity activeOpacity={0.8}
                                onPress={() => navigation.navigate("ProfileEdit" as never)}
                                className="flex-1 bg-[#FFD700] py-3 rounded-xl flex-row items-center justify-center gap-2">
                                <Ionicons name="pencil" size={20} color="black" />
                                <Text className="text-black font-semibold">Edit Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="w-12 h-12 bg-zinc-800 rounded-xl items-center justify-center"
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate("ProfileEdit" as never)}
                            >
                                <Ionicons name="settings-outline" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Content Sections */}
                    <View className="px-4">
                        <ProfilePost />
                        <ProfileOptions />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default index