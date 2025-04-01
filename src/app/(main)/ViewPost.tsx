import { View, Text, TouchableOpacity, ScrollView, Image, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, useLocalSearchParams } from 'expo-router'
import MapView, { Marker } from 'react-native-maps'

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
    owner: {
        name: string;
        phone: string;
        whatsapp: string;
        profileImage: string | null;
    };
}

const ViewPost = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [post, setPost] = useState<PostData | null>(null);

    useEffect(() => {
        // TODO: Fetch post data using params.id
        // For now using dummy data
        setPost({
            id: params.id as string,
            title: "Sample Tiffin Service",
            description: "Delicious homemade food delivered to your doorstep. We serve fresh, hygienic, and tasty food made with love.",
            price: "₹200",
            foodTypes: ["Veg", "Non-Veg"],
            images: [],
            address: "123 Main Street, City",
            latitude: 19.0760,
            longitude: 72.8777,
            availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            mealTypes: ["Lunch", "Dinner"],
            specialOffers: ["10% off on monthly subscription", "Free delivery on first order"],
            owner: {
                name: "John Doe",
                phone: "+91 1234567890",
                whatsapp: "+91 1234567890",
                profileImage: null
            }
        });
    }, [params.id]);

    const handleCall = () => {
        if (post?.owner.phone) {
            Linking.openURL(`tel:${post.owner.phone}`);
        }
    };

    const handleWhatsApp = () => {
        if (post?.owner.whatsapp) {
            Linking.openURL(`https://wa.me/${post.owner.whatsapp}`);
        }
    };

    const handleOpenMaps = () => {
        if (post?.latitude && post?.longitude) {
            Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${post.latitude},${post.longitude}`);
        }
    };

    if (!post) {
        return (
            <View className="flex-1 bg-zinc-900 items-center justify-center">
                <Text className="text-white text-lg">Loading...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-zinc-900">
            <View className="flex-row items-center p-4 border-b border-zinc-800">
                <TouchableOpacity 
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-zinc-800 items-center justify-center mr-3"
                >
                    <Ionicons name="arrow-back" size={24} color="#FFD700" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-semibold">Post Details</Text>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Images */}
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    className="h-64"
                >
                    {post.images.length > 0 ? (
                        post.images.map((uri, index) => (
                            <Image 
                                key={index}
                                source={{ uri }}
                                className="w-full h-full"
                            />
                        ))
                    ) : (
                        <View className="w-full h-full bg-zinc-800 items-center justify-center">
                            <Ionicons name="image-outline" size={48} color="#FFD700" />
                        </View>
                    )}
                </ScrollView>

                <View className="p-4 space-y-4">
                    {/* Title and Price */}
                    <View className="flex-row justify-between items-center">
                        <Text className="text-white text-2xl font-bold">{post.title}</Text>
                        <Text className="text-[#FFD700] text-xl font-semibold">{post.price}</Text>
                    </View>

                    {/* Description */}
                    <Text className="text-zinc-400 text-lg">{post.description}</Text>

                    {/* Food Types */}
                    <View>
                        <Text className="text-white text-lg font-semibold mb-2">Food Types</Text>
                        <View className="flex-row flex-wrap gap-2">
                            {post.foodTypes.map((type) => (
                                <View 
                                    key={type}
                                    className="px-4 py-2 rounded-lg bg-zinc-800"
                                >
                                    <Text className="text-white">{type}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Available Days */}
                    <View>
                        <Text className="text-white text-lg font-semibold mb-2">Available Days</Text>
                        <View className="flex-row flex-wrap gap-2">
                            {post.availableDays.map((day) => (
                                <View 
                                    key={day}
                                    className="px-4 py-2 rounded-lg bg-zinc-800"
                                >
                                    <Text className="text-white">{day}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Meal Types */}
                    <View>
                        <Text className="text-white text-lg font-semibold mb-2">Meal Types</Text>
                        <View className="flex-row flex-wrap gap-2">
                            {post.mealTypes.map((type) => (
                                <View 
                                    key={type}
                                    className="px-4 py-2 rounded-lg bg-zinc-800"
                                >
                                    <Text className="text-white">{type}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Special Offers */}
                    {post.specialOffers.length > 0 && (
                        <View>
                            <Text className="text-white text-lg font-semibold mb-2">Special Offers</Text>
                            <View className="space-y-2">
                                {post.specialOffers.map((offer, index) => (
                                    <View 
                                        key={index}
                                        className="bg-zinc-800 rounded-lg p-3"
                                    >
                                        <Text className="text-[#FFD700]">{offer}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Location */}
                    <View>
                        <Text className="text-white text-lg font-semibold mb-2">Location</Text>
                        <TouchableOpacity 
                            onPress={handleOpenMaps}
                            className="bg-zinc-800 rounded-lg p-3"
                        >
                            <Text className="text-white">{post.address}</Text>
                        </TouchableOpacity>
                        <View className="h-48 mt-2 rounded-lg overflow-hidden">
                            <MapView
                                style={{ flex: 1 }}
                                initialRegion={{
                                    latitude: post.latitude || 19.0760,
                                    longitude: post.longitude || 72.8777,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421
                                }}
                                scrollEnabled={false}
                                zoomEnabled={false}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: post.latitude || 19.0760,
                                        longitude: post.longitude || 72.8777
                                    }}
                                    title={post.title}
                                    description={post.address}
                                />
                            </MapView>
                        </View>
                    </View>

                    {/* Owner Info */}
                    <View className="bg-zinc-800 rounded-xl p-4">
                        <Text className="text-white text-lg font-semibold mb-4">Contact Information</Text>
                        <View className="flex-row items-center mb-4">
                            <View className="w-16 h-16 rounded-full bg-zinc-700 items-center justify-center mr-4">
                                {post.owner.profileImage ? (
                                    <Image 
                                        source={{ uri: post.owner.profileImage }}
                                        className="w-full h-full rounded-full"
                                    />
                                ) : (
                                    <Ionicons name="person-outline" size={32} color="#FFD700" />
                                )}
                            </View>
                            <View>
                                <Text className="text-white text-xl font-semibold">{post.owner.name}</Text>
                                <Text className="text-zinc-400">{post.owner.phone}</Text>
                            </View>
                        </View>
                        <View className="flex-row gap-2">
                            <TouchableOpacity 
                                onPress={handleCall}
                                className="flex-1 bg-[#FFD700] rounded-lg p-3 flex-row items-center justify-center"
                            >
                                <Ionicons name="call-outline" size={20} color="black" />
                                <Text className="text-black font-semibold ml-2">Call</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={handleWhatsApp}
                                className="flex-1 bg-[#25D366] rounded-lg p-3 flex-row items-center justify-center"
                            >
                                <Ionicons name="logo-whatsapp" size={20} color="white" />
                                <Text className="text-white font-semibold ml-2">WhatsApp</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ViewPost 