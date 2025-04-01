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
import { Link, router, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BgColor from '@/src/constants/color/BgColor';

const index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleSignIn = () => {
    router.replace('/(main)');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      style={{ backgroundColor: BgColor.Primary }}
    >
      <ScrollView className="flex-1">
        <View className="flex-1 p-y-6 px-3 mb-10">
          {/* Logo and Welcome Text */}
          <View className="items-center mt-16 mb-12">
            <Image
              source={{ uri: 'https://via.placeholder.com/120' }}
              className="w-32 h-32 rounded-full mb-6 border-4"
              style={{ borderColor: BgColor.Accent }}
            />
            <Text className="text-3xl font-bold text-white mb-2">Welcome to TiffinWala</Text>
            <Text className="text-zinc-400 text-center">
              Your daily dose of homemade happiness
            </Text>
          </View>

          {/* Sign In Form */}
          <View className="bg-zinc-800 p-6 rounded-2xl shadow-lg">
            <View className="mb-6">
              <Text className="text-zinc-400 mb-2">Email</Text>
              <View className="flex-row items-center bg-zinc-700 rounded-xl px-4 py-3">
                <Ionicons name="mail-outline" size={20} color={BgColor.Accent} />
                <TextInput
                  className="flex-1 ml-3 text-white"
                  placeholder="Enter your email"
                  placeholderTextColor="#666"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View className="mb-8">
              <Text className="text-zinc-400 mb-2">Password</Text>
              <View className="flex-row items-center bg-zinc-700 rounded-xl px-4 py-3">
                <Ionicons name="lock-closed-outline" size={20} color={BgColor.Accent} />
                <TextInput
                  className="flex-1 ml-3 text-white"
                  placeholder="Enter your password"
                  placeholderTextColor="#666"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={BgColor.Accent}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity className="items-end mb-8">
              <Text className="text-blue-400">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity
              className="bg-blue-500 py-4 rounded-xl mb-6"
              onPress={handleSignIn}
              style={{ backgroundColor: BgColor.Accent }}
            >
              <Text className="text-white text-center font-semibold text-lg">
                Sign In
              </Text>
            </TouchableOpacity>

            {/* Social Sign In */}
            <View className="flex-row justify-center space-x-4 mb-8">
              <TouchableOpacity className="bg-zinc-700 p-3 rounded-full">
                <Ionicons name="logo-google" size={24} color={BgColor.Accent} />
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center">
              <Text className="text-zinc-400">Don't have an account? </Text>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('sign-up')}>
                <Text className="text-blue-400 font-semibold">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tiffin Mess Features */}
          <View className="mt-8 flex-row flex-wrap justify-between">
            <View className="bg-zinc-800 p-4 rounded-xl w-[48%] mb-4">
              <Ionicons name="restaurant-outline" size={24} color={BgColor.Accent} />
              <Text className="text-white mt-2">Daily Fresh Food</Text>
              <Text className="text-zinc-400 text-sm">Made with love</Text>
            </View>
            <View className="bg-zinc-800 p-4 rounded-xl w-[48%] mb-4">
              <Ionicons name="time-outline" size={24} color={BgColor.Accent} />
              <Text className="text-white mt-2">On-Time Delivery</Text>
              <Text className="text-zinc-400 text-sm">Always punctual</Text>
            </View>
            <View className="bg-zinc-800 p-4 rounded-xl w-[48%]">
              <Ionicons name="nutrition-outline" size={24} color={BgColor.Accent} />
              <Text className="text-white mt-2">Healthy Options</Text>
              <Text className="text-zinc-400 text-sm">Balanced diet</Text>
            </View>
            <View className="bg-zinc-800 p-4 rounded-xl w-[48%]">
              <Ionicons name="heart-outline" size={24} color={BgColor.Accent} />
              <Text className="text-white mt-2">Home Style</Text>
              <Text className="text-zinc-400 text-sm">Just like mom's</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default index; 