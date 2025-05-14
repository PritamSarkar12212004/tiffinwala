import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageNavigation from '@/src/components/navigation/PageNavigation';

const PrivacyPolicyScreen = () => {
    return (
        <SafeAreaView className="flex-1 bg-black">
            <PageNavigation path="Privacy & Policy" />
            <ScrollView
                className="px-4 py-6"
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <Text className="text-[#D69500] text-3xl font-semibold mb-6">Privacy Policy</Text>

                <View className="mb-6">
                    <Text className="text-white text-xl font-semibold mb-1">1. Information We Collect</Text>
                    <Text className="text-zinc-400 text-base font-medium">
                        We collect your name, contact details, location, and order preferences to provide better service.
                    </Text>
                </View>

                <View className="mb-6">
                    <Text className="text-white text-xl font-semibold mb-1">2. How We Use Your Data</Text>
                    <Text className="text-zinc-400 text-base font-medium">
                        Your data is used for order processing, improving our services, and vendor communication.
                    </Text>
                </View>

                <View className="mb-6">
                    <Text className="text-white text-xl font-semibold mb-1">3. Data Sharing</Text>
                    <Text className="text-zinc-400 text-base font-medium">
                        We do not sell or rent your data. Your information is shared only with registered vendors for delivery purposes.
                    </Text>
                </View>

                <View className="mb-6">
                    <Text className="text-white text-xl font-semibold mb-1">4. Data Security</Text>
                    <Text className="text-zinc-400 text-base font-medium">
                        We use encryption and secure servers to protect your data from unauthorized access.
                    </Text>
                </View>

                <View className="mb-6">
                    <Text className="text-white text-xl font-semibold mb-1">5. Third-party Services</Text>
                    <Text className="text-zinc-400 text-base font-medium">
                        Our app may use third-party services (e.g., payment gateways). Their privacy policies apply separately.
                    </Text>
                </View>

                <View className="mb-6">
                    <Text className="text-white text-xl font-semibold mb-1">6. Your Choices</Text>
                    <Text className="text-zinc-400 text-base font-medium">
                        You can update or delete your data by contacting our support team at{" "}
                        <Text className="text-white">support@tiffinwala.app</Text>.
                    </Text>
                </View>

                <View className="mb-6">
                    <Text className="text-white text-xl font-semibold mb-1">7. Updates to this Policy</Text>
                    <Text className="text-zinc-400 text-base font-medium">
                        We may update this Privacy Policy occasionally. Please review this page for changes.
                    </Text>
                </View>

                <Text className="text-center text-zinc-500 mt-10 text-sm">
                    © {new Date().getFullYear()} Tiffin Wala. All rights reserved.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PrivacyPolicyScreen;
