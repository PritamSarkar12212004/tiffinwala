import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

interface ProfileOptionCardProps {
    title: string;
    icon: string;
    func: () => void;
    description?: string;
    showArrow?: boolean;
    showSwitch?: boolean;
    isEnabled?: boolean;
    onToggle?: () => void;
}

const ProfileOptionCard = ({ 
    title, 
    icon, 
    func, 
    description,
    showArrow = true,
    showSwitch = false,
    isEnabled = false,
}: ProfileOptionCardProps) => {
    return (
        <TouchableOpacity 
            onPress={func} 
            className='w-full bg-zinc-800 rounded-xl overflow-hidden mb-2'
        >
            <View className='flex-row items-center justify-between p-4'>
                <View className='flex-row items-center gap-3 flex-1'>
                    <View className='w-10 h-10 rounded-full bg-zinc-700 items-center justify-center'>
                        <Ionicons name={icon as any} size={20} color="#FFD700" />
                    </View>
                    <View className='flex-1'>
                        <Text className='text-white text-lg font-semibold'>{title}</Text>
                        {description && (
                            <Text className='text-zinc-400 text-sm mt-1'>{description}</Text>
                        )}
                    </View>
                </View>
                {showArrow && !showSwitch && (
                    <Ionicons name="chevron-forward" size={20} color="#FFD700" />
                )}
               
            </View>
        </TouchableOpacity>
    )
}

export default ProfileOptionCard