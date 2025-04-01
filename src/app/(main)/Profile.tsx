import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import PageNavigation from '@/src/components/navigation/PageNavigation'
import BgColor from '@/src/constants/color/BgColor'
import ProfilePost from '@/src/components/layout/ProfilePost';
import ProfilePromotion from '@/src/components/layout/ProfilePromotion';
import ProfileOptions from '@/src/components/layout/ProfileOptions';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
const Profile = () => {
    const navigation = useNavigation()
    const stats = [
        { label: "Posts", value: "24" },
        { label: "Reviews", value: "156" },
        { label: "Orders", value: "89" },
        { label: "Points", value: "1.2k" }
    ];

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
                                    source={{ uri: "https://i.pinimg.com/736x/bc/36/5e/bc365e7fba523aae944ce0952c00f1dc.jpg" }}
                                    className="w-24 h-24 rounded-full border-2 border-[#FFD700]"
                                    resizeMode="cover"
                                />
                                <TouchableOpacity className="absolute bottom-0 right-0 bg-[#FFD700] p-2 rounded-full">
                                    <Ionicons name="camera" size={16} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View className="flex-1">
                                <Text className="text-white text-2xl font-bold">Pritam Sarkar</Text>
                                <View className="flex-row items-center gap-2 mt-1">
                                    <Ionicons name="call" size={16} color="#FFD700" />
                                    <Text className="text-zinc-400">+91 9876543210</Text>
                                </View>
                                <View className="flex-row items-center gap-2 mt-1">
                                    <Ionicons name="location" size={16} color="#FFD700" />
                                    <Text className="text-zinc-400 text-sm">Kolkata, West Bengal</Text>
                                </View>
                            </View>
                        </View>

                        {/* Stats Section */}
                        <View className="flex-row justify-between mt-6 bg-zinc-800 p-4 rounded-xl">
                            {stats.map((stat, index) => (
                                <View key={index} className="items-center">
                                    <Text className="text-white text-xl font-bold">{stat.value}</Text>
                                    <Text className="text-zinc-400 text-sm">{stat.label}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Action Buttons */}
                        <View className="flex-row gap-3 mt-4">
                            <TouchableOpacity activeOpacity={0.8}
                                onPress={() => navigation.navigate("ProfileEdit")}
                                className="flex-1 bg-[#FFD700] py-3 rounded-xl flex-row items-center justify-center gap-2">
                                <Ionicons name="pencil" size={20} color="black" />
                                <Text className="text-black font-semibold">Edit Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="w-12 h-12 bg-zinc-800 rounded-xl items-center justify-center">
                                <Ionicons name="settings-outline" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Content Sections */}
                    <View className="px-4">
                        <ProfilePost />
                        <ProfilePromotion />
                        <ProfileOptions />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default Profile