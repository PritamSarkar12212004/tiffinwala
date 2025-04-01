import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import SettingsPageLayout from '@/src/components/layout/SettingsPageLayout'

const DarkMode = () => {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');

    const themes = [
        {
            title: "Light Mode",
            description: "Use light theme regardless of system settings",
            icon: "sunny-outline",
            value: "light"
        },
        {
            title: "Dark Mode",
            description: "Use dark theme regardless of system settings",
            icon: "moon-outline",
            value: "dark"
        },
        {
            title: "System Default",
            description: "Automatically match system theme",
            icon: "settings-outline",
            value: "system"
        }
    ];

    return (
        <SettingsPageLayout title="Theme Settings">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="mb-6">
                    <Text className="text-zinc-400 text-sm mb-2">Choose your preferred theme</Text>
                    <Text className="text-zinc-400 text-sm">Select how you want the app to look</Text>
                </View>

                <View className="flex gap-3">
                    {themes.map((item) => (
                        <TouchableOpacity 
                            key={item.value}
                            onPress={() => setTheme(item.value as 'light' | 'dark' | 'system')}
                            className={`bg-zinc-800 rounded-xl p-4 flex-row items-center justify-between ${
                                theme === item.value ? 'border-2 border-[#FFD700]' : ''
                            }`}
                        >
                            <View className="flex-row items-center gap-3 flex-1">
                                <View className="w-10 h-10 rounded-full bg-zinc-700 items-center justify-center">
                                    <Ionicons name={item.icon as any} size={20} color="#FFD700" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-white text-lg font-semibold">{item.title}</Text>
                                    <Text className="text-zinc-400 text-sm mt-1">{item.description}</Text>
                                </View>
                            </View>
                            {theme === item.value && (
                                <Ionicons name="checkmark-circle" size={24} color="#FFD700" />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="mt-6 bg-zinc-800 rounded-xl p-4">
                    <Text className="text-white text-lg font-semibold mb-2">Theme Preview</Text>
                    <Text className="text-zinc-400 text-sm mb-4">See how your selected theme looks</Text>
                    <View className="flex-row gap-2">
                        <View className="flex-1 bg-zinc-700 rounded-lg p-4">
                            <View className="w-full h-32 bg-zinc-600 rounded-lg mb-3" />
                            <View className="w-3/4 h-4 bg-zinc-600 rounded-full mb-2" />
                            <View className="w-1/2 h-4 bg-zinc-600 rounded-full" />
                        </View>
                        <View className="flex-1 bg-zinc-700 rounded-lg p-4">
                            <View className="w-full h-32 bg-zinc-600 rounded-lg mb-3" />
                            <View className="w-2/3 h-4 bg-zinc-600 rounded-full mb-2" />
                            <View className="w-1/3 h-4 bg-zinc-600 rounded-full" />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SettingsPageLayout>
    )
}

export default DarkMode 