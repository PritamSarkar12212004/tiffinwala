import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, } from 'react-native'
import React, { useEffect, useState } from 'react'
import BgColor from '@/src/constants/color/BgColor'
import MainPageHeader from '@/src/components/headers/MainPageHeader'
import MainPageLayout from '@/src/components/layout/MainPageLayout'
import Searhmain from '@/src/components/search/Searhmain'
import MainCardShow from '@/src/components/layout/MainCardShow'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { userContext } from '@/src/utils/context/ContextApi'
import Color from '@/src/constants/color/Color'
import { PostData } from '@/src/components/interface/AllInterface'
import useMainDataFetch from '@/src/hooks/product-api/useMainDataFetch'

const index = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { bottomSheetRef2 } = userContext()
  const [mainData, setMainData] = useState<any>()
  const [bottomSheetData, setBottomSheetData] = useState<any>()

  const { fetchMainData } = useMainDataFetch()


  const fetchData = () => {
    setLoading(!loading)
    fetchMainData(setMainData, setLoading)
  }
  useEffect(() => {
    fetchData()
    return () => {
      setMainData(undefined)
      setBottomSheetData(null)
    }
  }, [])
  return (
    <View className='w-full h-full' style={{ backgroundColor: BgColor.Primary }}>
      <MainPageHeader />
      <MainPageLayout >
        <Searhmain fetchData={fetchData} />
        {
          loading ? (

            <ActivityIndicator size="large" className='mt-10' color="red" />
          ) : !mainData || mainData.length === 0 ? (
            <Text className="text-white text-3xl  font-extrabold text-center mt-4">No Data Available</Text>
          ) : (
            <MainCardShow mainData={mainData} setBottomSheetData={setBottomSheetData} />
          )
        }

      </MainPageLayout>
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
            {
              bottomSheetData?.map((item: any, index: any) => (
                <View key={index} className='w-[48%] mb-10 flex gap-2' style={{ aspectRatio: 1 }}>
                  <Image source={{ uri: item.image }} className='w-full  h-full rounded-lg' resizeMode='cover' />
                  <Text className='text-white text-center text-sm font-bold'>{item.title}</Text>
                </View>
              ))
            }
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