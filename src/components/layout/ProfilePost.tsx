import { View, Text, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get('window');

const ProfilePost = () => {
    const navigation = useNavigation()
    const data = [
        // {
        //     id: 1,
        //     image: "https://i.pinimg.com/736x/c5/d1/25/c5d125d946ab440151e513629acaddd3.jpg",
        //     title: "Special Thali",
        //     likes: 234,
        //     comments: 45,
        //     date: "2 days ago"
        // },
        // {
        //     id: 2,
        //     image: "https://i.pinimg.com/736x/9f/24/56/9f245653e018ea245cfff1c7ad26cd84.jpg",
        //     title: "Weekend Special",
        //     likes: 189,
        //     comments: 32,
        //     date: "5 days ago"
        // },
        // {
        //     id: 3,
        //     image: "https://i.pinimg.com/736x/f9/38/a2/f938a2710c32280a74176e39328a3179.jpg",
        //     title: "Festival Menu",
        //     likes: 312,
        //     comments: 67,
        //     date: "1 week ago"
        // },
    ]

    return (
        <View className='w-full mb-4'>
            <View className='flex-row items-center justify-between mb-4'>
                <View>
                    <Text className='text-white text-xl font-bold'>Your Posts</Text>
                    <Text className='text-zinc-400 text-sm'>Share your food moments</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("YourPosts")} className='flex-row items-center gap-2 bg-zinc-800 px-4 py-2 rounded-full'>
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
                            <View className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded-full">
                                <Text className="text-white text-xs">{item.date}</Text>
                            </View>
                        </View>
                        <View className="p-3">
                            <Text className='text-white text-lg font-semibold mb-2'>{item.title}</Text>
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center gap-4">
                                    <View className="flex-row items-center gap-1">
                                        <Ionicons name="heart" size={16} color="#FF6B6B" />
                                        <Text className="text-zinc-400 text-sm">{item.likes}</Text>
                                    </View>
                                    <View className="flex-row items-center gap-1">
                                        <Ionicons name="chatbubble-outline" size={16} color="#FFD700" />
                                        <Text className="text-zinc-400 text-sm">{item.comments}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity className="bg-[#FFD700] p-2 rounded-full">
                                    <Ionicons name="share-outline" size={16} color="black" />
                                </TouchableOpacity>
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

export default ProfilePost