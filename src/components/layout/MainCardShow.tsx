import { View, Text, FlatList } from 'react-native'
import React from 'react'
import MainTiffinCard from '../cards/MainTiffinCard'

const MainCardShow = ({ mainData, setBottomSheetData }: any) => {

    return (
        <View className='w-full px-2  flex gap-5'>
            <FlatList data={mainData} keyExtractor={((item, index) => index.toString())} renderItem={({ item }) => <MainTiffinCard item={item} setBottomSheetData={setBottomSheetData} />} />

        </View>
    )
}

export default MainCardShow