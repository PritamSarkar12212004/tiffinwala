import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import LottiAnimation from '@/src/components/layout/LottiAnimation'
import LottiConstant from '@/src/constants/lotti/LottiConstant'
import PageNavigation from '@/src/components/navigation/PageNavigation'
import * as Location from 'expo-location';
import { useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { getFullData, setFullData } from '@/src/functions/storage/Storage'
import AuthToken from '@/src/constants/token/AuthToken'

const LocationPage = () => {
    const navigation = useNavigation()
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [locationDetails, setLocationDetails] = useState<Location.LocationGeocodedAddress | null>(null);

    const getCurrentLocation = async () => {
        try {
            setIsLoading(true);
            setErrorMsg(null);

            // Check if location services are enabled
            const enabled = await Location.hasServicesEnabledAsync();
            if (!enabled) {
                setErrorMsg('Location services are disabled. Please enable them in your device settings.');
                return;
            }

            // Request permissions
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            // Get current position
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });
            setLocation(location);

            // Get location details using reverse geocoding
            const [address] = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            if (address) {
                setLocationDetails(address);
            }


        } catch (error) {
            console.
                error('Location Error:', error);
            setErrorMsg('Failed to get location. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }
    const locationSeter = async () => {
        if (location && locationDetails) {
            const addressParts = [
                locationDetails.name?.replace(/^\d+\s*/, ''),
                locationDetails.street?.replace(/^\d+\s*/, ''),
                locationDetails.district,
                locationDetails.city,
                locationDetails.subregion,
                locationDetails.region,
                locationDetails.postalCode,
                locationDetails.country
            ].filter(Boolean);

            const formattedAddress = addressParts.join(', ');
            const fullLogin = getFullData(AuthToken.UserInfo);
            const data = {
                User_Bio: fullLogin.User_Bio,
                User_Created_At: fullLogin.User_Created_At,
                User_Email: fullLogin.User_Email,
                User_Gender: fullLogin.User_Gender,
                User_Image: fullLogin.User_Image,
                User_Name: fullLogin.User_Name,
                User_Phone_Number: fullLogin.User_Phone_Number,
                createdAt: fullLogin.createdAt,
                updatedAt: fullLogin.updatedAt,
                userPostList: fullLogin.userPostList,
                __v: fullLogin.__v,
                _id: fullLogin._id,
                User_Address: {
                    address: formattedAddress,
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }
            }

            setFullData(AuthToken.UserInfo, data)
            navigation.goBack()
        }
    }

    useEffect(() => {
        getCurrentLocation();
        return () => {
            setLocation(null);
            setErrorMsg(null);
            setLocationDetails(null);
            setIsLoading(true);
        }
    }, []);

    if (errorMsg) {
        return (
            <View className='w-full h-full flex px-2 bg-black'>
                <PageNavigation path="Location" />
                <View className='flex-1 w-full items-center justify-center gap-4'>
                    <View className='w-20 h-20 rounded-full bg-red-500/20 items-center justify-center'>
                        <Ionicons name="alert-circle" size={40} color="#FF6B6B" />
                    </View>
                    <Text className='text-white text-xl font-bold text-center'>Location Access Denied</Text>
                    <Text className='text-zinc-400 text-center px-4'>{errorMsg}</Text>
                    <TouchableOpacity
                        onPress={getCurrentLocation}
                        className='bg-zinc-800 px-6 py-3 rounded-full flex-row items-center gap-2'
                    >
                        <Ionicons name="refresh" size={20} color="#FFD700" />
                        <Text className='text-white font-semibold'>Try Again</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    if (location && locationDetails) {
        return (
            <View className='w-full h-full flex bg-black'>
                <PageNavigation path="Location" />
                <View className='flex-1 w-full px-4'>
                    {/* Header */}
                    <View className='flex-row items-center justify-between mb-6 mt-4'>
                        <View>
                            <Text className='text-white text-2xl font-bold'>Location Details</Text>
                            <Text className='text-zinc-400 text-sm'>Your current location information</Text>
                        </View>
                        <View className='w-12 h-12 rounded-full bg-green-500/20 items-center justify-center'>
                            <Ionicons name="checkmark-circle" size={30} color="#4CAF50" />
                        </View>
                    </View>

                    {/* Location Card */}
                    <View className='bg-zinc-800 rounded-2xl overflow-hidden mb-6'>
                        <View className='p-4 border-b border-zinc-700'>
                            <Text className='text-zinc-400 text-sm mb-1'>Current Address</Text>
                            <Text className='text-white text-lg font-semibold'>{locationDetails.formattedAddress}</Text>
                        </View>
                        <View className='p-4'>
                            <Text className='text-zinc-400 text-sm mb-2'>Coordinates</Text>
                            <View className='flex-row justify-between items-center'>
                                <View>
                                    <Text className='text-zinc-400 text-xs'>Latitude</Text>
                                    <Text className='text-white font-medium'>{location.coords.latitude.toFixed(6)}</Text>
                                </View>
                                <View>
                                    <Text className='text-zinc-400 text-xs'>Longitude</Text>
                                    <Text className='text-white font-medium'>{location.coords.longitude.toFixed(6)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View className='flex-row gap-3'>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            className='flex-1 bg-zinc-800 py-4 rounded-xl flex-row items-center justify-center gap-2'
                        >
                            <Ionicons name="arrow-back" size={24} color="white" />
                            <Text className='text-white font-semibold text-lg'>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => locationSeter()}
                            className='flex-1 bg-[#FFD700] py-4 rounded-xl flex-row items-center justify-center gap-2'
                        >
                            <Ionicons name="checkmark-circle" size={24} color="black" />
                            <Text className='text-black font-bold text-lg'>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View className='w-full h-full flex px-2 bg-black'>
            <PageNavigation path="Location" />
            <View className='flex-1 w-full items-center justify-center gap-4'>
                <LottiAnimation height={300} width={300} path={LottiConstant.mapLoading} bg={"black"} />
                <Text className='text-white text-xl font-bold'>Getting Your Location</Text>
                <Text className='text-zinc-400 text-center px-4'>Please allow location access to find tiffin services near you</Text>
                {isLoading && (
                    <ActivityIndicator size="large" color="#FFD700" />
                )}
                {!isLoading && (
                    <TouchableOpacity
                        onPress={getCurrentLocation}
                        className='bg-zinc-800 px-6 py-3 rounded-full flex-row items-center gap-2'
                    >
                        <Ionicons name="refresh" size={20} color="#FFD700" />
                        <Text className='text-white font-semibold'>Try Again</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default LocationPage