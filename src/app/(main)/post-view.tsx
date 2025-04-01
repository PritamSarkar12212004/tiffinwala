import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PostView = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      {/* Post Header */}
      <View className="p-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Image
              source={{ uri: 'https://via.placeholder.com/40' }}
              className="w-10 h-10 rounded-full mr-3"
            />
            <View>
              <Text className="font-bold">TiffinWala</Text>
              <Text className="text-gray-500">2 hours ago</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Post Content */}
      <View className="p-4">
        <Text className="text-lg mb-4">
          🍱 Special Offer Alert! 🍱{'\n\n'}
          Get 20% off on your first order! Use code: FIRST20{'\n\n'}
          Our delicious tiffins are now available at your doorstep. Order now and experience the authentic taste of homemade food! 🏠✨
        </Text>
        
        <Image
          source={{ uri: 'https://via.placeholder.com/400x300' }}
          className="w-full h-64 rounded-lg mb-4"
        />

        {/* Engagement Stats */}
        <View className="flex-row justify-between mb-4">
          <View className="flex-row items-center">
            <Ionicons name="eye" size={20} color="#666" />
            <Text className="ml-2 text-gray-600">1.2K views</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="heart" size={20} color="#ff4d4d" />
            <Text className="ml-2 text-gray-600">234 likes</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="chatbubble-outline" size={20} color="#666" />
            <Text className="ml-2 text-gray-600">45 comments</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-between py-4 border-t border-b border-gray-200">
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="heart-outline" size={24} color="#666" />
            <Text className="ml-2 text-gray-600">Like</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="chatbubble-outline" size={24} color="#666" />
            <Text className="ml-2 text-gray-600">Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="share-outline" size={24} color="#666" />
            <Text className="ml-2 text-gray-600">Share</Text>
          </TouchableOpacity>
        </View>

        {/* Comments Section */}
        <View className="mt-4">
          <Text className="font-bold mb-4">Comments (45)</Text>
          {[1, 2, 3].map((item) => (
            <View key={item} className="mb-4">
              <View className="flex-row items-start">
                <Image
                  source={{ uri: 'https://via.placeholder.com/30' }}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <View className="flex-1">
                  <Text className="font-semibold">User {item}</Text>
                  <Text className="text-gray-600">Great offer! Will definitely try this out! 👍</Text>
                  <View className="flex-row items-center mt-2">
                    <Text className="text-gray-500 text-sm">2 hours ago</Text>
                    <TouchableOpacity className="ml-4">
                      <Text className="text-blue-600 text-sm">Reply</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default PostView; 