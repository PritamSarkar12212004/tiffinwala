import { View, Text, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
const { width } = Dimensions.get('window');

const ProfilePromotion = () => {
    const navigation = useNavigation()

    const data = [
        {
            id: 1,
            image: "https://i.pinimg.com/736x/c5/d1/25/c5d125d946ab440151e513629acaddd3.jpg",
            title: "Special Offer",
            description: "Get 20% off on monthly subscription",
            views: 1234,
            status: "Active",
            endDate: "30 Apr 2024"
        },
        {
            id: 2,
            image: "https://i.pinimg.com/736x/9f/24/56/9f245653e018ea245cfff1c7ad26cd84.jpg",
            title: "Weekend Deal",
            description: "Free delivery on orders above ₹500",
            views: 856,
            status: "Active",
            endDate: "28 Apr 2024"
        },
        {
            id: 3,
            image: "https://i.pinimg.com/736x/f9/38/a2/f938a2710c32280a74176e39328a3179.jpg",
            title: "Festival Special",
            description: "Complimentary dessert with every order",
            views: 2341,
            status: "Active",
            endDate: "25 Apr 2024"
        },
    ]

    return (
        <View className='w-full mb-4'>
            <View className='flex-row items-center justify-between mb-4'>
                <View>
                    <Text className='text-white text-xl font-bold'>Your Promotions</Text>
                    <Text className='text-zinc-400 text-sm'>Manage your active promotions</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Promotions")} className='flex-row items-center gap-2 bg-zinc-800 px-4 py-2 rounded-full'>
                    <Text className='text-white font-medium'>See All</Text>
                    <Ionicons name="chevron-forward" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className='mr-4 bg-zinc-800 rounded-xl overflow-hidden'
                        style={{ width: width * 0.7 }}
                    >
                        <View className="relative">
                            <Image
                                source={{ uri: item.image }}
                                className='w-full h-48'
                                resizeMode='cover'
                            />
                            <View className="absolute top-2 right-2 bg-black/50 px-3 py-1 rounded-full flex-row items-center gap-1">
                                <View className="w-2 h-2 rounded-full bg-green-500" />
                                <Text className="text-white text-xs">{item.status}</Text>
                            </View>
                        </View>
                        <View className="p-4">
                            <Text className='text-white text-lg font-semibold mb-1'>{item.title}</Text>
                            <Text className='text-zinc-400 text-sm mb-3'>{item.description}</Text>
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center gap-4">
                                    <View className="flex-row items-center gap-1">
                                        <Ionicons name="eye" size={16} color="#FFD700" />
                                        <Text className="text-zinc-400 text-sm">{item.views}</Text>
                                    </View>
                                    <View className="flex-row items-center gap-1">
                                        <Ionicons name="calendar" size={16} color="#FFD700" />
                                        <Text className="text-zinc-400 text-sm">{item.endDate}</Text>
                                    </View>
                                </View>
                                <View className="flex-row gap-2">
                                    <TouchableOpacity className="bg-zinc-700 p-2 rounded-full">
                                        <Ionicons name="pencil" size={16} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity className="bg-[#FFD700] p-2 rounded-full">
                                        <Ionicons name="share-outline" size={16} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingHorizontal: 4 }}
            />
        </View>
    )
}

export default ProfilePromotion