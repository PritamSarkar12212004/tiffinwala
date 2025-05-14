import { View, Text, StyleSheet, Image, Animated, Platform, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import BgColor from '@/src/constants/color/BgColor'
import MainPageHeader from '@/src/components/headers/MainPageHeader'
import MainPageLayout from '@/src/components/layout/MainPageLayout'
import Searhmain from '@/src/components/search/Searhmain'
import MainCardShow from '@/src/components/layout/MainCardShow'
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { userContext } from '@/src/utils/context/ContextApi'
import Color from '@/src/constants/color/Color'
import useMainDataFetch from '@/src/hooks/product-api/useMainDataFetch'
import LottiConstant from '@/src/constants/lotti/LottiConstant'
import LottiAnimation from '@/src/components/layout/LottiAnimation'
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.85;

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
  }, [])

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  const handleItemPress = (item: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Add any additional item press handling here
  };

  return (
    <View className="flex-1" style={{ backgroundColor: BgColor.Primary }}>
      <MainPageHeader />
      <MainPageLayout>
        <Searhmain fetchData={fetchData} />
        {
          loading ? (
            <View className="h-full w-full bg-black items-center justify-center">
              <LottiAnimation height={400} width={400} path={LottiConstant.productLoadingMain} bg="transparent" />

            </View>
          ) : !mainData || mainData.length === 0 ? (
            <View className="h-full w-full bg-black items-center justify-center">
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
        snapPoints={['85%']}
        index={-1}
        enablePanDownToClose={true}
        handleStyle={styles.handleStyle}
        handleIndicatorStyle={styles.handleIndicator}
        backgroundStyle={styles.bottomSheetBackground}
        enableHandlePanningGesture={true}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View className='w-full h-full px-4 pb-32'>
            {/* Header Section */}
            <View className='py-4 border-b border-zinc-800'>
              <Text className="text-white text-2xl font-bold mb-1">Menu Items</Text>
              <Text className="text-zinc-400 text-sm">Explore our delicious offerings</Text>
            </View>

            {/* Menu Items Grid */}
            <View className='mt-4'>
              {bottomSheetData?.map((item: any, index: number) => (
                <Pressable
                  key={index}
                  onPress={() => handleItemPress(item)}
                  className='mb-4'
                >
                  <Animated.View
                    className='rounded-2xl overflow-hidden bg-zinc-900'
                    style={styles.menuItemCard}
                  >
                    <View className='flex-row'>
                      {/* Image Container */}
                      <View className='w-36 h-36'>
                        <Image
                          source={{ uri: item.image }}
                          className='w-full h-full'
                          resizeMode='cover'
                        />
                      </View>

                      {/* Content Container */}
                      <View className='flex-1 p-4 justify-between'>
                        <View>
                          <Text className='text-white text-xl font-bold mb-2' numberOfLines={1}>
                            {item.title}
                          </Text>
                          {item.description && (
                            <Text className='text-zinc-400 text-sm leading-5' numberOfLines={3}>
                              {item.description}
                            </Text>
                          )}
                        </View>

                        {/* Tags and Info */}
                        <View className='flex-row items-center mt-3'>
                          {item.isVeg !== undefined && (
                            <View className='flex-row items-center bg-zinc-800 px-3 py-1.5 rounded-full mr-2'>
                              <MaterialCommunityIcons
                                name={item.isVeg ? "food-apple" : "food-steak"}
                                size={14}
                                color={item.isVeg ? "#4CAF50" : "#FF4B4B"}
                              />
                              <Text className='text-zinc-300 text-xs ml-1.5 font-medium'>
                                {item.isVeg ? 'Pure Veg' : 'Non-Veg Available'}
                              </Text>
                            </View>
                          )}

                        </View>
                      </View>
                    </View>
                  </Animated.View>
                </Pressable>
              ))}
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomSheet: {
    marginBottom: Platform.OS === 'ios' ? 0 : 80,
    zIndex: 10,
  },
  bottomSheetBackground: {
    backgroundColor: BgColor.Primary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handleStyle: {
    backgroundColor: BgColor.Primary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handleIndicator: {
    backgroundColor: Color.Third,
    width: 40,
  },
  contentContainer: {
    flex: 1,
  },
  menuItemCard: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
});

export default index