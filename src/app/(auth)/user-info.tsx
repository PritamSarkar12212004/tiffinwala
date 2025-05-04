import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { router, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BgColor from '@/src/constants/color/BgColor';
import * as Location from 'expo-location';
import { removeTemData } from '@/src/functions/storage/Storage';
import AuthToken from '@/src/constants/token/AuthToken';
import * as ImagePicker from 'expo-image-picker';
import { userContext } from '@/src/utils/context/ContextApi';
import useCreateProfile from '@/src/hooks/profile/useCreateProfile';
import LottiAnimation from '@/src/components/layout/LottiAnimation';
import LottiConstant from '@/src/constants/lotti/LottiConstant';
import { LocationData } from '@/src/components/interface/AllInterface';

export interface FormData {
  username: string;
  email: string;
  gender: string;
  bio: string;
  preferences: string;
  location: LocationData | null;
}

const LoadingModal = ({ visible, message }: { visible: boolean; message: string }) => {
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
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const UserInfo = () => {
  const { setIsAuthNotificationVisible } = userContext();

  const navigation = useNavigation();
  const { location, setLocation } = userContext();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    gender: '',
    bio: '',
    preferences: '',
    location: location
  });
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { createProfile } = useCreateProfile();
  const [uploadingProduct, setUploadingProduct] = useState(false);
  const [uploadDoneModal, setUploadDoneModal] = useState(false);

  useEffect(() => {
    setFormData(prev => ({ ...prev, location }));
  }, [location]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
        setIsAuthNotificationVisible({
          status: true,
          message: 'Location services are disabled. Please enable them in your device settings.'
        });
        setIsLoadingLocation(false);
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setIsAuthNotificationVisible({
          status: true,
          message: 'Permission Denied, Please allow location access to use this feature.'
        });
        setIsLoadingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });

      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      if (address) {
        const locationData: LocationData = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          address: address.street || undefined,
          city: address.city || undefined,
          state: address.region || undefined,
          area: address.district || undefined,
          pincode: address.postalCode || undefined
        };
        setLocation(locationData);
        setFormData(prev => ({ ...prev, location: locationData }));
      }
    } catch (error) {
      setIsAuthNotificationVisible({
        status: true,
        message: 'Failed to get location. Please try again.'
      });
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    if (!formData.username || !formData.gender || !formData.location || !formData.bio) {
      setIsAuthNotificationVisible({
        status: true,
        message: 'Please fill in all required fields'
      });
      setIsLoading(false);
      return;
    }
    setUploadingProduct(true);
    createProfile(formData, image, setIsLoading, setUploadingProduct, setUploadDoneModal);
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      removeTemData(AuthToken.TemLogin);
      navigation.goBack();
    } else {
      removeTemData(AuthToken.TemLogin);
      router.replace("/(auth)");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      style={{ backgroundColor: BgColor.Primary }}
    >
      <LoadingModal visible={uploadingProduct} message="Uploading Your Tiffin Service" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 pt-6 px-4">
          {/* Header with Back Arrow */}
          <View className="flex-row items-center mb-8">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleBack}
              className="mr-4"
            >
              <Ionicons name="arrow-back" size={30} color={BgColor.Accent} />
            </TouchableOpacity>
          </View>

          {/* Header */}
          <View className="items-center mb-12">
            <Text className="text-4xl font-bold text-white mb-3 text-center">Complete Your Profile</Text>
            <Text className="text-zinc-400 text-center text-lg">
              Help us personalize your tiffin experience
            </Text>
          </View>

          {/* Profile Picture */}
          <TouchableOpacity
            className="items-center mb-10"
            onPress={pickImage}
            activeOpacity={0.8}
          >
            <View className="relative">
              {image ? (
                <Image
                  source={{ uri: image }}
                  className="w-40 h-40 rounded-full mb-4 border-4"
                  style={{ borderColor: BgColor.Accent }}
                />
              ) : (
                <Image
                  source={{ uri: 'https://via.placeholder.com/120' }}
                  className="w-40 h-40 rounded-full mb-4 border-4"
                  style={{ borderColor: BgColor.Accent }}
                />
              )}
              <TouchableOpacity
                className="absolute bottom-0 right-0 bg-zinc-700 p-3 rounded-full border-2"
                style={{ borderColor: BgColor.Accent }}
                activeOpacity={0.8}
              >
                <Ionicons name="camera-outline" size={24} color={BgColor.Accent} />
              </TouchableOpacity>
            </View>
            <Text className="text-zinc-400 text-center mt-2 text-base">Tap to change profile photo</Text>
          </TouchableOpacity>

          {/* User Info Form */}
          <View className="bg-zinc-800/50 p-6 rounded-3xl shadow-2xl backdrop-blur-lg">
            {/* Username */}
            <View className="mb-6">
              <Text className="text-zinc-400 mb-3 text-lg">Username *</Text>
              <View className="flex-row items-center bg-zinc-700/50 rounded-2xl px-4 py-4 border border-zinc-600">
                <Ionicons name="person-outline" size={24} color={BgColor.Accent} />
                <TextInput
                  className="flex-1 ml-3 text-white text-lg"
                  placeholder="Enter your username"
                  placeholderTextColor="#666"
                  value={formData.username}
                  onChangeText={(value) => handleInputChange('username', value)}
                />
              </View>
            </View>

            {/* Email */}
            <View className="mb-6">
              <Text className="text-zinc-400 mb-3 text-lg">Email (Optional)</Text>
              <View className="flex-row items-center bg-zinc-700/50 rounded-2xl px-4 py-4 border border-zinc-600">
                <Ionicons name="mail-outline" size={24} color={BgColor.Accent} />
                <TextInput
                  className="flex-1 ml-3 text-white text-lg"
                  placeholder="Enter your email (optional)"
                  placeholderTextColor="#666"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Gender */}
            <View className="mb-6">
              <Text className="text-zinc-400 mb-3 text-lg">Gender *</Text>
              <View className="flex-row gap-3">
                {['Male', 'Female', 'Other'].map((gender) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={gender}
                    className={`flex-1 py-4 rounded-2xl border ${formData.gender === gender
                      ? 'bg-blue-500 border-blue-400'
                      : 'bg-zinc-700/50 border-zinc-600'
                      }`}
                    onPress={() => handleInputChange('gender', gender)}
                  >
                    <Text className="text-white text-center text-lg font-semibold">{gender}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Bio */}
            <View className="mb-6">
              <Text className="text-zinc-400 mb-3 text-lg">Bio *</Text>
              <View className="flex-row items-center bg-zinc-700/50 rounded-2xl px-4 py-4 border border-zinc-600">
                <Ionicons name="document-text-outline" size={24} color={BgColor.Accent} />
                <TextInput
                  className="flex-1 ml-3 text-white text-lg"
                  placeholder="Tell us about yourself"
                  placeholderTextColor="#666"
                  value={formData.bio}
                  onChangeText={(value) => handleInputChange('bio', value)}
                  multiline
                  numberOfLines={3}
                />
              </View>
            </View>

            {/* Location Selection */}
            <View className="mb-8">
              <Text className="text-zinc-400 mb-3 text-lg">Location *</Text>
              <View className="flex gap-3">
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="flex-row items-center bg-zinc-700/50 p-4 rounded-2xl border border-zinc-600"
                  onPress={getCurrentLocation}
                  disabled={isLoadingLocation}
                >
                  <Ionicons name="location-outline" size={24} color={BgColor.Accent} />
                  <View className="ml-4 flex-1">
                    <Text className="text-white font-semibold text-lg">Use Current Location</Text>
                    <Text className="text-zinc-400 text-base">Automatically detect your location</Text>
                  </View>
                  {isLoadingLocation ? (
                    <ActivityIndicator color={BgColor.Accent} />
                  ) : formData.location ? (
                    <Ionicons name="checkmark-circle" size={24} color={BgColor.Accent} />
                  ) : null}
                </TouchableOpacity>

                {formData.location && (
                  <View className="bg-zinc-700/50 p-4 rounded-2xl border border-zinc-600">
                    <Text className="text-white font-semibold mb-2 text-lg">Selected Location:</Text>
                    <Text className="text-zinc-400 text-base">{formData.location.address}, {formData.location.city}, {formData.location.state}</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              className="h-16 flex items-center justify-center rounded-2xl"
              onPress={handleSubmit}
              disabled={isLoading}
              style={{ backgroundColor: BgColor.Accent }}
            >
              <Text className="text-white text-center font-bold text-lg">
                {isLoading ? <ActivityIndicator color={BgColor.Primary} /> : "Complete Profile"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserInfo; 