import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import { PostData } from '@/src/components/interface/AllInterface'
import useCreateProductApi from '@/src/hooks/product-api/useCreateProductApi'

const NewPost = () => {
    const router = useRouter();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState<PostData>({
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
        menuItems: []
    });

    const foodTypeOptions = ["Veg", "Non-Veg", "Vegan"];
    const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const mealTypeOptions = ["Breakfast", "Lunch", "Dinner", "All Day"];

    const validateField = (key: keyof PostData, value: any): string => {
        switch (key) {
            case 'title':
                if (!value.trim()) return 'Title is required';
                if (value.length < 5) return 'Title must be at least 5 characters';
                return '';
            case 'description':
                if (!value.trim()) return 'Description is required';
                if (value.length < 20) return 'Description must be at least 20 characters';
                return '';
            case 'price':
                if (!value.trim()) return 'Price is required';
                if (isNaN(Number(value))) return 'Price must be a valid number';
                if (Number(value) <= 0) return 'Price must be greater than 0';
                return '';
            case 'foodTypes':
                if (value.length === 0) return 'At least one food type is required';
                return '';
            case 'images':
                if (value.length === 0) return 'At least one image is required';
                return '';
            case 'address':
                if (!value.trim()) return 'Address is required';
                return '';
            case 'availableDays':
                if (value.length === 0) return 'At least one day must be selected';
                return '';
            case 'mealTypes':
                if (value.length === 0) return 'At least one meal type is required';
                return '';
            case 'menuItems':
                if (value.length === 0) return 'At least one menu item is required';
                for (const item of value) {
                    if (!item.title.trim()) return 'Menu item title is required';
                    if (!item.description.trim()) return 'Menu item description is required';
                }
                return '';
            default:
                return '';
        }
    };

    const handleChange = (key: keyof PostData, value: any) => {
        setPost(prev => ({
            ...prev,
            [key]: value
        }));

        const error = validateField(key, value);
        setErrors(prev => ({
            ...prev,
            [key]: error
        }));
    };

    const pickImage = async () => {
        try {
            setIsLoading(true);
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'Please allow access to your photo library to add images.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'Open Settings',
                            onPress: () => {
                                // Add logic to open app settings
                            }
                        }
                    ]
                );
                return;
            }

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
                setErrors(prev => ({
                    ...prev,
                    images: ''
                }));
            }
        } catch (error) {
            Alert.alert(
                'Error',
                'Failed to pick image. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setIsLoading(false);
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

    const pickMenuImage = async () => {
        try {
            setIsLoading(true);
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'Please allow access to your photo library to add menu images.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'Open Settings',
                            onPress: () => {
                                // Add logic to open app settings
                            }
                        }
                    ]
                );
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setPost(prev => ({
                    ...prev,
                    menuItems: [...prev.menuItems, {
                        title: "",
                        image: result.assets[0].uri,
                        description: ""
                    }]
                }));
                setErrors(prev => ({
                    ...prev,
                    menuItems: ''
                }));
            }
        } catch (error) {
            Alert.alert(
                'Error',
                'Failed to pick menu image. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setIsLoading(false);
        }
    };

    const removeMenuItem = (index: number) => {
        setPost(prev => ({
            ...prev,
            menuItems: prev.menuItems.filter((_, i) => i !== index)
        }));

        // Validate menu items after removal
        const updatedMenuItems = post.menuItems.filter((_, i) => i !== index);
        const error = validateField('menuItems', updatedMenuItems);
        setErrors(prev => ({
            ...prev,
            menuItems: error
        }));
    };

    const updateMenuItem = (index: number, field: 'title' | 'description', value: string) => {
        setPost(prev => ({
            ...prev,
            menuItems: prev.menuItems.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));

        // Validate menu items after update
        const updatedMenuItems = post.menuItems.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        const error = validateField('menuItems', updatedMenuItems);
        setErrors(prev => ({
            ...prev,
            menuItems: error
        }));
    };

    // use hooks
    const { uploadProduct } = useCreateProductApi()

    const handleSubmit = () => {
        // Validate all fields
        const newErrors: Record<string, string> = {};
        let hasErrors = false;

        Object.keys(post).forEach((key) => {
            const error = validateField(key as keyof PostData, post[key as keyof PostData]);
            if (error) {
                newErrors[key] = error;
                hasErrors = true;
            }
        });

        setErrors(newErrors);

        if (hasErrors) {
            Alert.alert(
                'Validation Error',
                'Please fix the following errors:\n\n' +
                Object.values(newErrors).filter(Boolean).join('\n'),
                [{ text: 'OK' }]
            );
            return;
        }

        // If no errors, proceed with submission
        setIsLoading(true);
        // Add your submission logic here
        uploadProduct(post)
        setIsLoading(false);
    };

    const ErrorMessage = ({ message }: { message: string }) => (
        <View className="flex-row items-center mt-1">
            <Ionicons name="alert-circle" size={16} color="#ef4444" />
            <Text className="text-red-500 ml-1 text-sm">{message}</Text>
        </View>
    );

    return (
        <View className="flex-1 bg-zinc-900">
            <View className="flex-row items-center p-4 border-b border-zinc-800">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-zinc-800 items-center justify-center mr-3"
                >
                    <Ionicons name="arrow-back" size={24} color="#FFD700" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-semibold">Create New Post</Text>
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
                            className={`text-white bg-zinc-700 rounded-lg p-3 ${errors.title ? 'border-red-500 border' : ''}`}
                        />
                        {errors.title && <ErrorMessage message={errors.title} />}
                    </View>

                    {/* Description */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Description</Text>
                        <TextInput
                            value={post.description}
                            onChangeText={(value) => handleChange('description', value)}
                            placeholder="Describe your tiffin service"
                            placeholderTextColor="#71717a"
                            className={`text-white bg-zinc-700 rounded-lg p-3 ${errors.description ? 'border-red-500 border' : ''}`}
                            multiline
                            numberOfLines={4}
                        />
                        {errors.description && <ErrorMessage message={errors.description} />}
                    </View>

                    {/* Price */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Price</Text>
                        <TextInput
                            value={post.price}
                            onChangeText={(value) => handleChange('price', value)}
                            placeholder="Enter price"
                            placeholderTextColor="#71717a"
                            className={`text-white bg-zinc-700 rounded-lg p-3 ${errors.price ? 'border-red-500 border' : ''}`}
                            keyboardType="numeric"
                        />
                        {errors.price && <ErrorMessage message={errors.price} />}
                    </View>

                    {/* Food Types */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Food Types</Text>
                        <View className="flex-row flex-wrap gap-2">
                            {foodTypeOptions.map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    onPress={() => toggleArrayItem('foodTypes', type)}
                                    className={`px-4 py-2 rounded-lg ${post.foodTypes.includes(type) ? 'bg-[#FFD700]' : 'bg-zinc-700'}`}
                                >
                                    <Text className={post.foodTypes.includes(type) ? 'text-black font-semibold' : 'text-white'}>
                                        {type}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {errors.foodTypes && <ErrorMessage message={errors.foodTypes} />}
                    </View>

                    {/* Enhanced Images Section */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Cover Images</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
                            {post.images.map((uri, index) => (
                                <View key={index} className="relative mr-2">
                                    <Image source={{ uri }} className="w-32 h-32 rounded-lg" />
                                    <TouchableOpacity
                                        onPress={() => {
                                            setPost(prev => ({
                                                ...prev,
                                                images: prev.images.filter((_, i) => i !== index)
                                            }));
                                            if (post.images.length === 1) {
                                                setErrors(prev => ({
                                                    ...prev,
                                                    images: 'At least one image is required'
                                                }));
                                            }
                                        }}
                                        className="absolute top-0 right-0 w-6 h-6 rounded-full bg-red-500 items-center justify-center"
                                    >
                                        <Ionicons name="close" size={16} color="white" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <TouchableOpacity
                                onPress={pickImage}
                                disabled={isLoading}
                                className="w-32 h-32 rounded-lg bg-zinc-700 items-center justify-center"
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#FFD700" />
                                ) : (
                                    <Ionicons name="add" size={32} color="#FFD700" />
                                )}
                            </TouchableOpacity>
                        </ScrollView>
                        {errors.images && <ErrorMessage message={errors.images} />}
                    </View>

                    {/* Menu Section */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Menu Items</Text>
                        <View className="flex gap-2">
                            {post.menuItems.map((item, index) => (
                                <View key={index} className="bg-zinc-700 rounded-lg p-3">
                                    <View className="flex-row items-start">
                                        <Image
                                            source={{ uri: item.image }}
                                            className="w-24 h-24 rounded-lg"
                                        />
                                        <View className="flex-1 ml-3">
                                            <TextInput
                                                value={item.title}
                                                onChangeText={(value) => updateMenuItem(index, 'title', value)}
                                                placeholder="Item name"
                                                placeholderTextColor="#71717a"
                                                className={`text-white text-lg font-semibold mb-2 ${!item.title.trim() ? 'border-red-500 border' : ''}`}
                                            />
                                            <TextInput
                                                value={item.description}
                                                onChangeText={(value) => updateMenuItem(index, 'description', value)}
                                                placeholder="Item description"
                                                placeholderTextColor="#71717a"
                                                className={`text-zinc-400 ${!item.description.trim() ? 'border-red-500 border' : ''}`}
                                                multiline
                                                numberOfLines={2}
                                            />
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => removeMenuItem(index)}
                                            className="w-6 h-6 rounded-full bg-red-500 items-center justify-center ml-2"
                                        >
                                            <Ionicons name="close" size={16} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                            <TouchableOpacity
                                onPress={pickMenuImage}
                                disabled={isLoading}
                                className="flex-row items-center justify-center bg-zinc-700 rounded-lg p-3"
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#FFD700" />
                                ) : (
                                    <>
                                        <Ionicons name="add" size={24} color="#FFD700" />
                                        <Text className="text-white ml-2">Add Menu Item</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                        {errors.menuItems && <ErrorMessage message={errors.menuItems} />}
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
                                    className={`px-4 py-2 rounded-lg ${post.availableDays.includes(day) ? 'bg-[#FFD700]' : 'bg-zinc-700'}`}
                                >
                                    <Text className={post.availableDays.includes(day) ? 'text-black font-semibold' : 'text-white'}>
                                        {day}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {errors.availableDays && <ErrorMessage message={errors.availableDays} />}
                    </View>

                    {/* Meal Types */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Meal Types</Text>
                        <View className="flex-row flex-wrap gap-2">
                            {mealTypeOptions.map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    onPress={() => toggleArrayItem('mealTypes', type)}
                                    className={`px-4 py-2 rounded-lg ${post.mealTypes.includes(type) ? 'bg-[#FFD700]' : 'bg-zinc-700'}`}
                                >
                                    <Text className={post.mealTypes.includes(type) ? 'text-black font-semibold' : 'text-white'}>
                                        {type}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {errors.mealTypes && <ErrorMessage message={errors.mealTypes} />}
                    </View>

                </View>

                <TouchableOpacity
                    className="bg-[#FFD700] rounded-xl p-4 mt-6 mb-6"
                    onPress={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#000000" />
                    ) : (
                        <Text className="text-black text-lg font-semibold text-center">Create Post</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default NewPost 