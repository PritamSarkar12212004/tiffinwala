import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

interface PromotionData {
    title: string;
    description: string;
    type: 'featured' | 'sponsored' | 'boost';
    startDate: string;
    endDate: string;
    budget: string;
}

const NewPromotion = () => {
    const router = useRouter();
    const [promotion, setPromotion] = useState<PromotionData>({
        title: "",
        description: "",
        type: "featured",
        startDate: "",
        endDate: "",
        budget: ""
    });

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
        // TODO: Implement promotion creation
        router.back();
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
                <Text className="text-white text-xl font-semibold">Create Promotion</Text>
            </View>

            <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
                <View className="flex gap-3">
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
                        <View className="flex gap-3">
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

                <TouchableOpacity 
                    className="bg-[#FFD700] rounded-xl p-4 mt-6 mb-6"
                    onPress={handleSubmit}
                >
                    <Text className="text-black text-lg font-semibold text-center">Create Promotion</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default NewPromotion 