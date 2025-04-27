import { View, Text, StatusBar, TouchableOpacity, Animated } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from 'expo-router';
import useLikeProductApi from '@/src/hooks/product-api/useLikeProductApi';
import likeFetchData from '@/src/hooks/product-api/likeFetchData';

const ShowProductNavigation = ({ userId, productId, likeData }: { userId: string, productId: string, likeData: any }) => {
  const navigation = useNavigation()
  const [isFavorite, setIsFavorite] = useState(false)
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { likeController } = useLikeProductApi();
  const { likeProductFetch } = likeFetchData();


  const handleFavorite = () => {
    likeController(userId, productId, isFavorite, setIsFavorite)
    setIsFavorite(!isFavorite);
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
      })
    ]).start();
  };
  useEffect(() => {
    likeProductFetch(userId, productId, setIsFavorite)
    return () => {
      setIsFavorite(false)
    }
  }, [likeData])

  return (
    <View className='top-0 w-full flex flex-row absolute items-center justify-between px-2 py-3' style={{ zIndex: 5 }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        className='w-14 h-14 bg-zinc-600/60 rounded-full flex items-center justify-center'
      >
        <Feather name="arrow-left" size={30} color="white" />
      </TouchableOpacity>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleFavorite()}
          className='w-14 h-14 bg-zinc-600/60 rounded-full flex items-center justify-center border-2 border-zinc-500'
        >
          <Feather
            name="heart"
            size={30}
            color={isFavorite ? "#FF4444" : "white"}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default ShowProductNavigation