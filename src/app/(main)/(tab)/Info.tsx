import { View, Text } from 'react-native'
import React from 'react'
import BgColor from '@/src/constants/color/BgColor'
import MainPageHeader from '@/src/components/headers/MainPageHeader'
import Searhmain from '@/src/components/search/Searhmain'
import MainPageLayout from '@/src/components/layout/MainPageLayout'
import Promotion from '@/src/components/layout/Promotion'
const Info = () => {
  return (
    <View className='w-full h-full' style={{ backgroundColor: BgColor.Primary }}>
      <MainPageHeader />

    </View>
  )
}

export default Info