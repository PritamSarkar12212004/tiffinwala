import LottiAnimation from '@/src/components/layout/LottiAnimation';
import LottiConstant from '@/src/constants/lotti/LottiConstant';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, BackHandler } from 'react-native';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

// Use test ID for development, real ID for production
const adUnitId = __DEV__ 
    ? TestIds.REWARDED 
    : 'ca-app-pub-6357576702874785/8879607699';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['food', 'tiffin', 'delivery'],
    serverSideVerificationOptions: {
        userId: 'USER_ID',
    },
});

/**
 * Renders a rewarded ad screen with loading states and ad interaction logic.
 * 
 * This component manages the lifecycle of a Google Mobile Ads rewarded advertisement,
 * handling ad loading, display, reward earning, and navigation control.
 * 
 * @returns {JSX.Element|null} A view displaying ad loading states or null if ad is not shown
 */
const index = () => {
    const [loaded, setLoaded] = useState(false);
    const [showAd, setShowAd] = useState(true);
    const [rewardEarned, setRewardEarned] = useState(false);
    const [adCompleted, setAdCompleted] = useState(false);
    const navigation = useNavigation();

    // Disable back button
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (!adCompleted) {
                return true; // Prevent back action
            }
            return false; // Allow back action
        });

        return () => backHandler.remove();
    }, [adCompleted]);

    // Disable navigation gestures
    useEffect(() => {
        navigation.setOptions({
            gestureEnabled: adCompleted,
        });
    }, [adCompleted, navigation]);

    useEffect(() => {
        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            console.log('Ad loaded successfully'); // Debug log
            setLoaded(true);
            rewarded.show();
        });

        const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
                console.log('Reward earned:', reward); // Debug log
                setRewardEarned(true);
            },
        );

        const unsubscribeClosed = rewarded.addAdEventListener(
            'closed',
            () => {
                console.log('Ad closed'); // Debug log
                setAdCompleted(true);
                setShowAd(false);
                navigation.goBack();
            },
        );

        // Start loading the rewarded ad
        console.log('Loading ad...'); // Debug log
        rewarded.load();

        // Unsubscribe from events on unmount
        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
            unsubscribeClosed();
        };
    }, []);

    if (!showAd) {
        return null;
    }

    return (
        <View className='w-full h-full bg-black flex items-center justify-center' >
            {!loaded && (
                <View className='w-full h-full bg-black flex items-center justify-center' >
                    <LottiAnimation
                        height={200} width={200} path={LottiConstant.AddLoading} bg='transparent'
                    />
                    <Text className='text-white text-2xl font-bold'>Loading...</Text>
                </View>
            )}
            {loaded && (
                <View className='w-full h-full bg-black flex items-center justify-center' >
                    <LottiAnimation
                        height={200} width={200} path={LottiConstant.AddLoading} bg='transparent'
                    />
                </View>
            )}
        </View>
    );
};

export default index;
