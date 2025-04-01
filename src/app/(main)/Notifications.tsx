import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import SettingsPageLayout from '@/src/components/layout/SettingsPageLayout'

const Notifications = () => {
    const [settings, setSettings] = useState({
        orderUpdates: true,
        promotions: true,
        newReviews: true,
        messages: true,
        systemUpdates: false,
        marketing: false
    });

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const notificationTypes = [
        {
            title: "Order Updates",
            description: "Get notified about your order status and delivery updates",
            icon: "cart-outline",
            key: "orderUpdates"
        },
        {
            title: "Promotions",
            description: "Receive notifications about special offers and discounts",
            icon: "pricetag-outline",
            key: "promotions"
        },
        {
            title: "New Reviews",
            description: "Get notified when someone reviews your posts",
            icon: "star-outline",
            key: "newReviews"
        },
        {
            title: "Messages",
            description: "Receive notifications for new messages and chats",
            icon: "chatbubble-outline",
            key: "messages"
        },
        {
            title: "System Updates",
            description: "Get notified about app updates and maintenance",
            icon: "settings-outline",
            key: "systemUpdates"
        },
        {
            title: "Marketing",
            description: "Receive marketing and promotional content",
            icon: "megaphone-outline",
            key: "marketing"
        }
    ];

    return (
        <SettingsPageLayout title="Notifications">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="mb-6">
                    <Text className="text-zinc-400 text-sm mb-2">Manage your notification preferences</Text>
                    <Text className="text-zinc-400 text-sm">Choose what notifications you want to receive</Text>
                </View>

                <View className="flex gap-3">
                    {notificationTypes.map((type) => (
                        <TouchableOpacity 
                            key={type.key}
                            className="bg-zinc-800 rounded-xl p-4 flex-row items-center justify-between"
                        >
                            <View className="flex-row items-center gap-3 flex-1">
                                <View className="w-10 h-10 rounded-full bg-zinc-700 items-center justify-center">
                                    <Ionicons name={type.icon as any} size={20} color="#FFD700" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-white text-lg font-semibold">{type.title}</Text>
                                    <Text className="text-zinc-400 text-sm mt-1">{type.description}</Text>
                                </View>
                            </View>
                            <TouchableOpacity 
                                onPress={() => toggleSetting(type.key as keyof typeof settings)}
                                className={`w-12 h-7 rounded-full ${settings[type.key as keyof typeof settings] ? 'bg-[#FFD700]' : 'bg-zinc-700'}`}
                            >
                                <View 
                                    className={`w-5 h-5 rounded-full bg-white m-1 ${settings[type.key as keyof typeof settings] ? 'ml-6' : ''}`}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="mt-6 bg-zinc-800 rounded-xl p-4">
                    <Text className="text-white text-lg font-semibold mb-2">Notification Schedule</Text>
                    <Text className="text-zinc-400 text-sm mb-4">Choose when you want to receive notifications</Text>
                    <View className="flex-row gap-2">
                        <TouchableOpacity className="flex-1 bg-zinc-700 py-3 rounded-lg">
                            <Text className="text-white text-center">Quiet Hours</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 bg-zinc-700 py-3 rounded-lg">
                            <Text className="text-white text-center">Custom Schedule</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SettingsPageLayout>
    )
}

export default Notifications 