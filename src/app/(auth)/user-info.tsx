import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BgColor from '@/src/constants/color/BgColor';

const UserInfo = () => {
  const [preferences, setPreferences] = useState('');

  const handleSubmit = () => {
    router.replace('/(main)');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      style={{ backgroundColor: BgColor.Primary }}
    >
      <ScrollView className="flex-1">
        <View className="flex-1 p-6">
          {/* Header */}
          <View className="items-center mb-12">
            <Text className="text-3xl font-bold text-white mb-2">Complete Your Profile</Text>
            <Text className="text-zinc-400 text-center">
              Help us personalize your tiffin experience
            </Text>
          </View>

          {/* Profile Picture */}
          <View className="items-center mb-8">
            <View className="relative">
              <Image
                source={{ uri: 'https://via.placeholder.com/120' }}
                className="w-40 h-40 rounded-full mb-4 border-4"
                style={{ borderColor: BgColor.Accent }}
              />
              <TouchableOpacity
                className="absolute bottom-0 right-0 bg-zinc-700 p-3 rounded-full border-2"
                style={{ borderColor: BgColor.Accent }}
              >
                <Ionicons name="camera-outline" size={24} color={BgColor.Accent} />
              </TouchableOpacity>
            </View>
            <Text className="text-zinc-400 text-center mt-2">Tap to change profile photo</Text>
          </View>

          {/* User Info Form */}
          <View className="bg-zinc-800 p-6 rounded-2xl shadow-lg">
            <View className="mb-8">
              <Text className="text-zinc-400 mb-2">Food Preferences</Text>
              <View className="flex-row items-center bg-zinc-700 rounded-xl px-4 py-3">
                <Ionicons name="restaurant-outline" size={20} color={BgColor.Accent} />
                <TextInput
                  className="flex-1 ml-3 text-white"
                  placeholder="Any specific food preferences or allergies?"
                  placeholderTextColor="#666"
                  value={preferences}
                  onChangeText={setPreferences}
                  multiline
                  numberOfLines={3}
                />
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              className="bg-blue-500 py-4 rounded-xl"
              onPress={handleSubmit}
              style={{ backgroundColor: BgColor.Accent }}
            >
              <Text className="text-white text-center font-semibold text-lg">
                Complete Profile
              </Text>
            </TouchableOpacity>
          </View>

          {/* Location Selection */}
          <View className="mt-8">
            <Text className="text-xl font-bold text-white mb-4">Select Your Location</Text>
            <View className="space-y-4">
              <TouchableOpacity className="flex-row items-center bg-zinc-800 p-4 rounded-xl">
                <Ionicons name="location-outline" size={24} color={BgColor.Accent} />
                <View className="ml-4">
                  <Text className="text-white font-semibold">Use Current Location</Text>
                  <Text className="text-zinc-400">Automatically detect your location</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center bg-zinc-800 p-4 rounded-xl">
                <Ionicons name="map-outline" size={24} color={BgColor.Accent} />
                <View className="ml-4">
                  <Text className="text-white font-semibold">Pick on Map</Text>
                  <Text className="text-zinc-400">Choose location from map</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserInfo; 