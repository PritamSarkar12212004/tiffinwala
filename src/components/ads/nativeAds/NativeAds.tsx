import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import {
    NativeAd,
    NativeAdView,
    NativeAsset,
    NativeAssetType,
    NativeMediaView,
} from 'react-native-google-mobile-ads';
import { TestIds } from 'react-native-google-mobile-ads';

const NativeAds = () => {
    const [nativeAd, setNativeAd] = useState<NativeAd | null>(null);
    const [loading, setLoading] = useState(true);

    // Use test ID for development, real ID for production
    const adUnitId = __DEV__
        ? TestIds.NATIVE
        : 'ca-app-pub-6357576702874785/4482273081';

    useEffect(() => {
        NativeAd.createForAdRequest(adUnitId, {
            requestNonPersonalizedAdsOnly: true,
            keywords: ['food', 'tiffin', 'delivery'],
        })
            .then((ad) => {
                setNativeAd(ad);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error loading native ad:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View style={{ backgroundColor: '#1e1e1e', padding: 15, borderRadius: 10, margin: 10 }}>
                <View style={{ backgroundColor: '#333', height: 180, borderRadius: 10 }} />
                <View style={{ height: 10 }} />
                <View style={{ backgroundColor: '#444', height: 20, width: '70%', borderRadius: 4 }} />
                <View style={{ height: 8 }} />
                <View style={{ backgroundColor: '#444', height: 15, width: '50%', borderRadius: 4 }} />
                <View style={{ height: 15 }} />
                <View style={{ backgroundColor: '#555', height: 35, width: 100, borderRadius: 6 }} />
                <Text style={{ color: '#aaa', marginTop: 10 }}>Loading Ad...</Text>
            </View>
        );
    }

    if (!nativeAd) return null;

    return (
        <NativeAdView nativeAd={nativeAd} style={{ marginVertical: 10, padding: 10, backgroundColor: '#1e1e1e', borderRadius: 10, width: '100%', display: "flex", justifyContent: "center", alignItems: "center" }}>
            <NativeMediaView resizeMode="cover" style={{ width: '100%', height: 180, borderRadius: 10, marginBottom: 10, display: "flex", justifyContent: "center", alignItems: "center" }} />
            <NativeAsset assetType={NativeAssetType.HEADLINE}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{nativeAd.headline}</Text>
            </NativeAsset>
            <NativeAsset assetType={NativeAssetType.BODY}>
                <Text style={{ color: '#ccc', marginVertical: 5 }} className='px-4'>{nativeAd.body}</Text>
            </NativeAsset>
            <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
                <TouchableOpacity
                    onPress={() => {
                        Linking.openURL(nativeAd.callToAction);
                    }}
                    className='w-full' style={{ backgroundColor: '#007bff', padding: 10, borderRadius: 5, alignItems: 'center' }}>
                    <Text style={{ color: '#fff' }}>{nativeAd.callToAction}</Text>
                </TouchableOpacity>
            </NativeAsset>
        </NativeAdView>
    );
};

export default NativeAds;
