import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import { userContext } from '@/src/utils/context/ContextApi';
import BgColor from '@/src/constants/color/BgColor';

const NAGPUR_COORDINATES = {
    latitude: 21.1458,
    longitude: 79.0882,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
};

const LocationPicker = () => {
    const router = useRouter();
    const { location, setLocation } = userContext();
    const [selectedLocation, setSelectedLocation] = useState(NAGPUR_COORDINATES);
    const [address, setAddress] = useState('');
    const [addressDetails, setAddressDetails] = useState({
        street: '',
        city: '',
        state: '',
        country: '',
        area: '',
        pincode: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    // Initialize with context location if available
    useEffect(() => {
        if (location) {
            setSelectedLocation(prev => ({
                ...prev,
                latitude: location.latitude,
                longitude: location.longitude
            }));
            setAddress(location.address || '');
            setAddressDetails({
                street: '',
                city: location.city || '',
                state: location.state || '',
                country: '',
                area: location.area || '',
                pincode: location.pincode || ''
            });
        }
    }, [location]);

    const getCurrentLocation = async () => {
        setIsLoading(true);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location permission is required to get your current location.');
                return;
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            setSelectedLocation(prev => ({
                ...prev,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }));

            // Get address for current location
            const [result] = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });

            if (result) {
                updateAddressDetails(result);
            }
        } catch (error) {
            console.error('Error getting current location:', error);
            Alert.alert('Error', 'Failed to get current location. Using default location.');
        } finally {
            setIsLoading(false);
        }
    };

    const updateAddressDetails = (result: Location.LocationGeocodedAddress) => {
        setAddressDetails({
            street: result.street || '',
            city: result.city || '',
            state: result.region || '',
            country: result.country || '',
            area: result.district || '',
            pincode: result.postalCode || ''
        });

        const formattedAddress = [
            result.street,
            result.district,
            result.city,
            result.region,
            result.country
        ].filter(Boolean).join(', ');

        setAddress(formattedAddress);
    };

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
                updateAddressDetails(result);
            }
        } catch (error) {
            console.error('Error getting address:', error);
        }
    };

    const handleConfirm = async () => {

        console.log(selectedLocation)
        const { latitude, longitude } = selectedLocation
        const [address] = await Location.reverseGeocodeAsync({
            latitude: latitude,
            longitude: longitude
        });
        if (address) {
            setLocation(address);
            router.back();
        } else {
            Alert.alert('Error', 'Failed to get location. Please try again.');
        }
    };

    return (
        <View className="flex-1" style={{ backgroundColor: BgColor.Primary }}>
            <View className="flex-1">
                <MapView
                    provider={PROVIDER_GOOGLE}
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

                {/* Current Location Button */}
                <TouchableOpacity
                    className="absolute top-4 right-4 bg-zinc-800 p-3 rounded-full"
                    onPress={getCurrentLocation}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color={BgColor.Accent} />
                    ) : (
                        <Ionicons name="locate" size={24} color={BgColor.Accent} />
                    )}
                </TouchableOpacity>
            </View>

            <View className="p-4 bg-zinc-900 border-t border-zinc-800">
                <View className="bg-zinc-800 rounded-xl p-4 mb-4">
                    <Text className="text-zinc-400 text-sm mb-1">Selected Address</Text>
                    <Text className="text-white text-lg mb-2">{address || 'No address selected'}</Text>

                    {addressDetails.city && (
                        <View className="mt-2">
                            <Text className="text-zinc-400 text-sm">City: {addressDetails.city}</Text>
                            <Text className="text-zinc-400 text-sm">State: {addressDetails.state}</Text>
                            <Text className="text-zinc-400 text-sm">Area: {addressDetails.area}</Text>
                            {addressDetails.pincode && (
                                <Text className="text-zinc-400 text-sm">Pincode: {addressDetails.pincode}</Text>
                            )}
                        </View>
                    )}
                </View>

                <TouchableOpacity
                    className="rounded-xl p-4"
                    style={{ backgroundColor: BgColor.Accent }}
                    onPress={handleConfirm}
                >
                    <Text className="text-black text-lg font-semibold text-center">Confirm Location</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LocationPicker 