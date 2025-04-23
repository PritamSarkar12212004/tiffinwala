import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import useFetchProduct from '@/src/hooks/product-api/useFetchProduct';
import PostProductProfilecard from '../cards/profile/PostProductProfilecard';
import PostProductProfileEmptyCard from '../cards/profile/PostProductProfileEmptyCard';
import { userContext } from '@/src/utils/context/ContextApi';

const ProfilePost = () => {
    const { product, setProduct, productReloader,
    } = userContext()
    const navigation = useNavigation()
    const { fetchProduct } = useFetchProduct()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct({ setProduct, setLoading })
        return () => {
            setProduct([])
        }
    }, [productReloader])

    return (
        <View className='w-full mb-4 '>
            <View className='flex-row items-center justify-between mb-4'>
                <View>
                    <Text className='text-white text-xl font-bold'>Your Posts</Text>
                    <Text className='text-zinc-400 text-sm'>Share your food moments</Text>
                </View>
                {
                    product.length > 0 ? <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("YourPosts" as never)} className='flex-row items-center gap-2 bg-zinc-800 px-4 py-2 rounded-full'>
                        <Text className='text-white font-medium'>See All</Text>
                        <Ionicons name="chevron-forward" size={20} color="white" />
                    </TouchableOpacity> : null
                }
            </View>

            {loading ? (
                <View className="py-10 items-center justify-center">
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            ) : product.length > 0 ? (
                <ScrollView horizontal >

                    {product.slice(0, 3).map((item, index) => (
                        <View key={index} className="mb-4">
                            <PostProductProfilecard item={item} />
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <PostProductProfileEmptyCard />
            )
            }
        </View >
    )
}

export default ProfilePost