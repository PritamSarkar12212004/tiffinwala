import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ProductReviewPage = () => {
    const router = useRouter();
    const [userRating, setUserRating] = useState(5);
    const [reviewText, setReviewText] = useState("");

    const reviews = [
        {
            id: 1,
            user: "Rahul Kumar",
            rating: 5,
            text: "Best mess in the area! Food quality is excellent. The variety of dishes is amazing and the taste is consistently good.",
            date: "2 days ago",
            likes: 12,
            userImage: "https://i.pinimg.com/736x/91/57/fd/9157fd6020803e195c5497b84efd4021.jpg"
        },
        {
            id: 2,
            user: "Priya Singh",
            rating: 4,
            text: "Good food, reasonable prices. Would recommend! The service is quick and the staff is friendly.",
            date: "1 week ago",
            likes: 8,
            userImage: "https://i.pinimg.com/736x/ef/03/c4/ef03c4278c792ec66718322f5493307e.jpg"
        },
        {
            id: 3,
            user: "Amit Patel",
            rating: 5,
            text: "Amazing food quality and hygiene. The monthly subscription is worth every penny.",
            date: "2 weeks ago",
            likes: 15,
            userImage: "https://i.pinimg.com/736x/9a/05/56/9a055614844bb211669056131f14d2ef.jpg"
        }
    ];

    const submitReview = () => {
        if (reviewText.trim()) {
            // Add review logic here
            setReviewText("");
        }
    };

    return (
        <View className="flex-1 bg-black">
            <SafeAreaView className="flex-1">
                {/* Header */}
                <View className="flex-row items-center p-4 border-b border-zinc-800">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <View className="flex-1 ml-4">
                        <Text className="text-white text-xl font-bold">Reviews</Text>
                        <Text className="text-zinc-400">Sai Mess</Text>
                    </View>
                </View>

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    {/* Restaurant Info */}
                    <View className="p-4 border-b border-zinc-800">
                        <View className="flex-row items-center gap-4">
                            <Image
                                source={{ uri: "https://i.pinimg.com/736x/91/57/fd/9157fd6020803e195c5497b84efd4021.jpg" }}
                                className="w-20 h-20 rounded-xl"
                                resizeMode="cover"
                            />
                            <View className="flex-1">
                                <Text className="text-white text-xl font-bold">Sai Mess</Text>
                                <View className="flex-row items-center gap-2 mt-1">
                                    <Ionicons name="star" size={20} color="#FFD700" />
                                    <Text className="text-white text-lg font-bold">4.5</Text>
                                    <Text className="text-zinc-400">(120 reviews)</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Add Review Section */}
                    <View className="p-4 border-b border-zinc-800">
                        <Text className="text-white text-lg font-semibold mb-4">Add Your Review</Text>
                        <View className="flex-row gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity key={star} onPress={() => setUserRating(star)}>
                                    <Ionicons
                                        name={star <= userRating ? "star" : "star-outline"}
                                        size={28}
                                        color="#FFD700"
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TextInput
                            className="bg-zinc-800 text-white p-4 rounded-xl mb-4"
                            placeholder="Write your review..."
                            placeholderTextColor="#9CA3AF"
                            value={reviewText}
                            onChangeText={setReviewText}
                            multiline
                            numberOfLines={4}
                        />
                        <TouchableOpacity
                            onPress={submitReview}
                            className="bg-[#FFD700] py-4 rounded-xl flex-row items-center justify-center gap-2"
                        >
                            <Ionicons name="send" size={20} color="black" />
                            <Text className="text-black font-semibold text-lg">Post Review</Text>
                        </TouchableOpacity>
                    </View>

                    {/* All Reviews */}
                    <View className="p-4">
                        <Text className="text-white text-lg font-semibold mb-4">All Reviews</Text>
                        {reviews.map((review) => (
                            <View key={review.id} className="bg-zinc-800 p-4 rounded-xl mb-4">
                                <View className="flex-row items-center gap-3 mb-3">
                                    <Image
                                        source={{ uri: review.userImage }}
                                        className="w-10 h-10 rounded-full"
                                        resizeMode="cover"
                                    />
                                    <View className="flex-1">
                                        <Text className="text-white font-semibold">{review.user}</Text>
                                        <Text className="text-zinc-400 text-sm">{review.date}</Text>
                                    </View>
                                </View>
                                <View className="flex-row gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Ionicons
                                            key={star}
                                            name={star <= review.rating ? "star" : "star-outline"}
                                            size={16}
                                            color="#FFD700"
                                        />
                                    ))}
                                </View>
                                <Text className="text-zinc-300 mb-3">{review.text}</Text>
                                <View className="flex-row items-center gap-4">
                                    <TouchableOpacity className="flex-row items-center gap-1">
                                        <Ionicons name="heart-outline" size={20} color="#FF6B6B" />
                                        <Text className="text-zinc-400">{review.likes}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity className="flex-row items-center gap-1">
                                        <Ionicons name="chatbubble-outline" size={20} color="#FFD700" />
                                        <Text className="text-zinc-400">Reply</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default ProductReviewPage