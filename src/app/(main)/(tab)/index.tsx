import { View, Text, ScrollView, StyleSheet, Image, } from 'react-native'
import React, { useRef } from 'react'
import BgColor from '@/src/constants/color/BgColor'
import MainPageHeader from '@/src/components/headers/MainPageHeader'
import MainPageLayout from '@/src/components/layout/MainPageLayout'
import Searhmain from '@/src/components/search/Searhmain'
import Promotion from '@/src/components/layout/Promotion'
import MainCardShow from '@/src/components/layout/MainCardShow'
import BottomSheet, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { userContext } from '@/src/utils/context/ContextApi'
import Color from '@/src/constants/color/Color'

const index = () => {
  const { bottomSheetRef2 } = userContext()

  return (
    <View className='w-full h-full' style={{ backgroundColor: BgColor.Primary }}>
      <MainPageHeader />
      <ScrollView>
        <MainPageLayout >
          <Searhmain />
          <Promotion />
          <MainCardShow />
        </MainPageLayout>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef2}
        style={{ marginBottom: 80, zIndex: 10 }} // Adjust the margin to move it above the tab bar
        snapPoints={['70%']}
        index={-1}
        enablePanDownToClose={true}
        handleStyle={{ backgroundColor: BgColor.Primary }}
        handleIndicatorStyle={{ backgroundColor: Color.Third, }}
        backgroundStyle={{ backgroundColor: BgColor.Primary }}
        enableHandlePanningGesture={true}


      >
        <BottomSheetScrollView style={styles.contentContainer}>
          <View className='w-full h-full items-center justify-between  flex flex-row flex-wrap p-3 mb-32'>
            <View className='w-[48%] mb-10 flex gap-2' style={{ aspectRatio: 1 }}>
              <Image source={{ uri: "https://i.pinimg.com/736x/4b/79/2a/4b792a25370bcd39cb92830aa4b4b975.jpg" }} className='w-full  h-full rounded-lg' resizeMode='cover' />
              <Text className='text-white text-center text-sm font-bold'>Dal Bhati</Text>
            </View>
            <View className='w-[48%] mb-10 flex gap-2' style={{ aspectRatio: 1 }}>
              <Image source={{ uri: "https://i.pinimg.com/736x/4b/79/2a/4b792a25370bcd39cb92830aa4b4b975.jpg" }} className='w-full  h-full rounded-lg' resizeMode='cover' />
              <Text className='text-white text-center text-sm font-bold'>Chicken Tikka</Text>
            </View>
            <View className='w-[48%] mb-10 flex gap-2' style={{ aspectRatio: 1 }}>
              <Image source={{ uri: "https://i.pinimg.com/736x/4b/79/2a/4b792a25370bcd39cb92830aa4b4b975.jpg" }} className='w-full  h-full rounded-lg' resizeMode='cover' />
              <Text className='text-white text-center text-sm font-bold'>Palak Panner</Text>
            </View>
            <View className='w-[48%] mb-10 flex gap-2' style={{ aspectRatio: 1 }}>
              <Image source={{ uri: "https://i.pinimg.com/736x/4b/79/2a/4b792a25370bcd39cb92830aa4b4b975.jpg" }} className='w-full  h-full rounded-lg' resizeMode='cover' />
              <Text className='text-white text-center text-sm font-bold'>Palak Panner</Text>
            </View>
            <View className='w-[48%] mb-10 flex gap-2' style={{ aspectRatio: 1 }}>
              <Image source={{ uri: "https://i.pinimg.com/736x/4b/79/2a/4b792a25370bcd39cb92830aa4b4b975.jpg" }} className='w-full  h-full rounded-lg' resizeMode='cover' />
              <Text className='text-white text-center text-sm font-bold'>Dal Bhati</Text>
            </View>
            <View className='w-[48%] mb-10 flex gap-2' style={{ aspectRatio: 1 }}>
              <Image source={{ uri: "https://i.pinimg.com/736x/4b/79/2a/4b792a25370bcd39cb92830aa4b4b975.jpg" }} className='w-full  h-full rounded-lg' resizeMode='cover' />
              <Text className='text-white text-center text-sm font-bold'>Chicken Tikka</Text>
            </View>
            <View className='w-[48%] mb-10 flex gap-2' style={{ aspectRatio: 1 }}>
              <Image source={{ uri: "https://i.pinimg.com/736x/4b/79/2a/4b792a25370bcd39cb92830aa4b4b975.jpg" }} className='w-full  h-full rounded-lg' resizeMode='cover' />
              <Text className='text-white text-center text-sm font-bold'>Palak Panner</Text>
            </View>
            <View className='w-[48%] mb-10 flex gap-2' style={{ aspectRatio: 1 }}>
              <Image source={{ uri: "https://i.pinimg.com/736x/4b/79/2a/4b792a25370bcd39cb92830aa4b4b975.jpg" }} className='w-full  h-full rounded-lg' resizeMode='cover' />
              <Text className='text-white text-center text-sm font-bold'>Palak Panner</Text>
            </View>

          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    zIndex: 9,
  },
  contentContainer: {
    flex: 1,
  },
});

export default index