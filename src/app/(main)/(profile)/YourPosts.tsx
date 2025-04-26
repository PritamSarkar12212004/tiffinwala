import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
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

    /**
     * Renders a post item in the user's posts list with detailed information and interactive options.
     * 
     * @param {Object} params - The parameters for rendering a post.
     * @param {Post} params.item - The post data to be rendered.
     * @param {number} params.index - The index of the post in the list.
     * @returns {JSX.Element} A view component representing a single post with edit, delete, and status options.
     */
    const renderPost = ({ item, index }: { item: Post; index: number }) => (
        <View className="bg-zinc-900 rounded-2xl shadow-md overflow-hidden mb-6 border border-zinc-700 relative">
            {/* Options Button */}
            <View className="absolute top-3 right-3 z-10">
                {selectedPostIndex === index ? (
                    <AntDesign onPress={() => handleOptions(index)} name="close" size={22} color="white" />
                ) : (
                    <Entypo onPress={() => handleOptions(index)} name="dots-three-vertical" size={20} color="white" />
                )}
            </View>

            {/* Dropdown Menu */}
            {selectedPostIndex === index && (
                <View className="absolute top-10 right-3 bg-zinc-800 rounded-lg shadow-md z-20 border border-zinc-700">
                    <TouchableOpacity onPress={() => deleteLoading ? null : handleDelete(item)} className="px-4 py-2 border-b border-zinc-700">
                        {
                            deleteLoading ? <ActivityIndicator size={'small'} color={"red"} /> : <Text className="text-red-400 font-medium">Delete</Text>

                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => statusLoading ? null : handleDeactivate(item)} className="px-4 py-2">
                        {
                            statusLoading ? <ActivityIndicator size={'small'} color={"red"} /> : <Text className="text-yellow-400 font-medium">
                                {
                                    item.postStatus == 'Active' ? 'Deactivate' : 'Activate'
                                }
                            </Text>

                        }
                    </TouchableOpacity>
                </View>
            )
            }

            {/* Post Image */}
            <View className="w-full h-48 bg-zinc-700 items-center justify-center">
                {item.postCoverImage[0] ? (
                    <Image source={{ uri: item.postCoverImage[0] }} className="w-full h-full" />
                ) : (
                    <Ionicons name="image-outline" size={40} color="#FFD700" />
                )}
            </View>

            {/* Post Content */}
            <View className="p-4">
                <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-1 pr-2">
                        <Text className="text-white text-lg font-semibold">{item.postTitle}</Text>
                        <Text className="text-zinc-400 text-sm mt-1">{item.postDescription}</Text>
                    </View>
                    <View
                        className={`px-2 py-1 rounded-full ${item.postStatus == 'Active' ? 'bg-green-500/20' : 'bg-red-500/20'
                            }`}
                    >
                        <Text
                            className={`text-xs ${item.postStatus == 'Active' ? 'text-green-500' : 'text-red-500'
                                }`}
                        >
                            {item.postStatus == 'Active' ? 'Active' : 'Deactive'}
                        </Text>
                    </View>
                </View>

                {/* Likes and Price */}
                <View className="flex-row justify-between items-center mt-4">
                    <View className="flex-row items-center">
                        <Ionicons name="heart-outline" size={20} color="#FFD700" />
                        <Text className="text-zinc-400 ml-1">{item.productLikes || 0}</Text>
                    </View>
                    <Text className="text-[#FFD700] font-semibold text-base">₹ {item.postPrice}</Text>
                </View>

                {/* Edit Button */}
                <View className="flex-row gap-2 mt-4">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => editFunctionPage(item)}
                        className="flex-1 bg-zinc-700 py-3 rounded-lg flex-row items-center justify-center"
                    >
                        <Text className="text-white text-lg font-bold tracking-widest">Edit Post</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );

    return (
        <SettingsPageLayout title="Your Posts">
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-zinc-400 text-sm">Manage your posts</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => router.push('/(main)/(product)/NewPost')}
                    className="bg-[#FFD700] px-4 py-2 rounded-lg flex-row items-center"
                >
                    <Ionicons name="add-outline" size={20} color="black" />
                    <Text className="text-black font-semibold ml-2">New Post</Text>
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
