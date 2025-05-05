import { View, Text, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import BackgroundConstant from '@/src/constants/background/BackgroundConstant';


const index = () => {
  return (
    <View className='flex-1 w-full bg-black'>
      <View className='h-[40%] w-full relative'>
        <ImageBackground
          source={BackgroundConstant.UpdateBackground}
          className='w-full h-full'
          resizeMode='cover'
        >
          <BlurView intensity={60} className='absolute inset-0'>
            <LinearGradient
              colors={[
                'rgba(0,0,0,0.3)',
                'rgba(0,0,0,0.5)',
                'rgba(0,0,0,0.7)',
                'rgba(0,0,0,0.9)',
                'rgba(0,0,0,1)'
              ]}
              locations={[0, 0.2, 0.4, 0.7, 1]}
              className='absolute inset-0'
            />
          </BlurView>
        </ImageBackground>
      </View>

      {/* Content Section */}
      <View className='flex-1 px-6 pt-8'>
        <View className='gap-6'>
          <View className='items-center'>
            <View className='items-center mb-3'>
              <View className='bg-[#7848FE]/20 p-4 rounded-3xl backdrop-blur-lg border border-[#7848FE]/30 mb-2'>
                <MaterialIcons name="tips-and-updates" size={40} color="#7848FE" />
              </View>
            </View>
            <Text className='text-[#7848FE] font-bold text-lg tracking-wider mb-2'>NEW VERSION AVAILABLE</Text>
            <Text className='text-white font-bold text-2xl text-center leading-tight'>
              Time to Upgrade Your Experience
            </Text>
          </View>

          <View className='bg-[#1A1A1A] p-6 rounded-3xl gap-4'>
            <View className='flex-row items-center gap-3'>
              <View className='bg-[#7848FE]/20 p-2 rounded-lg'>
                <MaterialIcons name="speed" size={24} color="#7848FE" />
              </View>
              <Text className='text-white font-medium flex-1'>
                Improved performance and faster loading times
              </Text>
            </View>

            <View className='flex-row items-center gap-3'>
              <View className='bg-[#7848FE]/20 p-2 rounded-lg'>
                <MaterialIcons name="security" size={24} color="#7848FE" />
              </View>
              <Text className='text-white font-medium flex-1'>
                Enhanced security features and bug fixes
              </Text>
            </View>

            <View className='flex-row items-center gap-3'>
              <View className='bg-[#7848FE]/20 p-2 rounded-lg'>
                <MaterialIcons name="new-releases" size={24} color="#7848FE" />
              </View>
              <Text className='text-white font-medium flex-1'>
                New exciting features and improvements
              </Text>
            </View>
          </View>
        </View>

        <View className='absolute bottom-8 left-6 right-6'>

          <TouchableOpacity
            activeOpacity={0.9}
            className='bg-[#7848FE] py-4 rounded-2xl w-full flex-row items-center justify-center gap-2'
          >
            <Text className='text-white font-bold text-lg'>Update Now</Text>
            <MaterialCommunityIcons name="cog-refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default index