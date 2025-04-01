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
import LogoContant from '@/src/constants/logo/LogoContant';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = () => {
    router.push('/user-info');
  };
  const navigation = useNavigation();


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      style={{ backgroundColor: BgColor.Primary }}
    >
      <ScrollView className="flex-1">
        <View className="flex-1 py-6 px-3">
          {/* Logo and Welcome Text */}
          <View className="items-center mt-16 mb-12">
            <Image
              source={LogoContant.logo3}
              className="w-32 h-32 rounded-full mb-6 border-4"
              style={{ borderColor: BgColor.Accent }}
            />
            <Text className="text-3xl font-bold text-white mb-2">Join TiffinWala</Text>
            <Text className="text-zinc-400 text-center">
              Start your journey to delicious homemade meals
            </Text>
          </View>

          {/* Sign Up Form */}
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

            <View className="mb-6">
              <Text className="text-zinc-400 mb-2">Password</Text>
              <View className="flex-row items-center bg-zinc-700 rounded-xl px-4 py-3">
                <Ionicons name="lock-closed-outline" size={20} color={BgColor.Accent} />
                <TextInput
                  className="flex-1 ml-3 text-white"
                  placeholder="Create a password"
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

            <View className="mb-8">
              <Text className="text-zinc-400 mb-2">Confirm Password</Text>
              <View className="flex-row items-center bg-zinc-700 rounded-xl px-4 py-3">
                <Ionicons name="lock-closed-outline" size={20} color={BgColor.Accent} />
                <TextInput
                  className="flex-1 ml-3 text-white"
                  placeholder="Confirm your password"
                  placeholderTextColor="#666"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={BgColor.Accent}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              className="bg-blue-500 py-4 rounded-xl mb-6"
              onPress={handleSignUp}
              style={{ backgroundColor: BgColor.Accent }}
            >
              <Text className="text-white text-center font-semibold text-lg">
                Create Account
              </Text>
            </TouchableOpacity>

            {/* Social Sign Up */}
            <View className="flex-row justify-center space-x-4 mb-8">
              <TouchableOpacity className="bg-zinc-700 p-3 rounded-full">
                <Ionicons name="logo-google" size={24} color={BgColor.Accent} />
              </TouchableOpacity>

            </View>

            {/* Sign In Link */}
            <View className="flex-row justify-center">
              <Text className="text-zinc-400">Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text className="text-blue-400 font-semibold">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tiffin Mess Benefits */}
          <View className="mt-8">
            <Text className="text-xl font-bold text-white mb-4">Why Choose TiffinWala?</Text>
            <View className="flex gap-2">
              <View className="flex-row items-center bg-zinc-800 p-4 rounded-xl">
                <Ionicons name="checkmark-circle-outline" size={24} color={BgColor.Accent} />
                <View className="ml-4">
                  <Text className="text-white font-semibold">Fresh & Homemade</Text>
                  <Text className="text-zinc-400">Daily fresh food made with love</Text>
                </View>
              </View>
              <View className="flex-row items-center bg-zinc-800 p-4 rounded-xl">
                <Ionicons name="checkmark-circle-outline" size={24} color={BgColor.Accent} />
                <View className="ml-4">
                  <Text className="text-white font-semibold">Flexible Plans</Text>
                  <Text className="text-zinc-400">Choose your meal plan</Text>
                </View>
              </View>
              <View className="flex-row items-center bg-zinc-800 p-4 rounded-xl">
                <Ionicons name="checkmark-circle-outline" size={24} color={BgColor.Accent} />
                <View className="ml-4">
                  <Text className="text-white font-semibold">On-Time Delivery</Text>
                  <Text className="text-zinc-400">Never miss your meal time</Text>
                </View>
              </View>
              <View className="flex-row items-center bg-zinc-800 p-4 rounded-xl">
                <Ionicons name="checkmark-circle-outline" size={24} color={BgColor.Accent} />
                <View className="ml-4">
                  <Text className="text-white font-semibold">Healthy Options</Text>
                  <Text className="text-zinc-400">Balanced and nutritious meals</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp; 