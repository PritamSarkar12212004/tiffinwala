import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import SettingsPageLayout from '@/src/components/layout/SettingsPageLayout'

const Settings = () => {
    const router = useRouter();

    const settingsOptions = [
        {
            title: "Account",
            icon: "person-outline",
            options: [
                {
                    title: "Profile",
                    icon: "person-circle-outline",
                    action: () => router.push('/settings/Profile')
                },
                {
                    title: "Notifications",
                    icon: "notifications-outline",
                    action: () => router.push('/settings/Notifications')
                },
                {
                    title: "Privacy",
                    icon: "shield-outline",
                    action: () => router.push('/settings/Privacy')
                }
            ]
        },
        {
            title: "Preferences",
            icon: "settings-outline",
            options: [
                {
                    title: "Language",
                    icon: "language-outline",
                    action: () => router.push('/settings/Language')
                },
                {
                    title: "Theme",
                    icon: "color-palette-outline",
                    action: () => router.push('/settings/DarkMode')
                }
            ]
        },
        {
            title: "Support",
            icon: "help-circle-outline",
            options: [
                {
                    title: "Help & Support",
                    icon: "headset-outline",
                    action: () => router.push('/settings/HelpSupport')
                },
                {
                    title: "About",
                    icon: "information-circle-outline",
                    action: () => router.push('/settings/About')
                }
            ]
        }
    ];

    return (
        <SettingsPageLayout title="Settings" showBack={false}>
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {settingsOptions.map((section) => (
                    <View key={section.title} className="mb-6">
                        <View className="flex-row items-center mb-3">
                            <Ionicons name={section.icon as any} size={20} color="#FFD700" />
                            <Text className="text-zinc-400 text-sm ml-2">{section.title}</Text>
                        </View>
                        <View className="bg-zinc-800 rounded-xl overflow-hidden">
                            {section.options.map((option, index) => (
                                <TouchableOpacity
                                    key={option.title}
                                    onPress={option.action}
                                    className={`flex-row items-center p-4 ${
                                        index !== section.options.length - 1 ? 'border-b border-zinc-700' : ''
                                    }`}
                                >
                                    <View className="w-10 h-10 rounded-full bg-zinc-700 items-center justify-center mr-3">
                                        <Ionicons name={option.icon as any} size={20} color="#FFD700" />
                                    </View>
                                    <Text className="text-white text-lg flex-1">{option.title}</Text>
                                    <Ionicons name="chevron-forward" size={20} color="#FFD700" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

                <TouchableOpacity 
                    className="bg-red-500 rounded-xl p-4 flex-row items-center justify-center mb-6"
                    onPress={() => {}}
                >
                    <Ionicons name="log-out-outline" size={20} color="white" />
                    <Text className="text-white text-lg font-semibold ml-2">Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </SettingsPageLayout>
    )
}

export default Settings 