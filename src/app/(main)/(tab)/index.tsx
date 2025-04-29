import { View, Text, StyleSheet, Image, ActivityIndicator, Animated } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import BgColor from '@/src/constants/color/BgColor'
import MainPageHeader from '@/src/components/headers/MainPageHeader'
import MainPageLayout from '@/src/components/layout/MainPageLayout'
import Searhmain from '@/src/components/search/Searhmain'
import MainCardShow from '@/src/components/layout/MainCardShow'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { userContext } from '@/src/utils/context/ContextApi'
import Color from '@/src/constants/color/Color'
import useMainDataFetch from '@/src/hooks/product-api/useMainDataFetch'


const index = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { bottomSheetRef } = userContext()
  const [mainData, setMainData] = useState<any>()
  const [bottomSheetData, setBottomSheetData] = useState<any>()
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { fetchMainData } = useMainDataFetch()

  const fetchData = () => {
    setLoading(true)
    fetchMainData(setMainData, setLoading)
  }

  useEffect(() => {
    fetchData()
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    return () => {
      setMainData(undefined)
      setBottomSheetData(null)
    }
  }, []) // Empty dependency array to run only once

  return (
    <Animated.View style={{
      flex: 1,
      opacity: fadeAnim,
      backgroundColor: BgColor.Primary
    }}>
      <MainPageHeader />
      <MainPageLayout>

        <Searhmain fetchData={fetchData} />
        {
          loading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#FFD700" />
              <Text className="text-white mt-4 text-lg">Loading delicious meals...</Text>
            </View>
          ) : !mainData || mainData.length === 0 ? (
            <View className="flex-1 items-center justify-center">
              <Text className="text-white text-3xl font-bold text-center mb-2">No Data Available</Text>
              <Text className="text-zinc-400 text-center">Try searching for something else</Text>
            </View>
          ) : (
            <MainCardShow mainData={mainData} setBottomSheetData={setBottomSheetData} />
          )
        }
      </MainPageLayout>

      <BottomSheet
        ref={bottomSheetRef}
        style={styles.bottomSheet}
        snapPoints={['70%']}
        index={-1}
        enablePanDownToClose={true}
        handleStyle={{ backgroundColor: BgColor.Primary }}
        handleIndicatorStyle={{ backgroundColor: Color.Third }}
        backgroundStyle={{ backgroundColor: BgColor.Primary }}
        enableHandlePanningGesture={true}
      >
        <BottomSheetScrollView style={styles.contentContainer}>
          <View className='w-full h-full p-4 mb-32'>
            <Text className="text-white text-xl font-bold mb-4">Menu Items</Text>
            <View className='flex-row flex-wrap justify-between'>
              {bottomSheetData?.map((item: any, index: number) => (
                <View
                  key={index}
                  className='w-[48%] mb-6'
                  style={{
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <View className='aspect-square rounded-xl overflow-hidden bg-zinc-800'>
                    <Image
                      source={{ uri: item.image }}
                      className='w-full h-full'
                      resizeMode='cover'
                    />
                  </View>
                  <View className='mt-2'>
                    <Text className='text-white text-center text-sm font-bold' numberOfLines={1}>
                      {item.title}
                    </Text>
                    {item.description && (
                      <Text className='text-zinc-400 text-center text-xs mt-1' numberOfLines={2}>
                        {item.description}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  bottomSheet: {
    marginBottom: 80,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
  },
});

export default index