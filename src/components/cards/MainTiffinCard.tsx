import { View, Text, TouchableOpacity, Image, Animated } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import BgColor from '@/src/constants/color/BgColor'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import { userContext } from '@/src/utils/context/ContextApi'
import { useNavigation, useRouter } from 'expo-router';
import useLikeProductApi from '@/src/hooks/product-api/useLikeProductApi';
import likeFetchData from '@/src/hooks/product-api/likeFetchData';

const MainTiffinCard = ({ item, setBottomSheetData }: any) => {
    const navigation = useNavigation()
    const [isLiked, setIsLiked] = useState(false);
    const { bottomSheetRef2, setMainData } = userContext();
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const { likeController } = useLikeProductApi();
    const { likeProductFetch } = likeFetchData();

    useEffect(() => {
        likeProductFetch(item.postVendorId, item._id, setIsLiked)
        return () => {
            setIsLiked(false)
        }
    }, [item.productLikes])

    const bottomSheetHandler = () => {
        setBottomSheetData(item.postMenu)
        bottomSheetRef2.current?.expand()
    }

    const likeHandler = () => {
        likeController(item.postVendorId, item._id, isLiked, setIsLiked)
        setIsLiked(!isLiked);
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.2,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    }

    const handleCardPress = () => {
        setMainData(item)
        navigation.navigate('ShowProduct' as never);
    }

    return (
        <TouchableOpacity
            onPress={handleCardPress}
            activeOpacity={0.8}
            className='w-full rounded-2xl relative mb-4 overflow-hidden'
            style={{
                backgroundColor: BgColor.Secondary,
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
            <View className='w-full flex flex-row items-center justify-between gap-3 px-5 absolute top-3 z-10'>
                <View className='bg-black/50 px-4 py-2 rounded-full flex-row items-center'>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text className='text-white ml-1 font-bold'>4.5</Text>
                </View>
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={likeHandler}
                        className='bg-black/50 rounded-full h-12 w-12 items-center justify-center'
                    >
                        <AntDesign
                            name={isLiked ? "heart" : "hearto"}
                            size={24}
                            color={isLiked ? "#FF4B4B" : "#FFD700"}
                        />
                    </TouchableOpacity>
                </Animated.View>
            </View>

            <Image
                source={{ uri: item.postCoverImage[0] }}
                className='w-full h-72'
                resizeMode='cover'
            />

            <View className='w-full px-5 pb-5 pt-4 bg-zinc-800/95'>
                <View className='w-full flex flex-row justify-between items-center mb-3'>
                    <View className='flex-1'>
                        <Text className='text-2xl font-bold text-white' numberOfLines={1}>{item.postTitle}</Text>
                    </View>
                    <View className='px-4 py-2 bg-[#FFD700] rounded-xl ml-3'>
                        <Text className='text-sm font-bold text-black'>₹{item.postPrice}/Mon</Text>
                    </View>
                </View>

                <View className='flex-row flex-wrap gap-2 mb-4'>
                    {item.postMealTypes.map((mealType: string, index: number) => (
                        <View
                            key={index}
                            className='bg-zinc-700/50 px-3 py-1.5 rounded-full'
                        >
                            <Text className='text-white text-xs font-medium'>{mealType}</Text>
                        </View>
                    ))}
                </View>

                <View className='flex-row justify-between items-center'>
                    <View className='flex-row items-center gap-4'>
                        <View className='flex-row items-center'>
                            <Ionicons name="chatbubble-outline" size={16} color="#FFD700" />
                            <Text className='text-zinc-400 ml-1'>{item.productLikes}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={bottomSheetHandler}
                        className='bg-[#FFD700] px-5 py-2.5 rounded-full'
                    >
                        <Text className='text-black font-bold'>View Menu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MainTiffinCard