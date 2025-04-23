import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, useLocalSearchParams } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'

interface PostData {
    id: string;
    title: string;
    description: string;
    price: string;
    foodTypes: string[];
    images: string[];
    address: string;
    latitude: number | null;
    longitude: number | null;
    availableDays: string[];
    mealTypes: string[];
    specialOffers: string[];
}

const EditPost = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [post, setPost] = useState<PostData>({
        id: "",
        title: "",
        description: "",
        price: "",
        foodTypes: [],
        images: [],
        address: "",
        latitude: null,
        longitude: null,
        availableDays: [],
        mealTypes: [],
        specialOffers: []
    });

    useEffect(() => {
        // TODO: Fetch post data using params.id
        // For now using dummy data
        setPost({
            id: params.id as string,
            title: "Sample Tiffin Service",
            description: "Delicious homemade food delivered to your doorstep",
            price: "₹200",
            foodTypes: ["Veg", "Non-Veg"],
            images: [],
            address: "123 Main Street, City",
            latitude: 19.0760,
            longitude: 72.8777,
            availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            mealTypes: ["Lunch", "Dinner"],
            specialOffers: ["10% off on monthly subscription", "Free delivery on first order"]
        });
    }, [params.id]);

    const foodTypeOptions = ["Veg", "Non-Veg", "Vegan"];
    const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const mealTypeOptions = ["Breakfast", "Lunch", "Dinner", "All Day"];

    const handleChange = (key: keyof PostData, value: any) => {
        setPost(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setPost(prev => ({
                ...prev,
                images: [...prev.images, result.assets[0].uri]
            }));
        }
    };

    const getCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Please allow location access to use this feature.');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setPost(prev => ({
                ...prev,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }));

            const [address] = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });

            if (address) {
                const formattedAddress = `${address.street || ''} ${address.city || ''} ${address.region || ''} ${address.country || ''}`;
                setPost(prev => ({
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
                    setPost(prev => ({
                        ...prev,
                        latitude: location.latitude,
                        longitude: location.longitude,
                        address: location.address
                    }));
                })
            }
        });
    };

    const toggleArrayItem = (key: keyof PostData, item: string) => {
        setPost(prev => ({
            ...prev,
            [key]: prev[key].includes(item)
                ? prev[key].filter(i => i !== item)
                : [...prev[key], item]
        }));
    };

    const handleSubmit = () => {
        // TODO: Implement post update
        router.back();
    };

    return (
        <View className="flex-1 bg-zinc-900 flex">
            <View className="flex-row items-center p-4 border-b border-zinc-800">
                <TouchableOpacity 
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-zinc-800 items-center justify-center mr-3"
                >
                    <Ionicons name="arrow-back" size={24} color="#FFD700" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-semibold">Edit Post</Text>
            </View>

            <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
                <View className="flex gap-3">
                    {/* Title */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Title</Text>
                        <TextInput
                            value={post.title}
                            onChangeText={(value) => handleChange('title', value)}
                            placeholder="Enter post title"
                            placeholderTextColor="#71717a"
                            className="text-white bg-zinc-700 rounded-lg p-3"
                        />
                    </View>

                    {/* Description */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Description</Text>
                        <TextInput
                            value={post.description}
                            onChangeText={(value) => handleChange('description', value)}
                            placeholder="Describe your tiffin service"
                            placeholderTextColor="#71717a"
                            className="text-white bg-zinc-700 rounded-lg p-3"
                            multiline
                            numberOfLines={4}
                        />
                    </View>

                    {/* Price */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Price</Text>
                        <TextInput
                            value={post.price}
                            onChangeText={(value) => handleChange('price', value)}
                            placeholder="Enter price"
                            placeholderTextColor="#71717a"
                            className="text-white bg-zinc-700 rounded-lg p-3"
                            keyboardType="numeric"
                        />
                    </View>

                    {/* Food Types */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Food Types</Text>
                        <View className="flex-row flex-wrap gap-2">
                            {foodTypeOptions.map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    onPress={() => toggleArrayItem('foodTypes', type)}
                                    className={`px-4 py-2 rounded-lg ${
                                        post.foodTypes.includes(type) ? 'bg-[#FFD700]' : 'bg-zinc-700'
                                    }`}
                                >
                                    <Text className={post.foodTypes.includes(type) ? 'text-black font-semibold' : 'text-white'}>
                                        {type}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Images */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Images</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
                            {post.images.map((uri, index) => (
                                <View key={index} className="relative">
                                    <Image source={{ uri }} className="w-24 h-24 rounded-lg" />
                                    <TouchableOpacity
                                        onPress={() => setPost(prev => ({
                                            ...prev,
                                            images: prev.images.filter((_, i) => i !== index)
                                        }))}
                                        className="absolute top-0 right-0 w-6 h-6 rounded-full bg-red-500 items-center justify-center"
                                    >
                                        <Ionicons name="close" size={16} color="white" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <TouchableOpacity
                                onPress={pickImage}
                                className="w-24 h-24 rounded-lg bg-zinc-700 items-center justify-center"
                            >
                                <Ionicons name="add" size={32} color="#FFD700" />
                            </TouchableOpacity>
                        </ScrollView>
                    </View>

                    {/* Location */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Location</Text>
                        <TextInput
                            value={post.address}
                            onChangeText={(value) => handleChange('address', value)}
                            placeholder="Enter your address"
                            placeholderTextColor="#71717a"
                            className="text-white bg-zinc-700 rounded-lg p-3 mb-2"
                            multiline
                        />
                        <View className="flex-row gap-2">
                            <TouchableOpacity
                                onPress={getCurrentLocation}
                                className="flex-1 bg-zinc-700 py-2 rounded-lg flex-row items-center justify-center"
                            >
                                <Ionicons name="navigate-outline" size={20} color="#FFD700" />
                                <Text className="text-white ml-2">Current Location</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={pickLocationFromMap}
                                className="flex-1 bg-zinc-700 py-2 rounded-lg flex-row items-center justify-center"
                            >
                                <Ionicons name="map-outline" size={20} color="#FFD700" />
                                <Text className="text-white ml-2">Pick from Map</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Available Days */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Available Days</Text>
                        <View className="flex-row flex-wrap gap-2">
                            {dayOptions.map((day) => (
                                <TouchableOpacity
                                    key={day}
                                    onPress={() => toggleArrayItem('availableDays', day)}
                                    className={`px-4 py-2 rounded-lg ${
                                        post.availableDays.includes(day) ? 'bg-[#FFD700]' : 'bg-zinc-700'
                                    }`}
                                >
                                    <Text className={post.availableDays.includes(day) ? 'text-black font-semibold' : 'text-white'}>
                                        {day}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Meal Types */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Meal Types</Text>
                        <View className="flex-row flex-wrap gap-2">
                            {mealTypeOptions.map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    onPress={() => toggleArrayItem('mealTypes', type)}
                                    className={`px-4 py-2 rounded-lg ${
                                        post.mealTypes.includes(type) ? 'bg-[#FFD700]' : 'bg-zinc-700'
                                    }`}
                                >
                                    <Text className={post.mealTypes.includes(type) ? 'text-black font-semibold' : 'text-white'}>
                                        {type}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Special Offers */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Special Offers</Text>
                        <TextInput
                            value={post.specialOffers.join('\n')}
                            onChangeText={(value) => handleChange('specialOffers', value.split('\n'))}
                            placeholder="Enter special offers (one per line)"
                            placeholderTextColor="#71717a"
                            className="text-white bg-zinc-700 rounded-lg p-3"
                            multiline
                            numberOfLines={4}
                        />
                    </View>
                </View>

                <TouchableOpacity 
                    className="bg-[#FFD700] rounded-xl p-4 mt-6 mb-6"
                    onPress={handleSubmit}
                >
                    <Text className="text-black text-lg font-semibold text-center">Update Post</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default EditPost 