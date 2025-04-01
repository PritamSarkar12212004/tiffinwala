import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import SettingsPageLayout from '@/src/components/layout/SettingsPageLayout'
import * as Location from 'expo-location'
import { useRouter } from 'expo-router'

interface Profile {
    name: string;
    email: string;
    phone: string;
    address: string;
    bio: string;
    gender: string;
    profileImage: string | null;
    latitude: number | null;
    longitude: number | null;
}

const ProfileEdit = () => {
    const router = useRouter();
    const [profile, setProfile] = useState<Profile>({
        name: "John Doe",
        email: "john@example.com",
        phone: "+91 1234567890",
        address: "123 Main Street, City",
        bio: "Food lover and tiffin service provider",
        gender: "Male",
        profileImage: null,
        latitude: null,
        longitude: null
    });

    const handleChange = (key: keyof Profile, value: string) => {
        setProfile(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const getCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Please allow location access to use this feature.');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setProfile(prev => ({
                ...prev,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }));

            // Get address from coordinates
            const [address] = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });

            if (address) {
                const formattedAddress = `${address.street || ''} ${address.city || ''} ${address.region || ''} ${address.country || ''}`;
                setProfile(prev => ({
                    ...prev,
                    address: formattedAddress
                }));
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to get location. Please try again.');
        }
    };

    const pickLocationFromMap = () => {
        router.push({
            pathname: '/LocationPicker',
            params: {
                onSelect: JSON.stringify((location: { latitude: number; longitude: number; address: string }) => {
                    setProfile(prev => ({
                        ...prev,
                        latitude: location.latitude,
                        longitude: location.longitude,
                        address: location.address
                    }));
                })
            }
        });
    };

    const formFields = [
        {
            title: "Profile Picture",
            type: "image",
            icon: "camera-outline",
            action: () => {}
        },
        {
            title: "Full Name",
            value: profile.name,
            onChange: (value: string) => handleChange('name', value),
            icon: "person-outline",
            placeholder: "Enter your full name"
        },
        {
            title: "Email",
            value: profile.email,
            onChange: (value: string) => handleChange('email', value),
            icon: "mail-outline",
            placeholder: "Enter your email",
            keyboardType: "email-address" as const
        },
        {
            title: "Phone",
            value: profile.phone,
            onChange: (value: string) => handleChange('phone', value),
            icon: "call-outline",
            placeholder: "Enter your phone number",
            keyboardType: "phone-pad" as const
        },
        {
            title: "Location",
            type: "location",
            value: profile.address,
            onChange: (value: string) => handleChange('address', value),
            icon: "location-outline",
            placeholder: "Enter your address",
            multiline: true,
            actions: [
                {
                    title: "Current Location",
                    icon: "navigate-outline",
                    action: getCurrentLocation
                },
                {
                    title: "Pick from Map",
                    icon: "map-outline",
                    action: pickLocationFromMap
                }
            ]
        },
        {
            title: "Bio",
            value: profile.bio,
            onChange: (value: string) => handleChange('bio', value),
            icon: "document-text-outline",
            placeholder: "Tell us about yourself",
            multiline: true
        },
        {
            title: "Gender",
            value: profile.gender,
            onChange: (value: string) => handleChange('gender', value),
            icon: "male-female-outline",
            placeholder: "Select your gender",
            type: "select",
            options: ["Male", "Female", "Other"]
        }
    ];

    return (
        <SettingsPageLayout title="Edit Profile">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="items-center mb-6">
                    <TouchableOpacity className="relative">
                        <View className="w-24 h-24 rounded-full bg-zinc-800 items-center justify-center mb-4">
                            {profile.profileImage ? (
                                <Image 
                                    source={{ uri: profile.profileImage }} 
                                    className="w-full h-full rounded-full"
                                />
                            ) : (
                                <Ionicons name="person-outline" size={40} color="#FFD700" />
                            )}
                        </View>
                        <View className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#FFD700] items-center justify-center">
                            <Ionicons name="camera-outline" size={16} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="flex gap-3">
                    {formFields.map((field, index) => (
                        <View key={field.title} className="bg-zinc-800 rounded-xl p-4">
                            <View className="flex-row items-center mb-2">
                                <View className="w-10 h-10 rounded-full bg-zinc-700 items-center justify-center mr-3">
                                    <Ionicons name={field.icon as any} size={20} color="#FFD700" />
                                </View>
                                <Text className="text-white text-lg">{field.title}</Text>
                            </View>
                            {field.type === 'select' ? (
                                <View className="flex-row gap-2">
                                    {field.options?.map((option) => (
                                        <TouchableOpacity
                                            key={option}
                                            onPress={() => field.onChange?.(option)}
                                            className={`flex-1 py-2 rounded-lg ${
                                                profile[field.title.toLowerCase() as keyof Profile] === option 
                                                    ? 'bg-[#FFD700]' 
                                                    : 'bg-zinc-700'
                                            }`}
                                        >
                                            <Text 
                                                className={`text-center ${
                                                    profile[field.title.toLowerCase() as keyof Profile] === option 
                                                        ? 'text-black font-semibold' 
                                                        : 'text-white'
                                                }`}
                                            >
                                                {option}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ) : field.type === 'image' ? (
                                <TouchableOpacity 
                                    onPress={field.action}
                                    className="py-2"
                                >
                                    <Text className="text-[#FFD700] text-center">Change Profile Picture</Text>
                                </TouchableOpacity>
                            ) : field.type === 'location' ? (
                                <View>
                                    <TextInput
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        placeholder={field.placeholder}
                                        placeholderTextColor="#71717a"
                                        className="text-white bg-zinc-700 rounded-lg p-3 mb-2"
                                        multiline={field.multiline}
                                    />
                                    <View className="flex-row gap-2">
                                        {field.actions?.map((action) => (
                                            <TouchableOpacity
                                                key={action.title}
                                                onPress={action.action}
                                                className="flex-1 bg-zinc-700 py-2 rounded-lg flex-row items-center justify-center"
                                            >
                                                <Ionicons name={action.icon as any} size={20} color="#FFD700" />
                                                <Text className="text-white ml-2">{action.title}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            ) : (
                                <TextInput
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    placeholder={field.placeholder}
                                    placeholderTextColor="#71717a"
                                    className="text-white bg-zinc-700 rounded-lg p-3"
                                    multiline={field.multiline}
                                    keyboardType={field.keyboardType}
                                />
                            )}
                        </View>
                    ))}
                </View>

                <TouchableOpacity 
                    className="bg-[#FFD700] rounded-xl p-4 mt-6 mb-6"
                    onPress={() => {}}
                >
                    <Text className="text-black text-lg font-semibold text-center">Save Changes</Text>
                </TouchableOpacity>
            </ScrollView>
        </SettingsPageLayout>
    )
}

export default ProfileEdit 