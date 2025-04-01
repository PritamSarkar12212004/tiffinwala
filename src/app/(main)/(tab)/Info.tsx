import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import BgColor from '@/src/constants/color/BgColor'
import MainPageHeader from '@/src/components/headers/MainPageHeader'
import { Ionicons } from '@expo/vector-icons'

const Info = () => {
  // Simulating user type - in real app this would come from auth context
  const [isOwner] = useState(true)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [postTitle, setPostTitle] = useState('')
  const [postDescription, setPostDescription] = useState('')

  // Client specific data
  const clientData = {
    likedProducts: [
      { id: 1, name: 'Special Thali', restaurant: 'Maa\'s Kitchen', image: 'https://example.com/thali.jpg' },
      { id: 2, name: 'Weekend Special', restaurant: 'Home Style', image: 'https://example.com/weekend.jpg' }
    ],
    followedRestaurants: [
      { id: 1, name: 'Maa\'s Kitchen', rating: 4.5, followers: 1200 },
      { id: 2, name: 'Home Style', rating: 4.8, followers: 800 }
    ],
    deliveryUpdates: [
      { id: 1, restaurant: 'Maa\'s Kitchen', status: 'On the way', time: '10 mins', location: 'Near City Center' },
      { id: 2, restaurant: 'Home Style', status: 'Preparing', time: '20 mins', location: 'Restaurant' }
    ],
    restaurantPosts: [
      { id: 1, restaurant: 'Maa\'s Kitchen', content: 'New weekend special menu!', likes: 45, comments: 12 },
      { id: 2, restaurant: 'Home Style', content: 'Today\'s special: Butter Chicken', likes: 38, comments: 8 }
    ]
  }

  // Owner specific data
  const ownerData = {
    followers: 2500,
    totalLikes: 15000,
    uploadedPosts: [
      {
        id: 1,
        title: 'Special Weekend Thali',
        description: 'Get our special weekend thali with 3 different sabzis, dal, rice, and roti!',
        image: 'https://example.com/thali.jpg',
        likes: 45,
        comments: 12,
        date: '2024-03-20'
      },
      {
        id: 2,
        title: 'New Menu Item',
        description: 'Introducing our new Butter Chicken! Made with authentic spices and fresh ingredients.',
        image: 'https://example.com/butter-chicken.jpg',
        likes: 38,
        comments: 8,
        date: '2024-03-19'
      }
    ]
  }

  const handlePostUpload = () => {
    // Handle post upload logic here
    setShowUploadForm(false)
    setPostTitle('')
    setPostDescription('')
  }

  const ClientView = () => (
    <ScrollView className='flex-1 px-4'>




      {/* Followed Restaurants */}
      <View className='mb-6'>
        <Text className='text-xl font-bold text-white mb-4'>Followed Restaurants</Text>
        {clientData.followedRestaurants.map(restaurant => (
          <TouchableOpacity key={restaurant.id} className='bg-[#2D2D2D] rounded-xl p-4 mb-3'>
            <View className='flex-row items-center justify-between'>
              <View>
                <Text className='text-white font-semibold'>{restaurant.name}</Text>
                <View className='flex-row items-center mt-1'>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text className='text-gray-400 ml-1'>{restaurant.rating}</Text>
                </View>
              </View>
              <Text className='text-gray-400'>{restaurant.followers} followers</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Liked Products */}
      <View className='mb-6'>
        <Text className='text-xl font-bold text-white mb-4'>Liked Products</Text>
        {clientData.likedProducts.map(product => (
          <TouchableOpacity key={product.id} className='bg-[#2D2D2D] rounded-xl p-4 mb-3'>
            <View className='flex-row items-center'>
              <View className='w-16 h-16 bg-gray-700 rounded-lg mr-3' />
              <View className='flex-1'>
                <Text className='text-white font-semibold'>{product.name}</Text>
                <Text className='text-gray-400'>{product.restaurant}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Restaurant Posts */}
      <View className='mb-32'>
        <Text className='text-xl font-bold text-white mb-4'>Restaurant Updates</Text>
        {clientData.restaurantPosts.map(post => (
          <View key={post.id} className='bg-[#2D2D2D] rounded-xl p-4 mb-3'>
            <Text className='text-white font-semibold mb-2'>{post.restaurant}</Text>
            <Text className='text-gray-400 mb-2'>{post.content}</Text>
            <View className='flex-row items-center'>
              <Ionicons name="heart" size={16} color="#FF6B35" />
              <Text className='text-gray-400 ml-1 mr-4'>{post.likes}</Text>
              <Ionicons name="chatbubble" size={16} color="#FF6B35" />
              <Text className='text-gray-400 ml-1'>{post.comments}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )

  const OwnerView = () => (
    <ScrollView className='flex-1 px-4'>
      {/* Profile Section */}
      <View className='items-center py-6'>
        <View className='w-24 h-24 rounded-full bg-orange-500 items-center justify-center mb-3'>
          <Ionicons name="restaurant" size={40} color="white" />
        </View>
        <Text className='text-xl font-bold text-white mb-1'>Maa\'s Kitchen</Text>
        <Text className='text-gray-400'>Owner Dashboard</Text>
      </View>

      {/* Stats Grid */}
      <View className='flex-row flex-wrap justify-between mb-6'>
        <View className='w-[48%] bg-[#2D2D2D] rounded-xl p-4 mb-4'>
          <View className='flex-row items-center mb-2'>
            <Ionicons name="people" size={24} color={BgColor.Accent} />
            <Text className='text-white ml-2 font-semibold'>{ownerData.followers}</Text>
          </View>
          <Text className='text-gray-400'>Followers</Text>
        </View>
        <View className='w-[48%] bg-[#2D2D2D] rounded-xl p-4 mb-4'>
          <View className='flex-row items-center mb-2'>
            <Ionicons name="heart" size={24} color={BgColor.Accent} />
            <Text className='text-white ml-2 font-semibold'>{ownerData.totalLikes}</Text>
          </View>
          <Text className='text-gray-400'>Total Likes</Text>
        </View>
      </View>

      {/* Post Upload Section */}
      <View className='mb-6'>
        <TouchableOpacity
          className='bg-[#FF6B35] rounded-xl p-4 flex-row items-center justify-center'
          onPress={() => setShowUploadForm(!showUploadForm)}
        >
          <Ionicons name={showUploadForm ? "close-circle" : "add-circle"} size={24} color="white" />
          <Text className='text-white font-semibold ml-2'>
            {showUploadForm ? 'Cancel' : 'Create New Post'}
          </Text>
        </TouchableOpacity>

        {showUploadForm && (
          <View className='bg-[#2D2D2D] rounded-xl p-4 mt-4'>
            <TextInput
              className='bg-[#1A1A1A] rounded-lg p-3 text-white mb-3'
              placeholder='Post Title'
              placeholderTextColor='#666'
              value={postTitle}
              onChangeText={setPostTitle}
            />
            <TextInput
              className='bg-[#1A1A1A] rounded-lg p-3 text-white mb-3'
              placeholder='Post Description'
              placeholderTextColor='#666'
              value={postDescription}
              onChangeText={setPostDescription}
              multiline
              numberOfLines={4}
            />
            <View className='flex-row justify-between'>
              <TouchableOpacity className='flex-1 bg-[#FF6B35] rounded-lg p-3 mr-2'>
                <Text className='text-white text-center'>Add Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity className='flex-1 bg-[#FF6B35] rounded-lg p-3 ml-2'>
                <Text className='text-white text-center'>Add Video</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              className='bg-[#4CAF50] rounded-lg p-3 mt-3'
              onPress={handlePostUpload}
            >
              <Text className='text-white text-center font-semibold'>Upload Post</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Uploaded Posts */}
      <View className='mb-32'>
        <Text className='text-xl font-bold text-white mb-4'>Your Posts</Text>
        {ownerData.uploadedPosts.map(post => (
          <View key={post.id} className='bg-[#2D2D2D] rounded-xl p-4 mb-4'>
            <View className='flex-row justify-between items-start mb-3'>
              <View className='flex-1'>
                <Text className='text-white font-semibold text-lg'>{post.title}</Text>
                <Text className='text-gray-400 text-sm mt-1'>{post.date}</Text>
              </View>
              <View className='flex-row'>
                <TouchableOpacity className='mr-3'>
                  <Ionicons name="create-outline" size={20} color={BgColor.Accent} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="trash-outline" size={20} color="#FF5252" />
                </TouchableOpacity>
              </View>
            </View>
            <Text className='text-gray-400 mb-3'>{post.description}</Text>
            <View className='h-40 bg-[#1A1A1A] rounded-lg mb-3' />
            <View className='flex-row items-center'>
              <Ionicons name="heart" size={16} color="#FF6B35" />
              <Text className='text-gray-400 ml-1 mr-4'>{post.likes}</Text>
              <Ionicons name="chatbubble" size={16} color="#FF6B35" />
              <Text className='text-gray-400 ml-1'>{post.comments}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )

  return (
    <View className='w-full h-full' style={{ backgroundColor: BgColor.Primary }}>
      <MainPageHeader />
      {isOwner ? <OwnerView /> : <ClientView />}
    </View>
  )
}

export default Info