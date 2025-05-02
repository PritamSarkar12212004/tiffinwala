import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, Alert, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal';

import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import { userContext } from '@/src/utils/context/ContextApi'
import LottiAnimation from '@/src/components/layout/LottiAnimation'
import LottiConstant from '@/src/constants/lotti/LottiConstant'
import useUpdatePorductApi from '@/src/hooks/product-api/useUpdatePorductApi';
import { PostData2, } from '@/src/components/interface/AllInterface';
const EditPost = () => {
    const { editTempInformation, seteditTempInformation } = userContext()

    const [uploadingProduct, setUploadingProduct] = useState<boolean>(false)
    const [uploadDoneModal, setUploadDoneModal] = useState(false);


    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isLocationLoading, setIsLocationLoading] = useState(false);
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

    const [post, setPost] = useState<PostData2>({
        productId: "",
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

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        setPost({
            productId: editTempInformation._id as string,
            title: editTempInformation.postTitle,
            description: editTempInformation.postDescription,
            price: String(editTempInformation.postPrice), // Convert to string
            foodTypes: editTempInformation.postFoodType,
            images: [],
            address: editTempInformation.postLocation,
            latitude: editTempInformation.postlatitude,
            longitude: editTempInformation.postlongitude,
            availableDays: editTempInformation.postValidDay,
            mealTypes: editTempInformation.postMealTypes,
            menuItems: []
        });
        return () => {
            seteditTempInformation("");
        };
    }, []);

    const foodTypeOptions = ["Veg", "Non-Veg", "Vegan"];
    const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const mealTypeOptions = ["Breakfast", "Lunch", "Dinner", "All Day"];



    const validateField = (key: keyof PostData2, value: any): string => {
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

    const handleChange = (key: keyof PostData2, value: any) => {
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

    const ErrorMessage = ({ message }: { message: string }) => (
        <View className="flex-row items-center mt-1">
            <Ionicons name="alert-circle" size={16} color="#ef4444" />
            <Text className="text-red-500 ml-1 text-sm">{message}</Text>
        </View>
    );

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
            setIsLocationLoading(true);
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Please allow location access to use this feature.');
                setIsLocationLoading(false);
                return;
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High
            });

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
                setPost(prev => ({
                    ...prev,
                    address: formattedAddress
                }));
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to get location. Please try again.');
        } finally {
            setIsLocationLoading(false);
        }
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

    const toggleArrayItem = (key: keyof PostData2, item: string) => {
        setPost(prev => {
            const currentArray = prev[key] as string[];
            if (Array.isArray(currentArray)) {
                const newArray = currentArray.includes(item)
                    ? currentArray.filter(i => i !== item)
                    : [...currentArray, item];
                return { ...prev, [key]: newArray };
            }
            return prev;
        });
    };

    const { updateProduct } = useUpdatePorductApi()

    const handleSubmit = () => {
        // Validate all fields
        const newErrors: Record<string, string> = {};
        let hasErrors = false;

        Object.keys(post).forEach((key) => {
            const error = validateField(key as keyof PostData2, post[key as keyof PostData2]);
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

        setUploadingProduct(true);
        updateProduct(post, setUploadingProduct, setUploadDoneModal);
    };

    const removeMenuItem = (index: number) => {
        setPost(prev => ({
            ...prev,
            menuItems: prev.menuItems.filter((_, i) => i !== index)
        }));

        // Validate menu items after removal
        const updatedMenuItems = post.menuItems.filter((_, i) => i !== index);

    };
    const updateMenuItem = (index: number, field: 'title' | 'description', value: string) => {
        setPost(prev => ({
            ...prev,
            menuItems: prev.menuItems.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));



    };


    return (
        <View className="flex-1 bg-zinc-900 flex">
            <Modal
                isVisible={uploadingProduct}
                backdropOpacity={0.8}
                animationIn="fadeIn"
                animationOut="fadeOut"
                useNativeDriver
            >
                <View className="flex-1 items-center justify-center">
                    <View className="bg-zinc-800 rounded-2xl p-8 w-4/5 items-center">
                        <View className="w-24 flex items-center justify-center  ">
                            <LottiAnimation width={150} height={150} bg={"transparent"} path={uploadDoneModal ? LottiConstant.productUploadDone : LottiConstant.productUpload} />
                        </View>

                        <Text className="text-white text-xl font-bold mb-4 text-center">Uploading Your Tiffin Service</Text>



                        <Text className="text-zinc-400 text-center">
                            Please wait while we upload your tiffin service details. This may take a moment.
                        </Text>
                    </View>
                </View>
            </Modal>
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
                            className={`text-white bg-zinc-700 rounded-lg p-3 ${errors.title ? 'border border-red-500' : ''}`}
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
                            className={`text-white bg-zinc-700 rounded-lg p-3 ${errors.description ? 'border border-red-500' : ''}`}
                            multiline
                            numberOfLines={4}
                        />
                        {errors.description && <ErrorMessage message={errors.description} />}
                    </View>

                    {/* Price */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Price</Text>
                        <TextInput
                            value={String(post.price)}
                            onChangeText={(value) => handleChange('price', value)}
                            placeholder="Enter price"
                            placeholderTextColor="#71717a"
                            className={`text-white bg-zinc-700 rounded-lg p-3 ${errors.price ? 'border border-red-500' : ''}`}
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

                    {/* Images */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-2">Images</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
                            {post.images.map((uri, index) => (
                                <View key={index} className="relative">
                                    <Image source={{ uri }} className="w-24 h-24 rounded-lg" />
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
                                className="w-24 h-24 rounded-lg bg-zinc-700 items-center justify-center"
                            >
                                <Ionicons name="add" size={32} color="#FFD700" />
                            </TouchableOpacity>
                        </ScrollView>
                        {errors.images && <ErrorMessage message={errors.images} />}
                    </View>
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-3 font-semibold">Menu Items</Text>
                        <Text className="text-zinc-400 mb-3">Add your delicious menu items with images</Text>
                        <View className="flex gap-4">
                            {post.menuItems.map((item, index) => (
                                <View key={index} className="bg-zinc-700 rounded-lg p-4 border border-zinc-600">
                                    <View className="flex-row items-start">
                                        <Image
                                            source={{ uri: item.image }}
                                            className="w-32 h-32 rounded-lg"
                                            resizeMode="cover"
                                        />
                                        <View className="flex-1 ml-4">
                                            <TextInput
                                                value={item.title}
                                                onChangeText={(value) => updateMenuItem(index, 'title', value)}
                                                placeholder="Item name"
                                                placeholderTextColor="#71717a"
                                                className={`text-white text-xl font-semibold mb-3 p-2 ${!item.title.trim() ? 'border-2 border-red-500 rounded-md' : ''}`}
                                            />
                                            <TextInput
                                                value={item.description}
                                                onChangeText={(value) => updateMenuItem(index, 'description', value)}
                                                placeholder="Item description"
                                                placeholderTextColor="#71717a"
                                                className={`text-zinc-300 text-base p-2 ${!item.description.trim() ? 'border-2 border-red-500 rounded-md' : ''}`}
                                                multiline
                                                numberOfLines={3}
                                            />
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => removeMenuItem(index)}
                                            className="w-8 h-8 rounded-full bg-red-500 items-center justify-center ml-2"
                                            activeOpacity={0.8}
                                        >
                                            <Ionicons name="close" size={18} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={pickMenuImage}
                                disabled={isLoading}
                                className="flex-row items-center justify-center bg-zinc-700 rounded-lg p-4"
                            >
                                <Ionicons name="add-circle" size={30} color="#FFD700" />
                                <Text className="text-white ml-2 text-lg font-medium">Add Menu Item</Text>
                            </TouchableOpacity>
                        </View>
                        {errors.menuItems && <ErrorMessage message={errors.menuItems} />}
                    </View>

                    {/* Location */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg mb-3 font-semibold">Location</Text>
                        <Text className="text-zinc-400 mb-3">Add your delivery location</Text>

                        <Text className={`text-white bg-zinc-700 rounded-lg p-3 mb-3 ${errors.address ? 'border-2 border-red-500' : ''}`}

                        >
                            {post.address}
                        </Text>

                        {errors.address && <ErrorMessage message={errors.address} />}
                        {locationDetails && (
                            <View className="bg-zinc-700 rounded-lg p-3 mb-3">
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
                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={getCurrentLocation}
                                className="flex-1 bg-zinc-700 py-3 rounded-lg flex-row items-center justify-center"
                                disabled={isLocationLoading}
                                activeOpacity={0.8}
                            >
                                {isLocationLoading ? (
                                    <ActivityIndicator color="#FFD700" />
                                ) : (
                                    <>
                                        <Ionicons name="navigate-outline" size={22} color="#FFD700" />
                                        <Text className="text-white ml-2 font-medium">Current Location</Text>
                                    </>
                                )}
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
                    className="bg-[#FFD700] rounded-xl h-14    p-4 mt-6 mb-10"
                    onPress={() => handleSubmit()}
                    activeOpacity={0.8}
                >
                    {uploadingProduct ? (
                        <ActivityIndicator color="#000000" />
                    ) : (
                        <Text className="text-black text-lg font-semibold text-center">Update Post</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default EditPost 