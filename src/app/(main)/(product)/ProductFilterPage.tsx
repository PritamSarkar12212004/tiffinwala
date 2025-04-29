import { View, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Color from '@/src/constants/color/Color'
import { useRouter } from 'expo-router'
import { userContext } from '@/src/utils/context/ContextApi'
import useFilterProductApi from '@/src/hooks/product-api/useFilterProductApi'
import FilterCard from '@/src/components/cards/filter/FilterCard'



const ProductFilterPage = () => {
    const router = useRouter();
    const { filters, setFilters } = userContext();


    const { filterProduct } = useFilterProductApi();
    const [data, setData] = useState<any>()
    useEffect(() => {
        filterProduct(filters, setData)
        return () => {
            setFilters({
                priceRange: [0, 5000],
                sortBy: 'rating' as 'rating' | 'price' | 'distance'
            })
        }
    }, [])


    return (
        <View className="flex-1 bg-zinc-900">
            {/* Header */}
            <View className="bg-[#1A1A1A] p-4">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={24} color={Color.Third} />
                        </TouchableOpacity>
                        <Text className="text-white text-xl font-semibold ml-4">Filtered Results</Text>
                    </View>
                    <TouchableOpacity
                        className="bg-[#FF6B35] px-4 py-2 rounded-full"
                        onPress={() => router.back()}
                    >
                        <Text className="text-white">Change Filters</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Results Count */}
            <View className="p-4 border-b border-gray-800">
                <Text className="text-gray-400">
                    Showing <Text className="text-white font-semibold">{data?.length ? data?.length : 0}</Text> results
                </Text>
            </View>

            {/* Products List */}
            <FlatList
                data={data}
                renderItem={({ item }) => <FilterCard item={item} />}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}
                ListEmptyComponent={() => (
                    <View className="items-center justify-center py-8">
                        <Ionicons name="search-outline" size={48} color={Color.Third} />
                        <Text className="text-white text-lg mt-4">No products found</Text>
                        <Text className="text-gray-400 mt-2">Try adjusting your filters</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default ProductFilterPage