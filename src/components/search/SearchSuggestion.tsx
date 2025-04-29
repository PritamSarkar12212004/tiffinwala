import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Color from '@/src/constants/color/Color'

interface SearchSuggestionProps {
    onCategoryPress: (category: string) => void;
    onSuggestionPress: (suggestion: string) => void;
}

const SearchSuggestion = ({ onCategoryPress, onSuggestionPress }: SearchSuggestionProps) => {
    const popularSearches = [
        "North Indian",
        "South Indian",
        "Chinese",
        "Fast Food",
        "Biryani",
        "Pizza",
        "Burger",
        "Desserts"
    ];

    const categories = [
        { name: "Veg", icon: "leaf" },
        { name: "Non-Veg", icon: "restaurant" },
        { name: "Breakfast", icon: "sunny" },
        { name: "Lunch", icon: "time" },
        { name: "Dinner", icon: "moon" },
        { name: "Snacks", icon: "cafe" }
    ];

    return (
        <View className="px-4">
            {/* Popular Searches */}
            <View className="mb-6">
                <Text className="text-white text-lg font-semibold mb-3">Popular Searches</Text>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    className="flex-row"
                >
                    {popularSearches.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            className="bg-[#2D2D2D] rounded-full px-4 py-2 mr-2"
                            onPress={() => onSuggestionPress(item)}
                        >
                            <Text className="text-white">{item}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Categories */}
            <View>
                <Text className="text-white text-lg font-semibold mb-3">Categories</Text>
                <View className="flex-row flex-wrap justify-between">
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            className="w-[48%] bg-[#2D2D2D] rounded-xl p-4 mb-4"
                            onPress={() => onCategoryPress(category.name)}
                        >
                            <View className="flex-row items-center">
                                <Ionicons name={category.icon as any} size={24} color={Color.Third} />
                                <Text className="text-white ml-2 font-semibold">{category.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            
        </View>
    )
}

export default SearchSuggestion