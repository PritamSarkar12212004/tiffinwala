import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import SettingsPageLayout from '@/src/components/layout/SettingsPageLayout'

const About = () => {
    const aboutSections = [
        {
            title: "App Information",
            items: [
                {
                    title: "Version",
                    value: "1.0.0",
                    icon: "information-circle-outline"
                },
                {
                    title: "Build",
                    value: "2024.1",
                    icon: "build-outline"
                },
                {
                    title: "Last Updated",
                    value: "March 2024",
                    icon: "time-outline"
                }
            ]
        },
        {
            title: "Company",
            items: [
                {
                    title: "Website",
                    value: "www.tiffinwala.com",
                    icon: "globe-outline",
                    action: () => Linking.openURL('https://www.tiffinwala.com')
                },
                {
                    title: "Email",
                    value: "contact@tiffinwala.com",
                    icon: "mail-outline",
                    action: () => Linking.openURL('mailto:contact@tiffinwala.com')
                },
                {
                    title: "Phone",
                    value: "+91 1234567890",
                    icon: "call-outline",
                    action: () => Linking.openURL('tel:+911234567890')
                }
            ]
        },
        {
            title: "Legal",
            items: [
                {
                    title: "Terms of Service",
                    value: "Read our terms",
                    icon: "document-text-outline",
                    action: () => { }
                },
                {
                    title: "Privacy Policy",
                    value: "View privacy policy",
                    icon: "shield-outline",
                    action: () => { }
                },
                {
                    title: "Cookie Policy",
                    value: "Learn about cookies",
                    icon: "cafe-outline",
                    action: () => { }
                }
            ]
        }
    ];

    return (
        <SettingsPageLayout title="About">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="items-center mb-8">
                    <View className="w-24 h-24 rounded-full bg-zinc-800 items-center justify-center mb-4">
                        <Ionicons name="restaurant-outline" size={40} color="#FFD700" />
                    </View>
                    <Text className="text-white text-2xl font-bold mb-2">TiffinWala</Text>
                    <Text className="text-zinc-400 text-center">Your one-stop solution for finding the best tiffin services</Text>
                </View>

                {aboutSections.map((section) => (
                    <View key={section.title} className="mb-6">
                        <Text className="text-zinc-400 text-sm mb-3">{section.title}</Text>
                        <View className="bg-zinc-800 rounded-xl overflow-hidden">
                            {section.items.map((item, index) => (
                                <TouchableOpacity
                                    key={item.title}
                                    onPress={item.action}
                                    className={`flex-row items-center p-4 ${index !== section.items.length - 1 ? 'border-b border-zinc-700' : ''
                                        }`}
                                >
                                    <View className="w-10 h-10 rounded-full bg-zinc-700 items-center justify-center mr-3">
                                        <Ionicons name={item.icon as any} size={20} color="#FFD700" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-white text-lg">{item.title}</Text>
                                        <Text className="text-zinc-400 text-sm">{item.value}</Text>
                                    </View>
                                    {item.action && (
                                        <Ionicons name="chevron-forward" size={20} color="#FFD700" />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

                <View className="bg-zinc-800 rounded-xl p-4 mb-6">
                    <Text className="text-white text-lg font-semibold mb-2">Follow Us</Text>
                    <View className="flex-row justify-around">
                        <TouchableOpacity
                            className="w-12 h-12 rounded-full bg-zinc-700 items-center justify-center"
                            onPress={() => Linking.openURL('https://facebook.com/tiffinwala')}
                        >
                            <Ionicons name="logo-facebook" size={24} color="#FFD700" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="w-12 h-12 rounded-full bg-zinc-700 items-center justify-center"
                            onPress={() => Linking.openURL('https://instagram.com/tiffinwala')}
                        >
                            <Ionicons name="logo-instagram" size={24} color="#FFD700" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="w-12 h-12 rounded-full bg-zinc-700 items-center justify-center"
                            onPress={() => Linking.openURL('https://twitter.com/tiffinwala')}
                        >
                            <Ionicons name="logo-twitter" size={24} color="#FFD700" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SettingsPageLayout>
    )
}

export default About 