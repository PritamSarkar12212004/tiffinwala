import { View, FlatList } from 'react-native';
import React from 'react';
import MainTiffinCard from '../cards/MainTiffinCard';
import NativeAds from '../ads/nativeAds/NativeAds';


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



// MainCardShow component
const MainCardShow = ({ mainData, setBottomSheetData }: any) => {
    const modifiedData = insertAdsIntoData(mainData);
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
