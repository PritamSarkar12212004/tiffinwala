import { View, Text } from 'react-native'
import React from 'react'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const BanerAds = ({ setAdLoaded, setAdError }: any) => {
    return (
        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ADAPTIVE_BANNER}
            onAdLoaded={() => setAdLoaded(true)}
            onAdFailedToLoad={(error) => {
                console.log('Ad failed:', error);
                setAdError(true);
            }}
        />
    )
}

export default BanerAds