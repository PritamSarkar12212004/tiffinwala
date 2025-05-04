import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import MainSearch from '@/src/components/search/MainSearch'
import SearchSuggestion from '@/src/components/search/SearchSuggestion'
import PageNavigation from '@/src/components/navigation/PageNavigation'
import { userContext } from '@/src/utils/context/ContextApi'
import { getFullData } from '@/src/functions/storage/Storage'
import AuthToken from '@/src/constants/token/AuthToken'
import BgColor from '@/src/constants/color/BgColor'
import SubPageWraper from '@/src/components/layout/SubPageWraper'

const SearchPage = () => {
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const { setLocationSearch } = userContext()

    const handleSearch = useCallback((query: string) => {
        setSearch(query)
    }, [])

    const handleCategoryPress = (category: string) => {
        setSearch(category)
    }

    const handleSuggestionPress = (suggestion: string) => {
        setSearch(suggestion)
    }

    const searchLocationFinder = useCallback(() => {
        try {
            const fullLogin = getFullData(AuthToken.UserInfo)
            if (fullLogin?.User_Address) {
                setLocationSearch(fullLogin.User_Address)
                setIsLoading(false)
            } else {
                // If no location found, retry after a short delay
                setTimeout(searchLocationFinder, 1000)
            }
        } catch (error) {
            console.error('Error fetching location:', error)
            setIsLoading(false)
        }
    }, [setLocationSearch])

    useEffect(() => {
        searchLocationFinder()

        // Cleanup function
        return () => {
            setIsLoading(true)
        }
    }, [searchLocationFinder])

    if (isLoading) {
        return (
            <View className='w-full h-full bg-black items-center justify-center'>
                <ActivityIndicator size="large" color={BgColor.Accent} />
                <Text className='text-white mt-4 text-lg'>Loading location...</Text>
            </View>
        )
    }

    return (
        <SubPageWraper>
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
        </SubPageWraper>

    )
}

export default SearchPage