import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BgColor from '@/src/constants/colors/BgColor';

interface PromotionCardProps {
  title: string;
  description: string;
  imageUrl: string;
  discount: string;
  validUntil: string;
  views: number;
  onPress?: () => void;
}

const PromotionCard: React.FC<PromotionCardProps> = ({
  title,
  description,
  imageUrl,
  discount,
  validUntil,
  views,
  onPress,
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push('/promotion-analytics');
    }
  };

  return (
    <TouchableOpacity
      className="bg-zinc-800 rounded-2xl overflow-hidden mb-4"
      onPress={handlePress}
    >
      <View className="relative">
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-48"
          resizeMode="cover"
        />
        <View className="absolute top-2 right-2 bg-red-500 px-3 py-1 rounded-full">
          <Text className="text-white font-bold">{discount} OFF</Text>
        </View>
      </View>

      <View className="p-4">
        <Text className="text-white text-xl font-bold mb-2">{title}</Text>
        <Text className="text-zinc-400 text-sm mb-3" numberOfLines={2}>
          {description}
        </Text>

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={16} color={BgColor.Accent} />
            <Text className="text-zinc-400 ml-1">Valid till {validUntil}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="eye-outline" size={16} color={BgColor.Accent} />
            <Text className="text-zinc-400 ml-1">{views}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PromotionCard; 