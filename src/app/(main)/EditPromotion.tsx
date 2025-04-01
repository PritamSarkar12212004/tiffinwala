import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, useLocalSearchParams } from 'expo-router'

interface PromotionData {
    id: string;
    title: string;
    description: string;
    type: 'featured' | 'sponsored' | 'boost';
    startDate: string;
    endDate: string;
    budget: string;
    status: 'active' | 'scheduled' | 'ended';
}

const EditPromotion = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [promotion, setPromotion] = useState<PromotionData>({
        id: "",
        title: "",
        description: "",
        type: "featured",
        startDate: "",
        endDate: "",
        budget: "",
        status: "active"
    });

    useEffect(() => {
        // TODO: Fetch promotion data using params.id
        // For now using dummy data
        setPromotion({
            id: params.id as string,
            title: "Featured Listing",
            description: "Your post will be featured at the top of search results",
            type: "featured",
            startDate: "2024-03-20",
            endDate: "2024-04-20",
            budget: "500",
            status: "active"
        });
    }, [params.id]);

    const promotionTypes = [
        {
            id: 'featured',
            title: 'Featured Listing',
            description: 'Your post will be featured at the top of search results',
            icon: 'star',
            price: '₹500/week'
        },
        {
            id: 'sponsored',
            title: 'Sponsored Post',
            description: 'Your post will be shown to more users',
            icon: 'megaphone',
            price: '₹1000/week'
        },
        {
            id: 'boost',
            title: 'Post Boost',
            description: 'Increase visibility of your post',
            icon: 'trending-up',
            price: '₹750/week'
        }
    ];

    const handleChange = (key: keyof PromotionData, value: string) => {
        setPromotion(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSubmit = () => {
        // TODO: Implement promotion update
        router.back();
    };

    const handleCancel = () => {
        Alert.alert(
            "Cancel Promotion",
            "Are you sure you want to cancel this promotion?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        // TODO: Implement promotion cancellation
                        router.back();
                    }
                }
            ]
        );
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
                <Text className="text-white text-xl font-semibold">Edit Promotion</Text>
            </View>

            <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
                <View className="flex gap-3">
                    {/* Status */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Status</Text>
                        <View className={`px-3 py-1 rounded-full w-24 ${
                            promotion.status === 'active' ? 'bg-green-500' :
                            promotion.status === 'scheduled' ? 'bg-blue-500' :
                            'bg-zinc-500'
                        }`}>
                            <Text className="text-white text-sm font-medium capitalize">
                                {promotion.status}
                            </Text>
                        </View>
                    </View>

                    {/* Title */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Title</Text>
                        <TextInput
                            value={promotion.title}
                            onChangeText={(value) => handleChange('title', value)}
                            placeholder="Enter promotion title"
                            placeholderTextColor="#71717a"
                            className="text-white bg-zinc-700 rounded-lg p-3"
                        />
                    </View>

                    {/* Description */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Description</Text>
                        <TextInput
                            value={promotion.description}
                            onChangeText={(value) => handleChange('description', value)}
                            placeholder="Describe your promotion"
                            placeholderTextColor="#71717a"
                            className="text-white bg-zinc-700 rounded-lg p-3"
                            multiline
                            numberOfLines={4}
                        />
                    </View>

                    {/* Promotion Type */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Promotion Type</Text>
                        <View className="flex gap-2">
                            {promotionTypes.map((type) => (
                                <TouchableOpacity
                                    key={type.id}
                                    onPress={() => handleChange('type', type.id)}
                                    className={`flex-row items-center p-3 rounded-lg ${
                                        promotion.type === type.id ? 'bg-[#FFD700]' : 'bg-zinc-700'
                                    }`}
                                >
                                    <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                                        promotion.type === type.id ? 'bg-black' : 'bg-zinc-600'
                                    }`}>
                                        <Ionicons name={type.icon as any} size={20} color={promotion.type === type.id ? '#FFD700' : 'white'} />
                                    </View>
                                    <View className="flex-1">
                                        <Text className={`text-lg font-semibold ${
                                            promotion.type === type.id ? 'text-black' : 'text-white'
                                        }`}>
                                            {type.title}
                                        </Text>
                                        <Text className={`${
                                            promotion.type === type.id ? 'text-black' : 'text-zinc-400'
                                        }`}>
                                            {type.description}
                                        </Text>
                                        <Text className={`${
                                            promotion.type === type.id ? 'text-black font-semibold' : 'text-[#FFD700]'
                                        }`}>
                                            {type.price}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Start Date */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Start Date</Text>
                        <TextInput
                            value={promotion.startDate}
                            onChangeText={(value) => handleChange('startDate', value)}
                            placeholder="Select start date"
                            placeholderTextColor="#71717a"
                            className="text-white bg-zinc-700 rounded-lg p-3"
                        />
                    </View>

                    {/* End Date */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">End Date</Text>
                        <TextInput
                            value={promotion.endDate}
                            onChangeText={(value) => handleChange('endDate', value)}
                            placeholder="Select end date"
                            placeholderTextColor="#71717a"
                            className="text-white bg-zinc-700 rounded-lg p-3"
                        />
                    </View>

                    {/* Budget */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Budget</Text>
                        <TextInput
                            value={promotion.budget}
                            onChangeText={(value) => handleChange('budget', value)}
                            placeholder="Enter your budget"
                            placeholderTextColor="#71717a"
                            className="text-white bg-zinc-700 rounded-lg p-3"
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <View className="flex-row gap-4 mt-6 mb-6">
                    <TouchableOpacity 
                        className="flex-1 bg-red-500 rounded-xl p-4"
                        onPress={handleCancel}
                    >
                        <Text className="text-white text-lg font-semibold text-center">Cancel Promotion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        className="flex-1 bg-[#FFD700] rounded-xl p-4"
                        onPress={handleSubmit}
                    >
                        <Text className="text-black text-lg font-semibold text-center">Update Promotion</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default EditPromotion 