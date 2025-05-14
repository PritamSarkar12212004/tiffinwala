import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

interface SettingsPageLayoutProps {
    title: string;
    children: React.ReactNode;
    showBack?: boolean;
}

const SettingsPageLayout = ({ title, children, showBack = true }: SettingsPageLayoutProps) => {
    const router = useRouter();

    return (
        <View className="flex-1 bg-black">
            <SafeAreaView className="flex-1">
                <View className="flex-row items-center p-4 border-b border-zinc-800">
                    {showBack && (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => router.back()}
                            className="mr-4"
                        >
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                    )}
                    <Text className="text-white text-xl font-bold">{title}</Text>
                </View>
                <View className="flex-1 p-4">
                    {children}
                </View>
            </SafeAreaView>
        </View>
    )
}

export default SettingsPageLayout 