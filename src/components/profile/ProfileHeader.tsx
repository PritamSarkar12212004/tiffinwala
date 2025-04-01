import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BgColor from '@/src/constants/colors/BgColor';
import { User } from '@/src/types';

interface ProfileHeaderProps {
  user: User;
  onEditPress?: () => void;
  stats?: {
    posts: number;
    followers: number;
    following: number;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  onEditPress,
  stats,
}) => {
  return (
    <View className="bg-zinc-800 p-4 rounded-2xl mb-4">
      <View className="flex-row items-center">
        <View className="relative">
          <Image
            source={{ uri: user.profilePhoto || 'https://via.placeholder.com/100' }}
            className="w-20 h-20 rounded-full"
          />
          {onEditPress && (
            <TouchableOpacity
              className="absolute bottom-0 right-0 bg-zinc-700 p-2 rounded-full"
              onPress={onEditPress}
            >
              <Ionicons name="camera" size={16} color={BgColor.Accent} />
            </TouchableOpacity>
          )}
        </View>
        <View className="ml-4 flex-1">
          <Text className="text-white text-xl font-bold">{user.name}</Text>
          <Text className="text-zinc-400">{user.email}</Text>
        </View>
      </View>

      {stats && (
        <View className="flex-row justify-between mt-4 pt-4 border-t border-zinc-700">
          <View className="items-center">
            <Text className="text-white text-lg font-bold">{stats.posts}</Text>
            <Text className="text-zinc-400">Posts</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-lg font-bold">{stats.followers}</Text>
            <Text className="text-zinc-400">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-lg font-bold">{stats.following}</Text>
            <Text className="text-zinc-400">Following</Text>
          </View>
        </View>
      )}

      {user.preferences && user.preferences.length > 0 && (
        <View className="mt-4">
          <Text className="text-zinc-400 mb-2">Preferences</Text>
          <View className="flex-row flex-wrap gap-2">
            {user.preferences.map((pref, index) => (
              <View
                key={index}
                className="bg-zinc-700 px-2 py-1 rounded-full"
              >
                <Text className="text-zinc-300 text-xs">{pref}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default ProfileHeader; 