import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

interface LocationData {
    latitude: number;
    longitude: number;
    address: string;
}

const LocationPicker = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState({
        latitude: 19.0760,
        longitude: 72.8777,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });
    const [address, setAddress] = useState('');

    const handleLocationSelect = async (e: any) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setSelectedLocation(prev => ({
            ...prev,
            latitude,
            longitude
        }));

        try {
            const [result] = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });

            if (result) {
                const formattedAddress = `${result.street || ''} ${result.city || ''} ${result.region || ''} ${result.country || ''}`;
                setAddress(formattedAddress);
            }
        } catch (error) {
            console.error('Error getting address:', error);
        }
    };

    const handleConfirm = () => {
        if (params.onSelect) {
            try {
                const onSelectCallback = JSON.parse(params.onSelect as string);
                const locationData: LocationData = {
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                    address
                };
                onSelectCallback(locationData);
            } catch (error) {
                console.error('Error executing callback:', error);
            }
        }
        router.back();
    };

    return (
        <View className="flex-1 bg-zinc-900">
            <View className="flex-row items-center p-4 border-b border-zinc-800">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-zinc-800 items-center justify-center mr-3"
                >
                    <Ionicons name="arrow-back" size={24} color="#FFD700" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-semibold">Pick Location</Text>
            </View>
            <View className="flex-1">
                <MapView
                    style={StyleSheet.absoluteFill}
                    initialRegion={selectedLocation}
                    onPress={handleLocationSelect}
                >
                    <Marker
                        coordinate={{
                            latitude: selectedLocation.latitude,
                            longitude: selectedLocation.longitude
                        }}
                        title="Selected Location"
                        description={address}
                    />
                </MapView>
            </View>

            <View className="p-4 bg-zinc-900 border-t border-zinc-800">
                <View className="bg-zinc-800 rounded-xl p-4 mb-4">
                    <Text className="text-zinc-400 text-sm mb-1">Selected Address</Text>
                    <Text className="text-white text-lg">{address || 'No address selected'}</Text>
                </View>

                <TouchableOpacity
                    className="bg-[#FFD700] rounded-xl p-4"
                    onPress={handleConfirm}
                >
                    <Text className="text-black text-lg font-semibold text-center">Confirm Location</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LocationPicker 