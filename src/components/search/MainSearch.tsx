import { View, TextInput, TouchableOpacity, FlatList, Text, ActivityIndicator, Modal, Image } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import Color from '@/src/constants/color/Color'
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router'
import { userContext } from '@/src/utils/context/ContextApi'
import useSearchEngine from '@/src/hooks/product-api/useSearchEngine'
import MainSearchCard from '@/src/components/cards/mainSearch/MainSearchCard'
interface SearchResult {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    restaurant: string;
    rating: number;
    distance: number;
    cuisine: string;
}

interface MainSearchProps {
    search: string;
    setSearch: (value: string) => void;
}

const MainSearch = ({ search, setSearch }: MainSearchProps) => {
    const { filters, setFilters } = userContext();
    const [results, setResults] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    const router = useRouter();

    const navigatePage = () => {
        setShowFilters(false);
        router.push("/(main)/(product)/ProductFilterPage");
    }
    const { searchEngine } = useSearchEngine();
    // Debounced search function
    const debouncedSearch = useCallback(async (query: string) => {
        if (!query.trim()) {
            setResults([]);
            return;
        }
        setLoading(true);
        try {
            setLoading(true);
            searchEngine(query, setResults)
            if (query.trim()) {
                setRecentSearches(prev => {
                    const newSearches = [query, ...prev.filter(s => s !== query)].slice(0, 5);
                    return newSearches;
                });
            }
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    // Effect for debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search.trim()) {
                debouncedSearch(search);
            }
        }, 500);
        return () => {

            clearTimeout(timer);
        }
    }, [search, debouncedSearch]);


    const renderFilters = () => (
        <Modal
            visible={showFilters}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowFilters(false)}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <View className="flex-1 bg-black/50">
                <View className="bg-[#1A1A1A] rounded-t-3xl mt-auto p-4">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-white text-xl font-bold">Filters</Text>
                        <TouchableOpacity onPress={() => setShowFilters(false)}>
                            <Ionicons name="close" size={24} color={Color.Third} />
                        </TouchableOpacity>
                    </View>

                    {/* Price Range */}
                    <View className="mb-4">
                        <Text className="text-white mb-2">Price Range</Text>
                        <View className="flex-row justify-between">
                            <TouchableOpacity
                                className={`px-4 py-2 rounded-full ${filters.priceRange[1] === 2000 ? 'bg-[#FF6B35]' : 'bg-[#2D2D2D]'}`}
                                onPress={() => setFilters(prev => ({ ...prev, priceRange: [0, 2000] }))}
                            >
                                <Text className="text-white">Under ₹2000</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className={`px-4 py-2 rounded-full ${filters.priceRange[1] === 3500 ? 'bg-[#FF6B35]' : 'bg-[#2D2D2D]'}`}
                                onPress={() => setFilters(prev => ({ ...prev, priceRange: [0, 3500] }))}
                            >
                                <Text className="text-white">Under ₹3500</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className={`px-4 py-2 rounded-full ${filters.priceRange[1] === 5000 ? 'bg-[#FF6B35]' : 'bg-[#2D2D2D]'}`}
                                onPress={() => setFilters(prev => ({ ...prev, priceRange: [0, 5000] }))}
                            >
                                <Text className="text-white">Under ₹5000</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Sort By */}
                    <View className="mb-4">
                        <Text className="text-white mb-2">Sort By</Text>
                        <View className="flex-row justify-between">
                            <TouchableOpacity
                                className={`px-4 py-2 rounded-full ${filters.sortBy === 'rating' ? 'bg-[#FF6B35]' : 'bg-[#2D2D2D]'}`}
                                onPress={() => setFilters(prev => ({ ...prev, sortBy: 'rating' }))}
                            >
                                <Text className="text-white">Rating</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className={`px-4 py-2 rounded-full ${filters.sortBy === 'price' ? 'bg-[#FF6B35]' : 'bg-[#2D2D2D]'}`}
                                onPress={() => setFilters(prev => ({ ...prev, sortBy: 'price' }))}
                            >
                                <Text className="text-white">Price</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className={`px-4 py-2 rounded-full ${filters.sortBy === 'distance' ? 'bg-[#FF6B35]' : 'bg-[#2D2D2D]'}`}
                                onPress={() => setFilters(prev => ({ ...prev, sortBy: 'distance' }))}
                            >
                                <Text className="text-white">Distance</Text>
                            </TouchableOpacity>
                        </View>
                    </View>



                    {/* Apply Button */}
                    <TouchableOpacity
                        className="bg-[#FF6B35] rounded-xl p-4"
                        onPress={() => {
                            navigatePage()
                        }}
                    >
                        <Text className="text-white text-center font-semibold">Apply Filters</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    return (
        <View className="px-4">
            <View className="flex-row items-center bg-[#2D2D2D] rounded-xl px-4 py-4">
                <Ionicons name="search" size={24} color={Color.Third} />
                <TextInput
                    className="flex-1 text-white ml-2 text-lg"
                    placeholder="Search for food, restaurants..."
                    placeholderTextColor="#666"
                    value={search}
                    onChangeText={setSearch}
                />
                {search ? (
                    <TouchableOpacity onPress={() => setSearch('')}>
                        <Ionicons name="close-circle" size={24} color={Color.Third} />
                    </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                    className="ml-2"
                    onPress={() => setShowFilters(true)}
                >
                    <Ionicons name="options-outline" size={24} color={Color.Third} />
                </TouchableOpacity>
            </View>

            {search.length > 0 && (
                <View className="mt-4">
                    {loading ? (
                        <View className="items-center justify-center py-4">
                            <ActivityIndicator size="large" color={Color.Third} />
                            <Text className="text-white mt-2">Searching...</Text>
                        </View>
                    ) : results.length > 0 ? (
                        <FlatList
                            data={results}
                            renderItem={({ item }) => <MainSearchCard item={item} />}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                        />

                    ) : (
                        <View className="items-center justify-center py-4">
                            <Text className="text-white text-lg">No results found</Text>
                            <Text className="text-gray-400 mt-2">Try different keywords</Text>
                        </View>
                    )}
                </View>
            )}

            {renderFilters()}

        </View>
    )
}

export default MainSearch