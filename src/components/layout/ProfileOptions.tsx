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

    const { setUserProfile } = userContext()

    const data = [
        // {
        //     title: "Notifications",
        //     icon: "notifications-outline",
        //     description: "Manage your notification preferences",
        //     showSwitch: true,
        //     isEnabled: notifications,
        //     func: () => {
        //         navigation.navigate("Notifications" as never)
        //     }
        // },
        // {
        //     title: "Theme",
        //     icon: "moon-outline",
        //     description: "Toggle dark/light theme",
        //     showSwitch: true,
        //     isEnabled: isDarkMode,
        //     func: () => {
        //         navigation.navigate("DarkMode" as never)
        //     }
        // },

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
                removeFullData(AuthToken.UserInfo)
                removeTemData(AuthToken.TemLogin)
                setUserProfile(null)
                removeLocationData(UtilsToken.Location)
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
                        showSwitch={item.showSwitch}
                        isEnabled={item.isEnabled}
                    />
                ))}
            </View>
        </View>
    )
}

export default ProfileOptions