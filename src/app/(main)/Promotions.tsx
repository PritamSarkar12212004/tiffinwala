import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import SettingsPageLayout from '@/src/components/layout/SettingsPageLayout'
import { useNavigation } from 'expo-router';
const Promotions = () => {
    const navigation = useNavigation()

    const [promotions] = useState([
        {
            id: 1,
            title: "Summer Special",
            description: "Get 20% off on monthly subscriptions",
            startDate: "2024-03-01",
            endDate: "2024-05-31",
            status: "active",
            views: 1200,
            clicks: 150
        },
        {
            id: 2,
            title: "New Year Offer",
            description: "First month subscription at 50% off",
            startDate: "2024-01-01",
            endDate: "2024-01-31",
            status: "ended",
            views: 2500,
            clicks: 300
        },
        {
            id: 3,
            title: "Weekend Special",
            description: "Special menu for weekend customers",
            startDate: "2024-03-15",
            endDate: "2024-03-17",
            status: "scheduled",
            views: 0,
            clicks: 0
        }
    ]);

    return (
        <SettingsPageLayout title="Promotions">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-zinc-400 text-sm">Manage your promotions</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("NewPromotion")} className="bg-[#FFD700] px-4 py-2 rounded-lg flex-row items-center">
                        <Ionicons name="add-outline" size={20} color="black" />
                        <Text className="text-black font-semibold ml-2">New Promotion</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex gap-4">
                    {promotions.map((promo) => (
                        <View key={promo.id} className="bg-zinc-800 rounded-xl p-4">
                            <View className="flex-row justify-between items-start mb-2">
                                <View className="flex-1">
                                    <Text className="text-white text-lg font-semibold">{promo.title}</Text>
                                    <Text className="text-zinc-400 text-sm mt-1">{promo.description}</Text>
                                </View>
                                <View className={`px-2 py-1 rounded-full ${promo.status === 'active' ? 'bg-green-500/20' :
                                    promo.status === 'ended' ? 'bg-red-500/20' :
                                        'bg-yellow-500/20'
                                    }`}>
                                    <Text className={`text-xs ${promo.status === 'active' ? 'text-green-500' :
                                        promo.status === 'ended' ? 'text-red-500' :
                                            'text-yellow-500'
                                        }`}>
                                        {promo.status.charAt(0).toUpperCase() + promo.status.slice(1)}
                                    </Text>
                                </View>
                            </View>

                            <View className="flex-row justify-between items-center mt-4">
                                <View className="flex-row items-center">
                                    <Ionicons name="eye-outline" size={20} color="#FFD700" />
                                    <Text className="text-zinc-400 ml-1">{promo.views}</Text>
                                    <Text className="text-zinc-400 ml-1">{promo.clicks}</Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Ionicons name="calendar-outline" size={20} color="#FFD700" />
                                    <Text className="text-zinc-400 ml-1">
                                        {new Date(promo.startDate).toLocaleDateString()} - {new Date(promo.endDate).toLocaleDateString()}
                                    </Text>
                                </View>
                            </View>

                            <View className="flex-row gap-2 mt-4">
                                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("EditPromotion")} className="flex-1 bg-zinc-700 py-2 rounded-lg flex-row items-center justify-center">
                                    <Ionicons name="pencil-outline" size={20} color="#FFD700" />
                                    <Text className="text-white ml-2">Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("promotion-analytics")} className="flex-1 bg-zinc-700 py-2 rounded-lg flex-row items-center justify-center">
                                    <Ionicons name="analytics-outline" size={20} color="#FFD700" />
                                    <Text className="text-white ml-2">Analytics</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

                <View className="mt-6 bg-zinc-800 rounded-xl p-4">
                    <Text className="text-white text-lg font-semibold mb-2">Promotion Analytics</Text>
                    <View className="flex-row justify-between items-center">
                        <View>
                            <Text className="text-zinc-400 text-sm">Total Views</Text>
                            <Text className="text-white text-xl font-semibold">3,700</Text>
                        </View>
                        <View>
                            <Text className="text-zinc-400 text-sm">Total Clicks</Text>
                            <Text className="text-white text-xl font-semibold">450</Text>
                        </View>
                        <View>
                            <Text className="text-zinc-400 text-sm">Conversion Rate</Text>
                            <Text className="text-white text-xl font-semibold">12.2%</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SettingsPageLayout>
    )
}

export default Promotions 