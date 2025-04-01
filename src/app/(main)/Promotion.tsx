import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

interface Promotion {
    id: string;
    title: string;
    description: string;
    image: string | null;
    startDate: string;
    endDate: string;
    status: 'active' | 'scheduled' | 'ended';
    type: 'featured' | 'sponsored' | 'boost';
}

const Promotion = () => {
    const router = useRouter();

    // Dummy data
    const promotions: Promotion[] = [
        {
            id: '1',
            title: 'Featured Listing',
            description: 'Your post will be featured at the top of search results',
            image: null,
            startDate: '2024-03-20',
            endDate: '2024-04-20',
            status: 'active',
            type: 'featured'
        },
        {
            id: '2',
            title: 'Sponsored Post',
            description: 'Your post will be shown to more users',
            image: null,
            startDate: '2024-03-25',
            endDate: '2024-04-25',
            status: 'scheduled',
            type: 'sponsored'
        },
        {
            id: '3',
            title: 'Post Boost',
            description: 'Increase visibility of your post',
            image: null,
            startDate: '2024-03-15',
            endDate: '2024-04-15',
            status: 'ended',
            type: 'boost'
        }
    ];

    const getStatusColor = (status: Promotion['status']) => {
        switch (status) {
            case 'active':
                return 'bg-green-500';
            case 'scheduled':
                return 'bg-blue-500';
            case 'ended':
                return 'bg-zinc-500';
        }
    };

    const getTypeIcon = (type: Promotion['type']) => {
        switch (type) {
            case 'featured':
                return 'star';
            case 'sponsored':
                return 'megaphone';
            case 'boost':
                return 'trending-up';
        }
    };

    return (
        <View className="flex-1 bg-zinc-900">
            <View className="flex-row items-center p-4 border-b border-zinc-800">
                <TouchableOpacity 
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-zinc-800 items-center justify-center mr-3"
                >
                    <Ionicons name="arrow-back" size={24} color="#FFD700" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-semibold">Promotions</Text>
            </View>

            <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
                <View className="space-y-4">
                    {/* New Promotion Button */}
                    <TouchableOpacity 
                        className="bg-[#FFD700] rounded-xl p-4 flex-row items-center justify-center"
                        onPress={() => router.push('/NewPromotion')}
                    >
                        <Ionicons name="add-circle-outline" size={24} color="black" />
                        <Text className="text-black text-lg font-semibold ml-2">Create New Promotion</Text>
                    </TouchableOpacity>

                    {/* Active Promotions */}
                    <View>
                        <Text className="text-white text-lg font-semibold mb-4">Active Promotions</Text>
                        <View className="space-y-4">
                            {promotions
                                .filter(promo => promo.status === 'active')
                                .map(promo => (
                                    <TouchableOpacity 
                                        key={promo.id}
                                        className="bg-zinc-800 rounded-xl p-4"
                                        onPress={() => router.push(`/EditPromotion?id=${promo.id}`)}
                                    >
                                        <View className="flex-row items-center justify-between mb-2">
                                            <View className="flex-row items-center">
                                                <View className="w-10 h-10 rounded-full bg-zinc-700 items-center justify-center mr-3">
                                                    <Ionicons name={getTypeIcon(promo.type)} size={20} color="#FFD700" />
                                                </View>
                                                <Text className="text-white text-lg font-semibold">{promo.title}</Text>
                                            </View>
                                            <View className={`px-3 py-1 rounded-full ${getStatusColor(promo.status)}`}>
                                                <Text className="text-white text-sm font-medium">Active</Text>
                                            </View>
                                        </View>
                                        <Text className="text-zinc-400 mb-2">{promo.description}</Text>
                                        <View className="flex-row justify-between">
                                            <Text className="text-zinc-500 text-sm">
                                                {new Date(promo.startDate).toLocaleDateString()} - {new Date(promo.endDate).toLocaleDateString()}
                                            </Text>
                                            <TouchableOpacity 
                                                className="bg-red-500 px-3 py-1 rounded-full"
                                                onPress={() => {}}
                                            >
                                                <Text className="text-white text-sm font-medium">Cancel</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                        </View>
                    </View>

                    {/* Scheduled Promotions */}
                    <View>
                        <Text className="text-white text-lg font-semibold mb-4">Scheduled Promotions</Text>
                        <View className="space-y-4">
                            {promotions
                                .filter(promo => promo.status === 'scheduled')
                                .map(promo => (
                                    <TouchableOpacity 
                                        key={promo.id}
                                        className="bg-zinc-800 rounded-xl p-4"
                                        onPress={() => router.push(`/EditPromotion?id=${promo.id}`)}
                                    >
                                        <View className="flex-row items-center justify-between mb-2">
                                            <View className="flex-row items-center">
                                                <View className="w-10 h-10 rounded-full bg-zinc-700 items-center justify-center mr-3">
                                                    <Ionicons name={getTypeIcon(promo.type)} size={20} color="#FFD700" />
                                                </View>
                                                <Text className="text-white text-lg font-semibold">{promo.title}</Text>
                                            </View>
                                            <View className={`px-3 py-1 rounded-full ${getStatusColor(promo.status)}`}>
                                                <Text className="text-white text-sm font-medium">Scheduled</Text>
                                            </View>
                                        </View>
                                        <Text className="text-zinc-400 mb-2">{promo.description}</Text>
                                        <View className="flex-row justify-between">
                                            <Text className="text-zinc-500 text-sm">
                                                Starts on {new Date(promo.startDate).toLocaleDateString()}
                                            </Text>
                                            <TouchableOpacity 
                                                className="bg-red-500 px-3 py-1 rounded-full"
                                                onPress={() => {}}
                                            >
                                                <Text className="text-white text-sm font-medium">Cancel</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                        </View>
                    </View>

                    {/* Past Promotions */}
                    <View>
                        <Text className="text-white text-lg font-semibold mb-4">Past Promotions</Text>
                        <View className="space-y-4">
                            {promotions
                                .filter(promo => promo.status === 'ended')
                                .map(promo => (
                                    <TouchableOpacity 
                                        key={promo.id}
                                        className="bg-zinc-800 rounded-xl p-4"
                                        onPress={() => router.push(`/ViewPromotion?id=${promo.id}`)}
                                    >
                                        <View className="flex-row items-center justify-between mb-2">
                                            <View className="flex-row items-center">
                                                <View className="w-10 h-10 rounded-full bg-zinc-700 items-center justify-center mr-3">
                                                    <Ionicons name={getTypeIcon(promo.type)} size={20} color="#FFD700" />
                                                </View>
                                                <Text className="text-white text-lg font-semibold">{promo.title}</Text>
                                            </View>
                                            <View className={`px-3 py-1 rounded-full ${getStatusColor(promo.status)}`}>
                                                <Text className="text-white text-sm font-medium">Ended</Text>
                                            </View>
                                        </View>
                                        <Text className="text-zinc-400 mb-2">{promo.description}</Text>
                                        <Text className="text-zinc-500 text-sm">
                                            {new Date(promo.startDate).toLocaleDateString()} - {new Date(promo.endDate).toLocaleDateString()}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Promotion 