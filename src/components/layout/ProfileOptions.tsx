import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import ProfileOptionCard from '../ProfileOptionCard/ProfileOptionCard'
import { router, useNavigation } from 'expo-router';
import { removeFullData, removeLocationData, removeTemData } from '@/src/functions/storage/Storage';
import AuthToken from '@/src/constants/token/AuthToken';
import { userContext } from '@/src/utils/context/ContextApi';
import UtilsToken from '@/src/constants/token/UtilsToken';

const ProfileOptions = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [notifications, setNotifications] = useState(true);
    const navigation = useNavigation()

    const { 
        setUserProfile, 
        setUserTemLocation, 
        setProduct, 
        setProductReloader,
        seteditTempInformation,
        setMainData,
        setTotalLikes,
        setTotalViews,
        setFilters,
        setLocationSearch,
        setLocation
    } = userContext()

    const data = [
        {
            title: "Help & Support",
            icon: "help-circle-outline",
            description: "Get help and contact support",
            func: () => {
                navigation.navigate("HelpSupport" as never)
            }
        },
        {
            title: "About App",
            icon: "information-circle-outline",
            description: "App version and information",
            func: () => {
                navigation.navigate("About" as never)
            }
        },
        {
            title: "Logout",
            icon: "log-out-outline",
            description: "Sign out of your account",
            func: () => {
                // Clear all storage data
                removeFullData(AuthToken.UserInfo)
                removeTemData(AuthToken.TemLogin)
                removeLocationData(UtilsToken.Location)

                // Clear all context data
                setUserProfile(null)
                setUserTemLocation(null)
                setProduct([])
                setProductReloader(false)
                seteditTempInformation(null)
                setMainData(null)
                setTotalLikes(null)
                setTotalViews(null)
                setFilters({
                    priceRange: [0, 5000],
                    sortBy: 'rating'
                })
                setLocationSearch(null)
                setLocation(null)

                // Navigate to auth screen
                router.replace("/(auth)" as any)
            }
        }
    ]
    return (
        <View className='w-full mb-4'>
            <View className='flex-row items-center justify-between mb-4'>
                <View>
                    <Text className='text-white text-xl font-bold'>Settings</Text>
                    <Text className='text-zinc-400 text-sm'>Manage your account settings</Text>
                </View>
            </View>

            <View className='flex gap-2'>
                {data.map((item, index) => (
                    <ProfileOptionCard
                        key={index}
                        title={item.title}
                        icon={item.icon}
                        func={item.func}
                        description={item.description}
                    />
                ))}
            </View>
        </View>
    )
}

export default ProfileOptions