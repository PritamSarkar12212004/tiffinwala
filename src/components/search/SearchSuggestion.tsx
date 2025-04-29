import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Color from '@/src/constants/color/Color'
import useTop3ProductApi from '@/src/hooks/product-api/useTop3ProductApi';
import TopTiffinCard from '@/src/components/cards/TopTiffinCard';

interface SearchSuggestionProps {
    onCategoryPress: (category: string) => void;
    onSuggestionPress: (suggestion: string) => void;
}

const SearchSuggestion = ({ onCategoryPress, onSuggestionPress }: SearchSuggestionProps) => {
    const categories = [
        { name: "Veg", icon: "leaf" },
        { name: "Non-Veg", icon: "restaurant" },
        { name: "Breakfast", icon: "sunny" },
        { name: "Lunch", icon: "time" },
        { name: "Dinner", icon: "moon" },
        { name: "Snacks", icon: "cafe" }
    ];
    const { top3ProductFinder } = useTop3ProductApi()
    const [data, setData] = useState<any>(null)
    useEffect(() => {
        top3ProductFinder(setData)
        return () => {
            setData(null)
        }
    }, [])

    return (
        <View className="px-4">
            {/* Top Tiffin Services */}
            <View className="mb-6">
                <Text className="text-white text-lg font-semibold mb-3">Top Tiffin Services</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="flex-row"
                >
                    {data?.map((item: any) => (
                        <View key={item._id} className="w-72 mr-4">
                            <TopTiffinCard item={item} />
                        </View>
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