import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showBackButton = true,
  rightAction,
}) => {
  return (
    <View className="flex-row items-center justify-between mb-6">
      <View className="flex-row items-center">
        {showBackButton && (
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-4"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        )}
        <View>
          <Text className="text-2xl font-bold text-white">{title}</Text>
          {subtitle && (
            <Text className="text-zinc-400">{subtitle}</Text>
          )}
        </View>
      </View>
      {rightAction && (
        <TouchableOpacity onPress={rightAction.onPress}>
          <Ionicons name={rightAction.icon} size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PageHeader; 