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
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BgColor from '@/src/constants/color/BgColor';
import api from '@/src/utils/api/Axios';
import LogoContant from '@/src/constants/logo/LogoContant';
import { setFullData, setLocationData } from '@/src/functions/storage/Storage';
import AuthToken from '@/src/constants/token/AuthToken';
import { userContext } from '@/src/utils/context/ContextApi';
import UtilsToken from '@/src/constants/token/UtilsToken';

const index = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [responseOtp, setResponseotp] = useState('');
  const { setUserProfile, setUserTemLocation } = userContext();

  const handleSendOtp = () => {

    setIsLoading(true)
    if (phoneNumber.length < 10) {
      setIsLoading(false)
      Alert.alert('Error', 'Please enter a valid phone number');
    } else {
      api.post("/api/otp/signin", {
        number: phoneNumber
      }).then((res) => {
        if (res.data.success) {
          setResponseotp(res.data.otp.otp)
          setOtpSent(true);
          setShowOtpInput(true);
          setIsLoading(false)
        } else {
          Alert.alert("Otp Ricived Error")
          setIsLoading(false)
        }
      }).catch((err) => {
        Alert.alert("Otp Sending Error")
        setIsLoading(false)
      })
    }

  };
  const handleVerifyOtp = () => {
    setIsLoading(true)
    if (responseOtp == otp) {
      api.post("/api/user/profile-login", {
        phone: phoneNumber
      }).then((res) => {
        if (res.data.success) {
          setFullData(AuthToken.UserInfo, res.data.data)
          setUserProfile(res.data.data)
          setLocationData(UtilsToken.Location, res.data.data.User_Address);
          setUserTemLocation(res.data.data.User_Address);

          cleanup()
          router.replace('/(main)/(tab)' as any);
        }
      }).catch((err) => {
        if (err.status === 400) {
          Alert.alert("Error", "User Not exists Please Sign Up");
        } else if (err.status === 500) {
          Alert.alert("Error", "Server Error");
        }
        setIsLoading(false)
      })
    } else {
      Alert.alert("Invalid Otp Please Enter valid Otp")
      setIsLoading(false)
    }
  };

  const cleanup = () => {
    setOtpSent(false);
    setResponseotp("");
    setShowOtpInput(false);
    setOtp("");
    setPhoneNumber("");
  }
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
            <Text className="text-3xl font-bold text-white mb-2">Welcome to TiffinWala</Text>
            <Text className="text-zinc-400 text-center">
              Your daily dose of homemade happiness
            </Text>
          </View>

          {/* Sign In Form */}
          <View className="bg-zinc-800 p-6 rounded-2xl shadow-lg">
            {!showOtpInput ? (
              // Phone Number Input
              <View>
                <View className="mb-6">
                  <Text className="text-zinc-400 mb-2">Phone Number</Text>
                  <View className="flex-row items-center bg-zinc-700 rounded-xl px-4 py-3">
                    <Ionicons name="call-outline" size={20} color={BgColor.Accent} />
                    <TextInput
                      className="flex-1 ml-3 text-white"
                      placeholder="Enter your phone number"
                      placeholderTextColor="#666"
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      keyboardType="phone-pad"
                      maxLength={10}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  className="bg-blue-500 h-14 flex items-center justify-center rounded-xl mb-6"
                  onPress={() => isLoading ? null : handleSendOtp()}
                  style={{ backgroundColor: BgColor.Accent }}
                >
                  {isLoading ? <ActivityIndicator size="large" color={BgColor.Accent} /> :
                    <Text className="text-white text-center font-semibold text-lg">
                      Send OTP
                    </Text>
                  }
                </TouchableOpacity>
              </View>
            ) : (
              // OTP Verification
              <View>
                <View className="mb-6">
                  <Text className="text-zinc-400 mb-2">Enter OTP</Text>
                  <View className="flex-row items-center bg-zinc-700 rounded-xl px-4 py-3">
                    <Ionicons name="key-outline" size={20} color={BgColor.Accent} />
                    <TextInput
                      className="flex-1 ml-3 text-white"
                      placeholder="Enter 6-digit OTP"
                      placeholderTextColor="#666"
                      value={otp}
                      onChangeText={setOtp}
                      keyboardType="number-pad"
                      maxLength={6}
                    />
                  </View>
                  {otpSent && (
                    <Text className="text-green-400 text-sm mt-2">
                      OTP sent to {phoneNumber}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  className="bg-blue-500 h-14 flex items-center justify-center rounded-xl mb-6"
                  onPress={() => isLoading ? null : handleVerifyOtp()}
                  style={{ backgroundColor: BgColor.Accent }}
                >
                  {isLoading ? <ActivityIndicator size="large" color={BgColor.Accent} /> :
                    <Text className="text-white text-center font-semibold text-lg">
                      Verify OTP
                    </Text>
                  }
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row justify-center items-center mb-6"
                  onPress={() => setShowOtpInput(false)}
                >
                  <Ionicons name="arrow-back" size={20} color={BgColor.Accent} />
                  <Text className="text-zinc-400 ml-2">Change phone number</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Sign Up Link */}
            <View className="flex-row justify-center">
              <Text className="text-zinc-400">Don't have an account? </Text>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('sign-up' as never)}>
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