import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Color from '@/src/constants/color/Color'
import useTop3ProductApi from '@/src/hooks/product-api/useTop3ProductApi';
import TopTiffinCard from '@/src/components/cards/TopTiffinCard';

interface SearchSuggestionProps {
    onCategoryPress: (category: string) => void;
    onSuggestionPress: (suggestion: string) => void;
}

const LoadingSkeleton = () => (
    <View className="w-72 mr-4">
        <View className="bg-[#2D2D2D] rounded-xl overflow-hidden mb-4">
            <View className="h-40 bg-gray-700 animate-pulse" />
            <View className="p-4">
                <View className="h-6 bg-gray-700 rounded-md w-3/4 mb-2 animate-pulse" />
                <View className="flex-row items-center space-x-4">
                    <View className="h-4 bg-gray-700 rounded-md w-16 animate-pulse" />
                    <View className="h-4 bg-gray-700 rounded-md w-16 animate-pulse" />
                </View>
            </View>
        </View>
    </View>
);

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
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            await top3ProductFinder(setData)
            setIsLoading(false)
        }
        fetchData()
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
                    {isLoading ? (
                        // Show 3 loading skeletons
                        <>
                            <LoadingSkeleton />
                            <LoadingSkeleton />
                            <LoadingSkeleton />
                        </>
                    ) : (
                        data?.map((item: any) => (
                            <View key={item._id} className="w-72 mr-4">
                                <TopTiffinCard item={item} />
                            </View>
                        ))
                    )}
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