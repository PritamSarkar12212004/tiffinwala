import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native'
import React, { useRef } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from 'expo-router';

const Searhmain = ({ fetchData }): any => {
    const navigation = useNavigation();

    const rotateAnim = useRef(new Animated.Value(0)).current;

    const handleRefresh = () => {
        fetchData()
        rotateAnim.setValue(0);
        Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    const rotate = rotateAnim.interpolate({

        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View className="w-full flex items-center flex-row gap-3 justify-center px-2">
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('SearchPage' as never)}
                className="flex-auto h-16 rounded-3xl bg-zinc-900/60 flex px-5 flex-row items-center gap-3"
            >
                <AntDesign name="search1" size={26} color="gray" />
                <Text className="text-white/40 text-base font-semibold">
                    Mess name, Area name
                </Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={handleRefresh}>
                <Animated.View style={{ transform: [{ rotate }] }}>
                    <Ionicons name="refresh" size={34} color="white" />
                </Animated.View>
            </TouchableOpacity>
            
        </View>
    );
};

export default Searhmain;
