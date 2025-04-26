import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import SettingsPageLayout from '@/src/components/layout/SettingsPageLayout';
import { useRouter } from 'expo-router';
import { userContext } from '@/src/utils/context/ContextApi';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FlatList } from 'react-native-gesture-handler';
import useDeleteProductApi from '@/src/hooks/product-api/useDeleteProductApi';
import useStatusProductApi from '@/src/hooks/product-api/useStatusProductApi';

interface Post {
    postId: string;
    _id: string;
    postCoverImage: string[];
    postTitle: string;
    postDescription: string;
    productLikes: number;
    postPrice: string;
    postStatus: 'Active' | 'Inactive';
}

const YourPosts = () => {
    const router = useRouter();
    const { seteditTempInformation, product } = userContext();

    const { deleteProduct } = useDeleteProductApi()
    const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(null);

    const handleOptions = (index: number) => {
        setSelectedPostIndex(prev => (prev === index ? null : index));
    };

    const editFunctionPage = (item: Post) => {
        router.push('/(main)/(product)/EditPost');
        seteditTempInformation(item);
    };

    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [statusLoading, setStatusLoading] = useState<boolean>(false);
    const handleDelete = (post: Post) => {
        setDeleteLoading(true);
        deleteProduct(post._id, setDeleteLoading);
    };
    const { updateStatus } = useStatusProductApi()

    const handleDeactivate = (post: Post) => {
        setStatusLoading(true);
        updateStatus(post._id, setStatusLoading, post.postStatus);
    };

    const renderPost = ({ item, index }: { item: Post; index: number }) => (
        <View className="bg-zinc-900 rounded-2xl overflow-hidden mb-6 border border-zinc-700">
            <View className="absolute top-4 right-4 z-10">
                {selectedPostIndex === index ? (
                    <TouchableOpacity 
                        onPress={() => handleOptions(index)}
                        className="w-10 h-10 rounded-full bg-zinc-800 items-center justify-center"
                    >
                        <AntDesign name="close" size={22} color="white" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity 
                        onPress={() => handleOptions(index)}
                        className="w-10 h-10 rounded-full bg-zinc-800 items-center justify-center"
                    >
                        <Entypo name="dots-three-vertical" size={20} color="white" />
                    </TouchableOpacity>
                )}
            </View>

            {selectedPostIndex === index && (
                <View className="absolute top-16 right-4 bg-zinc-800 rounded-xl z-20 border border-zinc-700">
                    <TouchableOpacity 
                        onPress={() => deleteLoading ? null : handleDelete(item)} 
                        className="px-5 py-3 border-b border-zinc-700"
                    >
                        {deleteLoading ? (
                            <ActivityIndicator size={'small'} color={"#FF4444"} />
                        ) : (
                            <Text className="text-red-400 font-semibold">Delete</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => statusLoading ? null : handleDeactivate(item)} 
                        className="px-5 py-3"
                    >
                        {statusLoading ? (
                            <ActivityIndicator size={'small'} color={"#FFD700"} />
                        ) : (
                            <Text className="text-yellow-400 font-semibold">
                                {item.postStatus === 'Active' ? 'Deactivate' : 'Activate'}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            )}

            <View className="w-full h-52 bg-zinc-800 items-center justify-center">
                {item.postCoverImage[0] ? (
                    <Image 
                        source={{ uri: item.postCoverImage[0] }} 
                        className="w-full h-full" 
                        resizeMode="cover"
                    />
                ) : (
                    <Ionicons name="image-outline" size={40} color="#FFD700" />
                )}
            </View>

            <View className="p-5">
                <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1 pr-4">
                        <Text className="text-white text-xl font-bold mb-2">{item.postTitle}</Text>
                        <Text 
                            className="text-zinc-400 text-sm" 
                            numberOfLines={3}
                        >
                            {item.postDescription}
                        </Text>
                    </View>
                    <View
                        className={`px-3 py-1.5 rounded-full ${item.postStatus === 'Active' ? 'bg-green-500/20' : 'bg-red-500/20'}`}
                    >
                        <Text
                            className={`text-xs font-semibold ${item.postStatus === 'Active' ? 'text-green-400' : 'text-red-400'}`}
                        >
                            {item.postStatus === 'Active' ? 'Active' : 'Inactive'}
                        </Text>
                    </View>
                </View>

                <View className="flex-row justify-between items-center mt-4">
                    <View className="flex-row items-center gap-2">
                        <Ionicons name="heart-outline" size={20} color="#FFD700" />
                        <Text className="text-zinc-300 font-medium">{item.productLikes || 0}</Text>
                    </View>
                    <Text className="text-[#FFD700] font-bold text-lg">₹{item.postPrice}</Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => editFunctionPage(item)}
                    className="mt-5 bg-[#FFD700] py-4 rounded-xl flex-row items-center justify-center"
                >
                    <Text className="text-black font-bold text-lg">Edit Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SettingsPageLayout title="Your Posts">
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-zinc-400 text-base">Manage your posts</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => router.push('/(main)/(product)/NewPost')}
                    className="bg-[#FFD700] px-5 py-3 rounded-xl flex-row items-center"
                >
                    <Ionicons name="add-outline" size={24} color="black" />
                    <Text className="text-black font-bold text-lg ml-2">New Post</Text>
                </TouchableOpacity>
            </View>

            <View className="flex gap-4 mb-20">
                <FlatList
                    data={product}
                    renderItem={({ item, index }) => renderPost({ item, index })}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            </View>
        </SettingsPageLayout>
    );
};

export default YourPosts;
