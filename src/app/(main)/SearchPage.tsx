import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState, useCallback } from 'react'
import MainSearch from '@/src/components/search/MainSearch'
import Promotion from '@/src/components/layout/Promotion'
import SearchSuggestion from '@/src/components/search/SearchSuggestion'
import PageNavigation from '@/src/components/navigation/PageNavigation'
import { useRouter } from 'expo-router'
import Color from '@/src/constants/color/Color'

const SearchPage = () => {
    const [search, setSearch] = useState("")
    const router = useRouter()

    const handleSearch = useCallback((query: string) => {
        setSearch(query)
    }, [])

    const handleCategoryPress = (category: string) => {
        setSearch(category)
    }

    const handleSuggestionPress = (suggestion: string) => {
        setSearch(suggestion)
    }

    return (
        <View className='w-full h-full bg-black'>
            <PageNavigation path="Search" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1"
            >
                <MainSearch search={search} setSearch={handleSearch} />
                {
                    search.length <= 0 && (
                        <View className='w-full flex gap-4 mt-10'>
                            <SearchSuggestion
                                onCategoryPress={handleCategoryPress}
                                onSuggestionPress={handleSuggestionPress}
                            />
                        </View>
                    )
                }
            </ScrollView>
        </View>
    )
}

export default SearchPage