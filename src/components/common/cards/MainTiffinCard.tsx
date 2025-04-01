import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BgColor from '@/src/constants/colors/BgColor';

interface MainTiffinCardProps {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  rating: number;
  likes: number;
  tags: string[];
}

const MainTiffinCard: React.FC<MainTiffinCardProps> = ({
  title,
  description,
  price,
  imageUrl,
  rating,
  likes,
  tags,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleLikePress = () => {
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
  };

  const handleCardPress = () => {
    router.push('/post-view');
  };

  return (
    <TouchableOpacity
      className="bg-zinc-800 rounded-2xl overflow-hidden mb-4"
      onPress={handleCardPress}
    >
      <View className="relative">
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-48"
          resizeMode="cover"
        />
        <View className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded-full">
          <Text className="text-white text-sm">₹{price}</Text>
        </View>
      </View>

      <View className="p-4">
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-white text-lg font-semibold flex-1 mr-2">
            {title}
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="star" size={16} color={BgColor.Accent} />
            <Text className="text-white ml-1">{rating}</Text>
          </View>
        </View>

        <Text className="text-zinc-400 text-sm mb-3" numberOfLines={2}>
          {description}
        </Text>

        <View className="flex-row flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <View
              key={index}
              className="bg-zinc-700 px-2 py-1 rounded-full"
            >
              <Text className="text-zinc-300 text-xs">{tag}</Text>
            </View>
          ))}
        </View>

        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={handleLikePress}
          >
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Ionicons name="heart-outline" size={24} color={BgColor.Accent} />
            </Animated.View>
            <Text className="text-zinc-400 ml-1">{likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-zinc-700 px-4 py-2 rounded-full"
            onPress={handleCardPress}
          >
            <Text className="text-white">View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MainTiffinCard; 