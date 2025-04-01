import { View, Text, TouchableOpacity, Image, Animated } from 'react-native'
import React, { useState, useRef } from 'react'
import BgColor from '@/src/constants/color/BgColor'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import { userContext } from '@/src/utils/context/ContextApi'
import { useNavigation, useRouter } from 'expo-router';

const MainTiffinCard = () => {
    const router = useRouter();
    const navigation = useNavigation()
    const [isLiked, setIsLiked] = useState(false);
    const { bottomSheetRef } = userContext();
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const bottomSheetHandler = () => {
        bottomSheetRef.current?.expand()
    }

    const likeHandler = () => {
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
        navigation.navigate('ShowProduct');
    }

    const tags = ["Veg", "Home Delivery", "Monthly", "Lunch + Dinner"];
    const rating = 4.5;
    const time = "30-40 min";
    const location = "2.5 km away";
    const reviews = "1.2k+ reviews";

    return (
        <TouchableOpacity
            onPress={handleCardPress}
            activeOpacity={0.8}
            className='w-full rounded-[20px] relative mb-4'
            style={{ backgroundColor: BgColor.Secondary }}
        >
            <View className='w-full flex flex-row items-center justify-between gap-3 px-5 absolute top-3 z-10'>
                <View className='bg-black/50 px-4 py-2 rounded-full flex-row items-center'>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text className='text-white ml-1 font-bold'>{rating}</Text>
                </View>
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={likeHandler}
                        className='bg-zinc-200/80 rounded-full h-14 opacity-60 w-14 items-center justify-center'
                    >
                        <AntDesign
                            name={isLiked ? "heart" : "hearto"}
                            size={30}
                            color={isLiked ? "#FF4B4B" : "#FFD700"}
                        />
                    </TouchableOpacity>
                </Animated.View>
            </View>
            <Image
                source={{ uri: "https://i.pinimg.com/736x/69/91/94/69919422977bb1d5b05e8481d3921b5f.jpg" }}
                className='w-full h-72 rounded-t-[20px]'
                resizeMode='cover'
            />
            <View className='w-full rounded-b-[20px] px-3 pb-5 pt-3 bg-zinc-800'>
                <View className='w-full flex flex-row border-b-[2px] pb-3 border-zinc-700 justify-between items-center'>
                    <View>
                        <Text className='text-2xl tracking-widest font-extrabold text-white'>Sai Mess</Text>
                        <View className='flex-row items-center mt-1'>
                            <Ionicons name="location" size={14} color="#FFD700" />
                            <Text className='text-zinc-400 ml-1'>{location}</Text>
                        </View>
                    </View>
                    <View className='px-3 py-2 bg-green-600 rounded-xl'>
                        <Text className='text-sm font-extrabold text-white'>₹ 1000/Mon</Text>
                    </View>
                </View>

                {/* Tags Section */}
                <View className='flex-row flex-wrap gap-2 mt-3'>
                    {tags.map((tag, index) => (
                        <View
                            key={index}
                            className='bg-zinc-700/50 px-3 py-1 rounded-full'
                        >
                            <Text className='text-white text-xs font-medium'>{tag}</Text>
                        </View>
                    ))}
                </View>

                {/* Additional Info Section */}
                <View className='flex-row justify-between items-center mt-4'>
                    <View className='flex-row items-center gap-4'>
                        <View className='flex-row items-center'>
                            <Ionicons name="time-outline" size={16} color="#FFD700" />
                            <Text className='text-zinc-400 ml-1'>{time}</Text>
                        </View>
                        <View className='flex-row items-center'>
                            <Ionicons name="chatbubble-outline" size={16} color="#FFD700" />
                            <Text className='text-zinc-400 ml-1'>{reviews}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => bottomSheetHandler()}
                        className='bg-zinc-700 px-4 py-2 rounded-full'
                    >
                        <Text className='text-white font-semibold'>View Menu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MainTiffinCard