import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import MainSearch from '@/src/components/search/MainSearch'
import Promotion from '@/src/components/layout/Promotion'
import SearchSuggestion from '@/src/components/search/SearchSuggestion'
import PageNavigation from '@/src/components/navigation/PageNavigation'
const SearchPage = () => {
    const [search, setSearch] = useState("")
    return (
        <View className='w-full h-full bg-black '>
            <PageNavigation path="Search" />
            <MainSearch search={search} setSearch={setSearch} />
            {
                search.length <= 0 && (
                    <View className='w-full flex gap-4 mt-10'>
                        <Promotion />
                        <SearchSuggestion />
                    </View>
                )
            }
        </View >
    )
}

export default SearchPage