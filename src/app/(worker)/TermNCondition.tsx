import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import PageNavigation from '@/src/components/navigation/PageNavigation'

const TermNCondition = () => {
    return (
        <View className='flex-1 bg-black'>
                <PageNavigation path='Terms & Conditions' />
                <ScrollView className='px-4  py-6'>
                    <View >
                        <Text className='text-[#D69500] text-3xl font-semibold mb-2'>Terms of Service</Text>
                        <Text className='text-zinc-400 text-base font-medium'>
                            Welcome to <Text className='text-white font-bold'>Tiffin Wala</Text>. These Terms and Conditions govern your use of our platform, which connects users with local mess and tiffin providers ("Vendors").
                        </Text>
                    </View>

                    <View className='mb-6'>
                        <Text className='text-[#D69500] text-2xl font-semibold mb-1'>1. User Responsibilities</Text>
                        <Text className='text-zinc-400 text-base font-medium'>
                            - Provide accurate delivery details during booking.{"\n"}
                            - Respect the food delivery timings and hygiene standards.{"\n"}
                            - Avoid misuse or abuse of our platform or Vendor services.
                        </Text>
                    </View>

                    <View className='mb-6'>
                        <Text className='text-[#D69500] text-2xl font-semibold mb-1'>2. Vendor Services</Text>
                        <Text className='text-zinc-400 text-base font-medium'>
                            - Vendors are responsible for food quality, preparation, and timely delivery.{"\n"}
                            - Tiffin Wala is not liable for any food-related health issues.{"\n"}
                            - Vendor listings and prices are subject to change at any time.
                        </Text>
                    </View>

                    <View className='mb-6'>
                        <Text className='text-[#D69500] text-2xl font-semibold mb-1'>3. Payments & Refunds</Text>
                        <Text className='text-zinc-400 text-base font-medium'>
                            - Payments are to be made online through the app.{"\n"}
                            - Refunds are applicable only if the order is not delivered or wrongly delivered.{"\n"}
                            - Cancellation policies vary based on the Vendor.
                        </Text>
                    </View>

                    <View className='mb-6'>
                        <Text className='text-[#D69500] text-2xl font-semibold mb-1'>4. Data Privacy</Text>
                        <Text className='text-zinc-400 text-base font-medium'>
                            - Your data is safe with us and used only for service improvement.{"\n"}
                            - We do not sell or share your personal data with third parties without consent.
                        </Text>
                    </View>

                    <View className='mb-6'>
                        <Text className='text-[#D69500] text-2xl font-semibold mb-1'>5. Termination</Text>
                        <Text className='text-zinc-400 text-base font-medium'>
                            - We reserve the right to suspend or ban any user for violation of these terms.{"\n"}
                            - Vendors found violating hygiene or service standards may be delisted.
                        </Text>
                    </View>

                    <View className='mb-6'>
                        <Text className='text-[#D69500] text-2xl font-semibold mb-1'>6. Contact & Support</Text>
                        <Text className='text-zinc-400 text-base font-medium'>
                            For any questions or grievances, contact us at:{"\n"}
                            <Text className='text-white'>support@tiffinwala.app</Text>
                        </Text>
                    </View>

                    <Text className='text-center text-zinc-500 mt-6 text-sm'>
                        © {new Date().getFullYear()} Tiffin Wala. All rights reserved.
                    </Text>
                </ScrollView>
        </View>)
}

export default TermNCondition
