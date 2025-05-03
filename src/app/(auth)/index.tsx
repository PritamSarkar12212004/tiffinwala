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
  Modal,
  Animated,
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
import LottiAnimation from '@/src/components/layout/LottiAnimation';
import LottiConstant from '@/src/constants/lotti/LottiConstant';

const LoadingModal = ({ visible }: { visible: boolean }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          backgroundColor: BgColor.Primary,
          padding: 20,
          borderRadius: 15,
          alignItems: 'center',
          width: '80%',
          maxWidth: 300,
        }}>
          <LottiAnimation width={150} height={150} bg={"transparent"} path={LottiConstant.productUpload} />
          <Text style={{
            color: '#FFFFFF',
            fontSize: 18,
            marginTop: 16,
            textAlign: 'center',
          }}>
            Verifying your number...
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const index = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [responseOtp, setResponseotp] = useState('');
  const { setUserProfile, setUserTemLocation, setIsAuthNotificationVisible } = userContext();


  const handleSendOtp = () => {
    setIsLoading(true)
    if (phoneNumber.length < 10) {
      setIsLoading(false)
      setIsAuthNotificationVisible({
        status: true,
        message: "Please enter a valid phone number"
      })
    } else {
      api.post("/api/otp/signin", {
        number: phoneNumber
      }).then((res) => {
        if (res.data.data.otp) {
          setResponseotp(res.data.data.otp)
          setOtpSent(true);
          setShowOtpInput(true);
          setIsLoading(false)
        } else {
          setIsAuthNotificationVisible({
            status: true,
            message: "Otp Ricived Error"
          })
          setIsLoading(false)
        }
      }).catch((err) => {
        setIsAuthNotificationVisible({
          status: true,
          message: err.response.data.message
        })
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
          setIsAuthNotificationVisible({
            status: true,
            message: "User Not exists Please Sign Up"
          })
        } else if (err.status === 500) {
          setIsAuthNotificationVisible({
            status: true,
            message: "Server Error"
          })
        }
        setIsLoading(false)
      })
    } else {
      setIsAuthNotificationVisible({
        status: true,
        message: "Invalid Otp Please Enter valid Otp"
      })
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
      <LoadingModal visible={isLoading} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 py-6 px-4">
          {/* Logo and Welcome Text */}
          <View className="items-center mt-12 mb-16">
            <View className="w-32 h-32 rounded-full mb-6 border-4 overflow-hidden" style={{ borderColor: BgColor.Accent }}>
              <Image
                source={LogoContant.logo3}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-4xl font-bold text-white mb-3 text-center">Welcome to TiffinWala</Text>
            <Text className="text-zinc-400 text-center text-lg">
              Your daily dose of homemade happiness
            </Text>
          </View>

          {/* Sign In Form */}
          <View className="bg-zinc-800/50 p-6 rounded-3xl shadow-2xl backdrop-blur-lg">
            {!showOtpInput ? (
              // Phone Number Input
              <View>
                <View className="mb-8">
                  <Text className="text-zinc-400 mb-3 text-lg">Phone Number</Text>
                  <View className="flex-row items-center bg-zinc-700/50 rounded-2xl px-4 py-4 border border-zinc-600">
                    <Ionicons name="call-outline" size={24} color={BgColor.Accent} />
                    <TextInput
                      className="flex-1 ml-3 text-white text-lg"
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
                  className="h-16 flex items-center justify-center rounded-2xl mb-6"
                  onPress={() => isLoading ? null : handleSendOtp()}
                  style={{ backgroundColor: BgColor.Accent }}
                  activeOpacity={0.8}
                >
                  {isLoading ?
                    <ActivityIndicator size="large" color={BgColor.Primary} /> :
                    <Text className="text-white text-center font-bold text-lg">
                      Send OTP
                    </Text>
                  }
                </TouchableOpacity>
              </View>
            ) : (
              // OTP Verification
              <View>
                <View className="mb-8">
                  <Text className="text-zinc-400 mb-3 text-lg">Enter OTP</Text>
                  <View className="flex-row items-center bg-zinc-700/50 rounded-2xl px-4 py-4 border border-zinc-600">
                    <Ionicons name="key-outline" size={24} color={BgColor.Accent} />
                    <TextInput
                      className="flex-1 ml-3 text-white text-lg"
                      placeholder="Enter 6-digit OTP"
                      placeholderTextColor="#666"
                      value={otp}
                      onChangeText={setOtp}
                      keyboardType="number-pad"
                      maxLength={6}
                    />
                  </View>
                  {otpSent && (
                    <Text className="text-green-400 text-base mt-3">
                      OTP sent to {phoneNumber}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  className="h-16 flex items-center justify-center rounded-2xl mb-6"
                  onPress={() => isLoading ? null : handleVerifyOtp()}
                  style={{ backgroundColor: BgColor.Accent }}
                  activeOpacity={0.8}
                >
                  {isLoading ?
                    <ActivityIndicator size="large" color={BgColor.Primary} /> :
                    <Text className="text-white text-center font-bold text-lg">
                      Verify OTP
                    </Text>
                  }
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row justify-center items-center mb-6"
                  onPress={() => setShowOtpInput(false)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="arrow-back" size={24} color={BgColor.Accent} />
                  <Text className="text-zinc-400 ml-2 text-base">Change phone number</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Sign Up Link */}
            <View className="flex-row justify-center">
              <Text className="text-zinc-400 text-base">Don't have an account? </Text>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('sign-up' as never)}>
                <Text className="text-blue-400 font-bold text-base">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Features Grid */}
          <View className="mt-12 flex-row flex-wrap justify-between">
            <View className="bg-zinc-800/50 p-6 rounded-3xl w-[48%] mb-6 border border-zinc-700">
              <Ionicons name="restaurant-outline" size={28} color={BgColor.Accent} />
              <Text className="text-white mt-3 text-lg font-semibold">Daily Fresh Food</Text>
              <Text className="text-zinc-400 text-base">Made with love</Text>
            </View>
            <View className="bg-zinc-800/50 p-6 rounded-3xl w-[48%] mb-6 border border-zinc-700">
              <Ionicons name="time-outline" size={28} color={BgColor.Accent} />
              <Text className="text-white mt-3 text-lg font-semibold">On-Time Delivery</Text>
              <Text className="text-zinc-400 text-base">Always punctual</Text>
            </View>
            <View className="bg-zinc-800/50 p-6 rounded-3xl w-[48%] border border-zinc-700">
              <Ionicons name="nutrition-outline" size={28} color={BgColor.Accent} />
              <Text className="text-white mt-3 text-lg font-semibold">Healthy Options</Text>
              <Text className="text-zinc-400 text-base">Balanced diet</Text>
            </View>
            <View className="bg-zinc-800/50 p-6 rounded-3xl w-[48%] border border-zinc-700">
              <Ionicons name="heart-outline" size={28} color={BgColor.Accent} />
              <Text className="text-white mt-3 text-lg font-semibold">Home Style</Text>
              <Text className="text-zinc-400 text-base">Just like mom's</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default index; 