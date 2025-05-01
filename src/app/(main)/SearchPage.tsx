import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState, useCallback } from 'react'
import MainSearch from '@/src/components/search/MainSearch'
import SearchSuggestion from '@/src/components/search/SearchSuggestion'
import PageNavigation from '@/src/components/navigation/PageNavigation'


const SearchPage = () => {
    const [search, setSearch] = useState("")

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
        </View>
    )
}

export default SearchPage