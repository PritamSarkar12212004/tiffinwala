import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import SettingsPageLayout from '@/src/components/layout/SettingsPageLayout'

const Privacy = () => {
    const [settings, setSettings] = useState({
        profileVisibility: 'public',
        locationSharing: true,
        activityStatus: true,
        dataCollection: false,
        personalizedAds: false
    });

    const toggleSetting = (key: keyof typeof settings) => {
        if (typeof settings[key] === 'boolean') {
            setSettings(prev => ({
                ...prev,
                [key]: !prev[key]
            }));
        }
    };

    const privacyOptions = [
        {
            title: "Profile Visibility",
            description: "Control who can see your profile information",
            icon: "eye-outline",
            type: "select",
            options: ['public', 'private', 'friends']
        },
        {
            title: "Location Sharing",
            description: "Allow app to access your location",
            icon: "location-outline",
            type: "toggle",
            key: "locationSharing"
        },
        {
            title: "Activity Status",
            description: "Show when you're active on the app",
            icon: "time-outline",
            type: "toggle",
            key: "activityStatus"
        },
        {
            title: "Data Collection",
            description: "Allow collection of usage data",
            icon: "analytics-outline",
            type: "toggle",
            key: "dataCollection"
        },
        {
            title: "Personalized Ads",
            description: "Receive personalized advertisements",
            icon: "megaphone-outline",
            type: "toggle",
            key: "personalizedAds"
        }
    ];

    return (
        <SettingsPageLayout title="Privacy">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="mb-6">
                    <Text className="text-zinc-400 text-sm mb-2">Manage your privacy settings</Text>
                    <Text className="text-zinc-400 text-sm">Control how your information is shared</Text>
                </View>

                <View className="flex gap-3">
                    {privacyOptions.map((option) => (
                        <View key={option.title} className="bg-zinc-800 rounded-xl p-4">
                            <View className="flex-row items-center justify-between mb-2">
                                <View className="flex-row items-center gap-3">
                                    <View className="w-10 h-10 rounded-full bg-zinc-700 items-center justify-center">
                                        <Ionicons name={option.icon as any} size={20} color="#FFD700" />
                                    </View>
                                    <View>
                                        <Text className="text-white text-lg font-semibold">{option.title}</Text>
                                        <Text className="text-zinc-400 text-sm">{option.description}</Text>
                                    </View>
                                </View>
                                {option.type === 'toggle' && (
                                    <TouchableOpacity 
                                        onPress={() => toggleSetting(option.key as keyof typeof settings)}
                                        className={`w-12 h-7 rounded-full ${settings[option.key as keyof typeof settings] ? 'bg-[#FFD700]' : 'bg-zinc-700'}`}
                                    >
                                        <View 
                                            className={`w-5 h-5 rounded-full bg-white m-1 ${settings[option.key as keyof typeof settings] ? 'ml-6' : ''}`}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                            {option.type === 'select' && (
                                <View className="flex-row gap-2 mt-2">
                                    {option.options.map((opt) => (
                                        <TouchableOpacity
                                            key={opt}
                                            onPress={() => setSettings(prev => ({ ...prev, profileVisibility: opt }))}
                                            className={`flex-1 py-2 rounded-lg ${
                                                settings.profileVisibility === opt ? 'bg-[#FFD700]' : 'bg-zinc-700'
                                            }`}
                                        >
                                            <Text className={`text-center ${settings.profileVisibility === opt ? 'text-black font-semibold' : 'text-white'}`}>
                                                {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                <View className="mt-6 bg-zinc-800 rounded-xl p-4">
                    <Text className="text-white text-lg font-semibold mb-2">Data Management</Text>
                    <Text className="text-zinc-400 text-sm mb-4">Control your data and privacy</Text>
                    <TouchableOpacity className="bg-zinc-700 py-3 rounded-lg">
                        <Text className="text-white text-center">Download My Data</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SettingsPageLayout>
    )
}

export default Privacy 