import LottiAnimation from '@/src/components/layout/LottiAnimation';
import LottiConstant from '@/src/constants/lotti/LottiConstant';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, BackHandler, Animated } from 'react-native';
import { RewardedAd, RewardedAdEventType, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

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
    const fadeAnim = new Animated.Value(0);
    const scaleAnim = new Animated.Value(0.8);

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

    // Animation effect
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

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
            AdEventType.CLOSED,
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
        <LinearGradient
            colors={['#000000', '#1a1a1a', '#2d2d2d']}
            className='w-full h-full'
        >
            <View className='w-full h-full flex items-center justify-center px-6'>
                {!loaded && (
                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }]
                        }}
                        className='w-full items-center justify-center'
                    >
                        <View className='bg-zinc-800/50 p-8 rounded-3xl backdrop-blur-lg items-center'>
                            <LottiAnimation
                                height={200}
                                width={200}
                                path={LottiConstant.AddLoading}
                                bg='transparent'
                            />
                            <Text className='text-white text-2xl font-bold mt-4 mb-2'>
                                Preparing Your Reward
                            </Text>
                            <Text className='text-zinc-400 text-center mb-6'>
                                Please wait while we load your special reward...
                            </Text>
                            <View className='flex-row items-center bg-zinc-700/50 px-4 py-3 rounded-full'>
                                <Ionicons name="time-outline" size={20} color="#FFD700" />
                                <Text className='text-zinc-300 ml-2'>Loading your reward...</Text>
                            </View>
                        </View>
                    </Animated.View>
                )}

                {loaded && (
                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }]
                        }}
                        className='w-full items-center justify-center'
                    >
                        <View className='bg-zinc-800/50 p-8 rounded-3xl backdrop-blur-lg items-center'>
                            <LottiAnimation
                                height={200}
                                width={200}
                                path={LottiConstant.AddLoading}
                                bg='transparent'
                            />
                            <Text className='text-white text-2xl font-bold mt-4 mb-2'>
                                Your Reward is Ready!
                            </Text>
                            <Text className='text-zinc-400 text-center mb-6'>
                                Watch a short video to claim your reward
                            </Text>
                            <View className='flex-row items-center bg-[#FFD700]/10 px-4 py-3 rounded-full border border-[#FFD700]/20'>
                                <Ionicons name="gift-outline" size={20} color="#FFD700" />
                                <Text className='text-[#FFD700] ml-2 font-medium'>
                                    Special reward waiting for you
                                </Text>
                            </View>
                        </View>
                    </Animated.View>
                )}

                {rewardEarned && (
                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }]
                        }}
                        className='absolute bottom-10 w-full items-center'
                    >
                        <View className='bg-green-500/20 px-6 py-3 rounded-full flex-row items-center'>
                            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                            <Text className='text-green-500 ml-2 font-semibold'>
                                Reward earned successfully!
                            </Text>
                        </View>
                    </Animated.View>
                )}
            </View>
        </LinearGradient>
    );
};

export default index;
