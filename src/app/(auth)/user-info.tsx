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
  Alert,
  ActivityIndicator,
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

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  state?: string;
  area?: string;
  pincode?: string;
}

interface FormData {
  username: string;
  email: string;
  gender: string;
  bio: string;
  preferences: string;
  location: LocationData | null;
}

const UserInfo = () => {
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

  useEffect(() => {
    setFormData(prev => ({ ...prev, location }));
  }, [location]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to get your current location.');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});

      // Get address details
      const [result] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      if (result) {
        const formattedAddress = [
          result.street,
          result.district,
          result.city,
          result.region,
          result.country
        ].filter(Boolean).join(', ');

        const locationData = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          address: formattedAddress,
          city: result.city || '',
          state: result.region || '',
          area: result.district || '',
          pincode: result.postalCode || ''
        };

        setLocation(locationData);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to get location. Please try again.');
    } finally {
      setIsLoadingLocation(false);
    }
  };


  const [isLoading, setIsLoading] = useState(false);
  const { createProfile } = useCreateProfile();

  const handleSubmit = () => {
    setIsLoading(true);
    if (!formData.username || !formData.gender || !formData.location || !formData.bio) {
      Alert.alert('Error', 'Please fill in all required fields');
      setIsLoading(false);
      return;
    }
    createProfile(formData, image, setIsLoading);
  };
  const handleBack = () => {
    if (navigation.canGoBack()) {
      removeTemData(AuthToken.TemLogin)
      navigation.goBack();
    } else {
      removeTemData(AuthToken.TemLogin)
      router.replace("/(auth)");
    }
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

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
      <ScrollView className="flex-1">
        <View className="flex-1 pt-6 px-3">
          {/* Header with Back Arrow */}
          <View className="flex-row items-center mb-6">
            <TouchableOpacity
              onPress={() =>
                handleBack()
              }
              className="mr-4"
            >
              <Ionicons name="arrow-back" size={30} color={BgColor.Accent} />
            </TouchableOpacity>
          </View>

          {/* Header */}
          <View className="items-center mb-12">
            <Text className="text-3xl font-bold text-white mb-2">Complete Your Profile</Text>
            <Text className="text-zinc-400 text-center">
              Help us personalize your tiffin experience
            </Text>
          </View>

          {/* Profile Picture */}
          <TouchableOpacity className="items-center mb-8" onPress={pickImage}>
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
                />)}
              <TouchableOpacity
                className="absolute bottom-0 right-0 bg-zinc-700 p-3 rounded-full border-2"
                style={{ borderColor: BgColor.Accent }}
              >
                <Ionicons name="camera-outline" size={24} color={BgColor.Accent} />
              </TouchableOpacity>
            </View>
            <Text className="text-zinc-400 text-center mt-2">Tap to change profile photo</Text>
          </TouchableOpacity>

          {/* User Info Form */}
          <View className="bg-zinc-800 p-6 rounded-2xl shadow-lg">
            {/* Username */}
            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Username *</Text>
              <View className="flex-row items-center bg-zinc-700 rounded-xl px-4 py-3">
                <Ionicons name="person-outline" size={20} color={BgColor.Accent} />
                <TextInput
                  className="flex-1 ml-3 text-white"
                  placeholder="Enter your username"
                  placeholderTextColor="#666"
                  value={formData.username}
                  onChangeText={(value) => handleInputChange('username', value)}
                />
              </View>
            </View>

            {/* Email */}
            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Email (Optional)</Text>
              <View className="flex-row items-center bg-zinc-700 rounded-xl px-4 py-3">
                <Ionicons name="mail-outline" size={20} color={BgColor.Accent} />
                <TextInput
                  className="flex-1 ml-3 text-white"
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
            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Gender *</Text>
              <View className="flex-row gap-2">
                {['Male', 'Female', 'Other'].map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    className={`flex-1 py-3 rounded-xl ${formData.gender === gender ? 'bg-blue-500' : 'bg-zinc-700'
                      }`}
                    onPress={() => handleInputChange('gender', gender)}
                  >
                    <Text className="text-white text-center">{gender}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Bio */}
            <View className="mb-4">
              <Text className="text-zinc-400 mb-2">Bio</Text>
              <View className="flex-row items-center bg-zinc-700 rounded-xl px-4 py-3">
                <Ionicons name="document-text-outline" size={20} color={BgColor.Accent} />
                <TextInput
                  className="flex-1 ml-3 text-white"
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
            <View className="mb-6">
              <Text className="text-zinc-400 mb-2">Location *</Text>
              <View className="flex gap-2">
                <TouchableOpacity
                  className="flex-row items-center bg-zinc-700 p-4 rounded-xl"
                  onPress={getCurrentLocation}
                  disabled={isLoadingLocation}
                >
                  <Ionicons name="location-outline" size={24} color={BgColor.Accent} />
                  <View className="ml-4 flex-1">
                    <Text className="text-white font-semibold">Use Current Location</Text>
                    <Text className="text-zinc-400">Automatically detect your location</Text>
                  </View>
                  {isLoadingLocation ? (
                    <ActivityIndicator color={BgColor.Accent} />
                  ) : formData.location ? (
                    <Ionicons name="checkmark-circle" size={24} color={BgColor.Accent} />
                  ) : null}
                </TouchableOpacity>

                {formData.location && (
                  <View className="bg-zinc-700 p-4 rounded-xl">
                    <Text className="text-white font-semibold mb-2">Selected Location:</Text>
                    {formData.location.address && (
                      <Text className="text-zinc-400 mb-2">{formData.location.address}</Text>
                    )}
                    {formData.location.city && (
                      <Text className="text-zinc-400">City: {formData.location.city}</Text>
                    )}
                    {formData.location.state && (
                      <Text className="text-zinc-400">State: {formData.location.state}</Text>
                    )}
                    {formData.location.area && (
                      <Text className="text-zinc-400">Area: {formData.location.area}</Text>
                    )}
                    {formData.location.pincode && (
                      <Text className="text-zinc-400">Pincode: {formData.location.pincode}</Text>
                    )}
                  </View>
                )}

                <TouchableOpacity
                  className="flex-row items-center bg-zinc-700 p-4 rounded-xl"
                  onPress={() => navigation.navigate('LocationPicker' as any)}
                >
                  <Ionicons name="map-outline" size={24} color={BgColor.Accent} />
                  <View className="ml-4">
                    <Text className="text-white font-semibold">Pick on Map</Text>
                    <Text className="text-zinc-400">Choose location from map</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              className="bg-blue-500 h-14 flex items-center justify-center rounded-xl"
              onPress={handleSubmit}
              disabled={isLoading}
              style={{ backgroundColor: BgColor.Accent }}
            >
              <Text className="text-white text-center font-semibold text-lg">
                {isLoading ? <ActivityIndicator color={BgColor.Primary} /> : "Complete Profile"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView >
    </KeyboardAvoidingView >
  );
};

export default UserInfo; 