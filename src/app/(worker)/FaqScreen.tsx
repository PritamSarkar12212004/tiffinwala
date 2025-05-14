import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import PageNavigation from '@/src/components/navigation/PageNavigation';

const FaqScreen = () => {
    return (
        <View className="flex-1 bg-black">
            <PageNavigation path="FAQs" />
            <ScrollView
                className="px-4 py-6"
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <Text className="text-[#D69500] text-3xl font-semibold mb-6">Frequently Asked Questions</Text>

                {[
                    {
                        question: 'What is Tiffin Wala?',
                        answer: 'Tiffin Wala is a platform that connects users with local mess and tiffin providers in your area for convenient daily meals.',
                    },
                    {
                        question: 'How can I place an order?',
                        answer: 'You can place an order directly from the app by selecting your preferred vendor and meal plan.',
                    },
                    {
                        question: 'Is delivery included in the price?',
                        answer: 'Delivery charges vary based on the vendor and location. Some vendors include it in the price, others may charge extra.',
                    },
                    {
                        question: 'Can I cancel or change my order?',
                        answer: 'Yes, but cancellation or changes are subject to each vendor’s policy. Check the vendor’s profile for more details.',
                    },
                    {
                        question: 'What if I don’t receive my tiffin?',
                        answer: 'Please contact support or the vendor directly through the app. Refunds are processed if the issue is confirmed.',
                    },
                    {
                        question: 'How do I contact support?',
                        answer: 'You can email us at support@tiffinwala.app or use the Help section inside the app for quick assistance.',
                    },
                ].map((faq, index) => (
                    <View key={index} className="mb-6">
                        <Text className="text-white text-xl font-semibold mb-1">{faq.question}</Text>
                        <Text className="text-zinc-400 text-base font-medium">{faq.answer}</Text>
                    </View>
                ))}

                <Text className="text-center text-zinc-500 mt-10 text-sm">
                    © {new Date().getFullYear()} Tiffin Wala. All rights reserved.
                </Text>
            </ScrollView>
        </View>
    );
};

export default FaqScreen;
