import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import SettingsPageLayout from '@/src/components/layout/SettingsPageLayout'
import * as Location from 'expo-location'
import { userContext } from '@/src/utils/context/ContextApi'
import { Profile } from '@/src/components/interface/AllInterface'
import * as ImagePicker from 'expo-image-picker';
import useUpdateProfile from '@/src/hooks/profile/useUpdateProfile'

const ProfileEdit = () => {
    const { userProfile } = userContext()
    const [profile, setProfile] = useState<Profile>({
        name: userProfile?.User_Name || "",
        email: userProfile?.User_Email || "",
        phone: userProfile?.User_Phone_Number || "",
        address: userProfile?.User_Address?.address || "",
        bio: userProfile?.User_Bio || "",
        gender: userProfile?.User_Gender || "",
        profileImage: userProfile?.User_Image || "",
        latitude: userProfile?.User_Address?.latitude || null,
        longitude: userProfile?.User_Address?.longitude || null
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [locationDetails, setLocationDetails] = useState<{
        street?: string;
        city?: string;
        region?: string;
        country?: string;
        district?: string;
        subregion?: string;
        postalCode?: string;
        name?: string;
        isoCountryCode?: string;
    } | null>(null);

    const validateField = (key: keyof Profile, value: string) => {
        switch (key) {
            case 'name':
                if (!value.trim()) return 'Name is required';
                if (value.length < 3) return 'Name must be at least 3 characters';
                return '';
            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
                return '';
            case 'phone':
                if (!value.trim()) return 'Phone number is required';
                if (!/^[0-9]{10}$/.test(value)) return 'Phone number must be 10 digits';
                return '';
            case 'address':
                if (!value.trim()) return 'Address is required';
                if (value.length < 10) return 'Address must be at least 10 characters';
                return '';
            case 'bio':
                if (value.length > 200) return 'Bio must be less than 200 characters';
                return '';
            case 'gender':
                if (!value.trim()) return 'Gender is required';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (key: keyof Profile, value: string) => {
        setProfile(prev => ({
            ...prev,
            [key]: value
        }));

        const error = validateField(key, value);
        setErrors(prev => ({
            ...prev,
            [key]: error
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        Object.keys(profile).forEach(key => {
            const error = validateField(key as keyof Profile, profile[key as keyof Profile] as string);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const getCurrentLocation = async () => {
        setIsLoadingLocation(true);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Please allow location access to use this feature.');
                setIsLoadingLocation(false);
                return;
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High
            });

            setProfile(prev => ({
                ...prev,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }));

            const [address] = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });

            if (address) {
                const detailedAddress = {
                    street: address.street?.replace(/^\d+\s*/, '') || undefined,
                    city: address.city || undefined,
                    region: address.region || undefined,
                    country: address.country || undefined,
                    district: address.district || undefined,
                    subregion: address.subregion || undefined,
                    postalCode: address.postalCode || undefined,
                    name: address.name?.replace(/^\d+\s*/, '') || undefined,
                    isoCountryCode: address.isoCountryCode || undefined
                };

                setLocationDetails(detailedAddress);

                const addressParts = [
                    address.name?.replace(/^\d+\s*/, ''),
                    address.street?.replace(/^\d+\s*/, ''),
                    address.district,
                    address.city,
                    address.subregion,
                    address.region,
                    address.postalCode,
                    address.country
                ].filter(Boolean);

                const formattedAddress = addressParts.join(', ');
                setProfile(prev => ({
                    ...prev,
                    address: formattedAddress
                }));
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to get location. Please try again.');
        } finally {
            setIsLoadingLocation(false);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfile(prev => ({
                ...prev,
                profileImage: result.assets[0].uri
            }));
        }
    };

    const ErrorMessage = ({ message }: { message: string }) => (
        <View className="flex-row items-center mt-1">
            <Ionicons name="alert-circle" size={16} color="#ef4444" />
            <Text className="text-red-500 ml-1 text-sm">{message}</Text>
        </View>
    );

    const formFields = [
        {
            title: "Profile Picture",
            type: "image",
            icon: "camera-outline",
            action: pickImage
        },
        {
            title: "Full Name",
            value: profile.name,
            onChange: (value: string) => handleChange('name', value),
            icon: "person-outline",
            placeholder: "Enter your full name",
            error: errors.name
        },
        {
            title: "Email",
            value: profile.email,
            onChange: (value: string) => handleChange('email', value),
            icon: "mail-outline",
            placeholder: "Enter your email",
            keyboardType: "email-address" as const,
            error: errors.email
        },
        {
            title: "Phone",
            value: profile.phone,
            onChange: (value: string) => handleChange('phone', value),
            icon: "call-outline",
            placeholder: "Enter your phone number",
            keyboardType: "phone-pad" as const,
            error: errors.phone
        },
        {
            title: "Location",
            type: "location",
            value: profile.address,
            onChange: (value: string) => handleChange('address', value),
            icon: "location-outline",
            placeholder: "Enter your address",
            multiline: true,
            error: errors.address,
            actions: [
                {
                    title: "Current Location",
                    icon: "navigate-outline",
                    action: getCurrentLocation
                },
            ]
        },
        {
            title: "Bio",
            value: profile.bio,
            onChange: (value: string) => handleChange('bio', value),
            icon: "document-text-outline",
            placeholder: "Tell us about yourself",
            multiline: true,
            error: errors.bio
        },
        {
            title: "Gender",
            value: profile.gender,
            onChange: (value: string) => handleChange('gender', value),
            icon: "male-female-outline",
            placeholder: "Select your gender",
            type: "select",
            options: ["Male", "Female", "Other"],
            error: errors.gender
        }
    ];

    const { updateProfile } = useUpdateProfile()

    const updateProfileFunction = async () => {
        if (!validateForm()) {
            Alert.alert('Validation Error', 'Please check all fields and try again');
            return;
        }

        setIsLoading(true)
        await updateProfile(profile, setIsLoading)
    }

    return (
        <SettingsPageLayout title="Edit Profile">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="items-center mb-6">
                    <View>
                        <View className="w-36 h-36 rounded-full bg-zinc-800 items-center justify-center mb-4">
                            {profile.profileImage ? (
                                <Image
                                    source={{ uri: profile.profileImage }}
                                    className="w-full h-full rounded-full"
                                />
                            ) : (
                                <Ionicons name="person-outline" size={40} color="#FFD700" />
                            )}
                        </View>
                    </View>
                </View>

                {formFields.map((field) => (
                    <View key={field.title} className="bg-zinc-800 rounded-xl p-4 mb-4">
                        <View className="flex-row items-center mb-2">
                            <View className="w-10 h-10 rounded-full bg-zinc-700 items-center justify-center mr-3">
                                <Ionicons name={field.icon as any} size={20} color="#FFD700" />
                            </View>
                            <Text className="text-white text-lg">{field.title}</Text>
                        </View>

                        {field.type === 'image' ? (
                            <TouchableOpacity onPress={field.action} className="py-2">
                                <Text className="text-[#FFD700] text-center">Change Profile Picture</Text>
                            </TouchableOpacity>
                        ) : field.type === 'select' ? (
                            <View className="flex-row gap-2">
                                {field.options?.map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        onPress={() => field.onChange?.(option)}
                                        className={`flex-1 py-2 rounded-lg ${profile[field.title.toLowerCase() as keyof Profile] === option
                                            ? 'bg-[#FFD700]'
                                            : 'bg-zinc-700'
                                            }`}
                                    >
                                        <Text className={`text-center ${profile[field.title.toLowerCase() as keyof Profile] === option
                                            ? 'text-black font-semibold'
                                            : 'text-white'
                                            }`}>
                                            {option}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ) : field.type === 'location' ? (
                            <View>
                                {locationDetails && (
                                    <View className="bg-zinc-700 rounded-lg p-3 mb-2">
                                        <Text className="text-[#FFD700] font-semibold mb-1">Location Details:</Text>
                                        {locationDetails.name && <Text className="text-white">Place: {locationDetails.name}</Text>}
                                        {locationDetails.street && <Text className="text-white">Street: {locationDetails.street}</Text>}
                                        {locationDetails.district && <Text className="text-white">District: {locationDetails.district}</Text>}
                                        {locationDetails.city && <Text className="text-white">City: {locationDetails.city}</Text>}
                                        {locationDetails.subregion && <Text className="text-white">Sub Region: {locationDetails.subregion}</Text>}
                                        {locationDetails.region && <Text className="text-white">Region: {locationDetails.region}</Text>}
                                        {locationDetails.postalCode && <Text className="text-white">Postal Code: {locationDetails.postalCode}</Text>}
                                        {locationDetails.country && <Text className="text-white">Country: {locationDetails.country}</Text>}
                                    </View>
                                )}
                                <View className="flex-row gap-2">
                                    {field.actions?.map((action) => (
                                        <TouchableOpacity
                                            key={action.title}
                                            onPress={action.action}
                                            disabled={isLoadingLocation && action.title === "Current Location"}
                                            className={`flex-1 bg-zinc-700 py-2 rounded-lg flex-row items-center justify-center ${isLoadingLocation && action.title === "Current Location" ? 'opacity-50' : ''}`}
                                        >
                                            {isLoadingLocation && action.title === "Current Location" ? (
                                                <ActivityIndicator color="#FFD700" />
                                            ) : (
                                                <>
                                                    <Ionicons name={action.icon as any} size={20} color="#FFD700" />
                                                    <Text className="text-white ml-2">{action.title}</Text>
                                                </>
                                            )}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <TextInput
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    placeholder={field.placeholder}
                                    placeholderTextColor="#888"
                                    className="text-white bg-zinc-700 rounded-lg p-3 mt-2"
                                    multiline={field.multiline}
                                />
                            </View>
                        ) : (
                            <TextInput
                                value={field.value}
                                onChangeText={field.onChange}
                                placeholder={field.placeholder}
                                placeholderTextColor="#888"
                                className="text-white bg-zinc-700 rounded-lg p-3"
                                keyboardType={field.keyboardType}
                                multiline={field.multiline}
                            />
                        )}
                        {field.error && <ErrorMessage message={field.error} />}
                    </View>
                ))}

                <TouchableOpacity
                    onPress={updateProfileFunction}
                    disabled={isLoading}
                    className="bg-[#FFD700] mt-6 p-4 rounded-full items-center justify-center"
                >
                    {isLoading ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <Text className="text-black font-bold text-lg">Save Changes</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SettingsPageLayout>
    );
};

export default ProfileEdit;
