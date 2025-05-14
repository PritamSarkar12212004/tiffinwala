import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import SettingsPageLayout from '@/src/components/layout/SettingsPageLayout'
import { useRouter } from 'expo-router'

const HelpSupport = () => {
    const router = useRouter()
    const supportOptions = [
        {
            title: "FAQs",
            description: "Find answers to common questions",
            icon: "help-circle-outline",
            action: () => router.push('/(worker)/FaqScreen' as never)
        },
        {
            title: "Contact Support",
            description: "Get in touch with our support team",
            icon: "headset-outline",
            action: () => Linking.openURL('tel:+917620876689')
        },
        {
            title: "Report a Problem",
            description: "Help us improve by reporting issues",
            icon: "bug-outline",
            action: () => Linking.openURL('mailto:tiffinwala2004@gmail.com')
        },
        {
            title: "Terms of Service",
            description: "Read our terms and conditions",
            icon: "document-text-outline",
            action: () => router.push('/(worker)/TermNCondition' as never)
        },
        {
            title: "Privacy Policy",
            description: "Learn about our privacy practices",
            icon: "shield-outline",
            action: () => router.push('/(worker)/PrivacyPolicyScreen' as never)
        }
    ];

    return (
        <SettingsPageLayout title="Help & Support">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="mb-6">
                    <Text className="text-zinc-400 text-sm mb-2">Need help?</Text>
                    <Text className="text-zinc-400 text-sm">Find answers and get support</Text>
                </View>

                <View className="flex gap-3">
                    {supportOptions.map((option) => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            key={option.title}
                            onPress={option.action}
                            className="bg-zinc-800 rounded-xl p-4 flex-row items-center"
                        >
                            <View className="w-10 h-10 rounded-full bg-zinc-700 items-center justify-center mr-3">
                                <Ionicons name={option.icon as any} size={20} color="#FFD700" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-white text-lg font-semibold">{option.title}</Text>
                                <Text className="text-zinc-400 text-sm mt-1">{option.description}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#FFD700" />
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="mt-6 bg-zinc-800 rounded-xl p-4">
                    <Text className="text-white text-lg font-semibold mb-2">Quick Actions</Text>
                    <Text className="text-zinc-400 text-sm mb-4">Get help faster with these options</Text>
                    <View className="flex-row gap-2">
                        <TouchableOpacity
                            activeOpacity={0.8}
                            className="flex-1 bg-zinc-700 py-3 rounded-lg items-center"
                            onPress={() => Linking.openURL('mailto:tiffinwala2004@gmail.com')}
                        >
                            <Ionicons name="mail-outline" size={20} color="#FFD700" />
                            <Text className="text-white mt-1">Email Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            className="flex-1 bg-zinc-700 py-3 rounded-lg items-center"
                            onPress={() => Linking.openURL('tel:+917620876689')}
                        >
                            <Ionicons name="call-outline" size={20} color="#FFD700" />
                            <Text className="text-white mt-1">Call Us</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mt-6 bg-zinc-800 rounded-xl p-4">
                    <Text className="text-white text-lg font-semibold mb-2">App Information</Text>
                    <View className="flex-row justify-between items-center">
                        <Text className="text-zinc-400">Version</Text>
                        <Text className="text-white">1.0.0</Text>
                    </View>
                    <View className="flex-row justify-between items-center mt-2">
                        <Text className="text-zinc-400">Build</Text>
                        <Text className="text-white">2024.1</Text>
                    </View>
                </View>
            </ScrollView>
        </SettingsPageLayout>
    )
}

export default HelpSupport 