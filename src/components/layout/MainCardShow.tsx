import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import MainTiffinCard from '../cards/MainTiffinCard';
import BanerAds from '../ads/bannerAds/BanerAds';
import NativeAds from '../ads/nativeAds/NativeAds';
import { userContext } from '@/src/utils/context/ContextApi';


// Function to insert ad placeholders into data
const insertAdsIntoData = (data: any[]) => {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        result.push({ type: 'item', data: data[i] });
        if ((i + 1) % 2 === 0) {
            result.push({ type: 'ad', id: `ad-${i}` });
        }
    }
    return result;
};

// AdBanner component with UI improvements
const AdBanner = () => {
    const [adLoaded, setAdLoaded] = useState(false);
    const [adError, setAdError] = useState(false);

    return (
        <View className="mb-5 w-full items-center justify-center px-2">
            {!adLoaded && !adError && (
                <View className="h-[100px] w-full bg-zinc-700 rounded-xl flex items-center justify-center shadow-md">
                    <ActivityIndicator size="large" color="#000" />
                    <Text className="text-black mt-2">Loading ad...</Text>
                </View>
            )}
            {adError && (
                <View className="h-[100px] w-full bg-red-100 rounded-xl flex items-center justify-center shadow-md">
                    <Text className="text-red-600 font-semibold">Ad failed to load.</Text>
                </View>
            )}
            <View className={`${adLoaded ? '' : 'hidden'} overflow-hidden rounded-xl shadow-md w-full`}>
                <BanerAds setAdLoaded={setAdLoaded} setAdError={setAdError} />
            </View>
        </View>
    );
};

// MainCardShow component
const MainCardShow = ({ mainData, setBottomSheetData }: any) => {
    const modifiedData = insertAdsIntoData(mainData);
    const [pageAddCalculation, setPageAddCalculation] = useState<number>(1)
    console.log(pageAddCalculation)
    return (

        <View className="w-full px-2 flex gap-5">
            <FlatList
                data={modifiedData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    if (item.type === 'ad') {
                        return <NativeAds />;
                    }
                    return (
                        <MainTiffinCard
                            pageAddCalculation={pageAddCalculation}
                            setPageAddCalculation={setPageAddCalculation}
                            item={item.data}
                            setBottomSheetData={setBottomSheetData}
                        />
                    );


                }}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.5} // Trigger when 50% of the list is visible            />
            />
        </View>
    );
};

export default MainCardShow;
