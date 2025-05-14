import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import BgColor from '@/src/constants/color/BgColor'
import { userContext } from '@/src/utils/context/ContextApi'
import { useNavigation, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BlurView } from 'expo-blur';

/**
 * Renders a tiffin service card with detailed information and interactive elements
 * @param {Object} props - Component properties
 * @param {Object} props.item - Tiffin service item details
 * @param {Function} props.setBottomSheetData - Function to set bottom sheet data
 * @param {number} props.pageAddCalculation - Current page calculation state
 * @param {Function} props.setPageAddCalculation - Function to update page calculation state
 * @returns {React.ReactElement} A touchable card displaying tiffin service information
 */
const MainTiffinCard = ({ item, setBottomSheetData }: any) => {
    const navigation = useNavigation()
    const router = useRouter()
    const { bottomSheetRef, setMainData } = userContext();

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    const bottomSheetHandler = () => {
        setBottomSheetData(item.postMenu)
        bottomSheetRef.current?.expand()
    }

    const handleCardPress = () => {
        setMainData(item)
        navigation.navigate('ShowProduct' as never)
    }

    return (
        <Animated.View style={{ opacity: fadeAnim }} className="mb-5">
            <TouchableOpacity
                onPress={handleCardPress}
                activeOpacity={0.9}
                className="overflow-hidden rounded-2xl"
                style={{
                    backgroundColor: '#1a1a1a',
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 5,
                }}
            >
                {/* Image Container */}
                <View className="relative">
                    <Image
                        source={{ uri: item.postCoverImage[0] }}
                        className="w-full h-64"
                        resizeMode="cover"
                    />

                    {/* Top Info Overlay */}
                    <BlurView intensity={20} className="absolute top-0 left-0 right-0 p-4 flex-row justify-between">
                        <View className="flex-row items-center bg-black/30 px-3 py-1.5 rounded-full">
                            <AntDesign name="heart" size={16} color="#FF4B4B" />
                            <Text className="text-white ml-1.5 font-semibold">{item.productLikes?.length || 0}</Text>
                        </View>
                        <View className="flex-row items-center bg-black/30 px-3 py-1.5 rounded-full">
                            <MaterialCommunityIcons name="eye" size={16} color="#FFD700" />
                            <Text className="text-white ml-1.5 font-semibold">{item.postTotalViews || 0}</Text>
                        </View>
                    </BlurView>

                    {/* Price Tag */}
                    <View className="absolute top-4 right-4 bg-[#FFD700] px-4 py-2 rounded-lg">
                        <Text className="text-black font-bold text-lg">₹{item.postPrice}</Text>
                        <Text className="text-black/70 text-xs">Monthly</Text>
                    </View>

                    {/* Distance Tag */}
                    <View className="absolute top-20 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg flex-row items-center">
                        <MaterialCommunityIcons name="map-marker-distance" size={14} color="#FFD700" />
                        <Text className="text-white ml-1 text-sm font-medium">{item.distanceText}</Text>
                    </View>
                </View>

                {/* Content Container */}
                <View className="p-5">
                    {/* Title and Location */}
                    <View className="mb-4">
                        <Text className="text-white text-xl font-bold mb-2" numberOfLines={1}>
                            {item.postTitle}
                        </Text>
                        <View className="flex-row items-center">
                            <MaterialCommunityIcons name="map-marker" size={16} color="#FFD700" />
                            <Text className="text-zinc-400 ml-1.5 text-sm" numberOfLines={1}>
                                {item.postLocation}
                            </Text>
                        </View>
                    </View>

                    {/* Meal Types */}
                    <View className="flex-row flex-wrap gap-2 mb-5">
                        {item.postMealTypes.map((mealType: string, index: number) => (
                            <View
                                key={index}
                                className="bg-zinc-800/80 px-3 py-1.5 rounded-full"
                            >
                                <Text className="text-zinc-300 text-xs font-medium">{mealType}</Text>
                            </View>
                        ))}
                    </View>

                    {/* View Menu Button */}
                    <TouchableOpacity
                        onPress={bottomSheetHandler}
                        activeOpacity={0.8}
                        className="bg-[#FFD700] py-3.5 rounded-xl flex-row items-center justify-center"
                        style={{
                            shadowColor: "#FFD700",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <MaterialCommunityIcons name="food" size={20} color="black" />
                        <Text className="text-black font-bold text-base ml-2">View Menu</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default MainTiffinCard