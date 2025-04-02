import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import LottiAnimation from '@/src/components/layout/LottiAnimation'
import LottiConstant from '@/src/constants/lotti/LottiConstant'
import PageNavigation from '@/src/components/navigation/PageNavigation'
import * as Location from 'expo-location';
import { useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

const LocationPage = () => {
    const navigation = useNavigation()
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [locationDetails, setLocationDetails] = useState<{
        address?: string;
        city?: string;
        state?: string;
    } | null>(null);

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
                setLocationDetails({
                    address: address.street,
                    city: address.city,
                    state: address.region,
                });
            }

            // Log location details
            console.log('Location Details:', {
                coordinates: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                },
                address: address,
                timestamp: new Date(location.timestamp).toLocaleString(),
            });

        } catch (error) {
            console.error('Location Error:', error);
            setErrorMsg('Failed to get location. Please try again.');
        } finally {
            setIsLoading(false);
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
            <View className='w-full h-full flex px-2 bg-black'>
                <PageNavigation path="Location" />
                <View className='flex-1 w-full items-center justify-center gap-4'>
                    <View className='w-20 h-20 rounded-full bg-green-500/20 items-center justify-center'>
                        <Ionicons name="checkmark-circle" size={40} color="#4CAF50" />
                    </View>
                    <Text className='text-white text-xl font-bold text-center'>Location Found!</Text>
                    <View className='bg-zinc-800 p-4 rounded-xl w-full mx-4'>
                        <Text className='text-zinc-400 text-center mb-2'>Your Location:</Text>
                        <Text className='text-white text-center font-semibold'>{locationDetails.address}</Text>
                        <Text className='text-zinc-400 text-center'>{locationDetails.city}, {locationDetails.state}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className='bg-zinc-800 px-6 py-3 rounded-full flex-row items-center gap-2'
                    >
                        <Ionicons name="arrow-back" size={20} color="#FFD700" />
                        <Text className='text-white font-semibold'>Continue</Text>
                    </TouchableOpacity>
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