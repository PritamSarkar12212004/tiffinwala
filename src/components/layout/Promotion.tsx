import { View, Text, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import BgColor from '@/src/constants/color/BgColor'

const { width } = Dimensions.get('window');

const Promotion = () => {
  const router = useRouter();
  
  const data = [
    {
      id: 1,
      image: "https://i.pinimg.com/736x/c5/d1/25/c5d125d946ab440151e513629acaddd3.jpg",
      title: "Special Thali Offer",
      discount: "20% OFF",
      validTill: "30 Apr 2024",
      description: "Get 20% off on your first order"
    },
    {
      id: 2,
      image: "https://i.pinimg.com/736x/9f/24/56/9f245653e018ea245cfff1c7ad26cd84.jpg",
      title: "Monthly Subscription",
      discount: "15% OFF",
      validTill: "15 May 2024",
      description: "Subscribe for monthly tiffin service"
    },
    {
      id: 3,
      image: "https://i.pinimg.com/736x/f9/38/a2/f938a2710c32280a74176e39328a3179.jpg",
      title: "Weekend Special",
      discount: "25% OFF",
      validTill: "31 May 2024",
      description: "Special weekend menu with 25% off"
    },
  ]

  const handlePromotionPress = (id: number) => {
    router.push('/promotion-analytics');
  }

  return (
    <View className='w-full'>
      <View className='flex-row justify-between items-center px-4 mb-3'>
        <View>
          <Text className='text-white text-xl font-bold'>Special Offers</Text>
          <Text className='text-gray-400 text-sm'>Limited time deals</Text>
        </View>
        <TouchableOpacity 
          onPress={() => router.push('/promotion-analytics')}
          className='flex-row items-center bg-blue-500/20 px-4 py-2 rounded-full'
        >
          <Text className='text-blue-400 mr-2'>View All</Text>
          <Ionicons name="chevron-forward" size={16} color="#60A5FA" />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity 
            activeOpacity={0.8} 
            className='mr-3'
            onPress={() => handlePromotionPress(item.id)}
          >
            <View className='relative'>
              <Image
                source={{ uri: item.image }}
                className='w-96 rounded-lg'
                style={{ aspectRatio: 3 / 2 }}
                resizeMode='cover'
              />
              <View className='absolute top-3 right-3 bg-red-500 px-3 py-1 rounded-full'>
                <Text className='text-white font-bold'>{item.discount}</Text>
              </View>
              <View className='absolute bottom-0 left-0 right-0 bg-black/50 p-3 rounded-b-lg'>
                <Text className='text-white font-bold text-lg'>{item.title}</Text>
                <Text className='text-gray-300 text-sm'>{item.description}</Text>
                <View className='flex-row items-center mt-2'>
                  <Ionicons name="time-outline" size={14} color="#FFD700" />
                  <Text className='text-gray-300 text-xs ml-1'>Valid till {item.validTill}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      />
    </View>
  )
}

export default Promotion