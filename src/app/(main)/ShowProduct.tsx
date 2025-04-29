import { View, Text, Image, StatusBar, SafeAreaView, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity, Linking, TextInput, ActivityIndicator, Animated } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import ShowProductNavigation from '@/src/components/navigation/ShowProductNavigation'
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import BgColor from '@/src/constants/color/BgColor';
import Color from '@/src/constants/color/Color';
import { userContext } from '@/src/utils/context/ContextApi';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import useUserFetchData from '@/src/hooks/profile/useUserFetchData';
import useViewsProductApi from '@/src/hooks/product-api/useViewsProductApi';

const { width } = Dimensions.get('window');
const ShowProduct = () => {
    const { fetchUserData } = useUserFetchData()
    const [currentIndex, setCurrentIndex] = useState(0);
    const { bottomSheetRef, setMainData, mainData } = userContext()
    const [bottomSheetIndex, setBottomSheetIndex] = useState(-1)
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start();
        return () => {
            setMainData(null)
        }
    }, []);

    const openBottomSheet = () => {
        bottomSheetRef.current?.snapToIndex(1)
    }
    const bottomSheetHandleChange = (index: number) => {
        setBottomSheetIndex(index)
    }
    const [mapRegion, setMapRegion] = useState({
        latitude: mainData?.postlatitude ? Number(mainData.postlatitude) : 19.0760,
        longitude: mainData?.postlongitude ? Number(mainData.postlongitude) : 72.8777,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const markerCoordinate = {
        latitude: mainData?.postlatitude ? Number(mainData.postlatitude) : 19.0760,
        longitude: mainData?.postlongitude ? Number(mainData.postlongitude) : 72.8777,
    };

    useEffect(() => {
        if (mainData?.postlatitude && mainData?.postlongitude) {
            setMapRegion({
                latitude: Number(mainData.postlatitude),
                longitude: Number(mainData.postlongitude),
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        }
    }, [mainData]);

    const openGoogleMaps = () => {
        if (markerCoordinate.latitude && markerCoordinate.longitude) {
            const url = `https://www.google.com/maps/search/?api=1&query=${markerCoordinate.latitude},${markerCoordinate.longitude}`;
            Linking.openURL(url);
        }
    };

    const [venderData, setVenderData] = useState<any>(null)
    const { viewsProduct } = useViewsProductApi()

    useEffect(() => {
        viewsProduct(mainData._id)
        fetchUserData(mainData.postVendorId, setVenderData)
        return () => {
            setVenderData(null)
            setMainData(null)
        }
    }, [mainData])

    return (
        <View className='w-full h-full relative bg-black'>
            <StatusBar barStyle="light-content" />
            <SafeAreaView className="flex-1">
                {bottomSheetIndex === -1 && <ShowProductNavigation userId={mainData?.postVendorId} productId={mainData._id} likeData={mainData.productLikes} />}
                <View className="relative">
                    <FlatList
                        horizontal={true}
                        data={mainData.postCoverImage}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        pagingEnabled
                        onMomentumScrollEnd={(event) => {
                            const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                            setCurrentIndex(newIndex);
                        }}
                        renderItem={({ item }) => (
                            <View style={{ width: width }}>
                                <Image
                                    source={{ uri: item }}
                                    style={{ width: width, height: 400 }}
                                    className='rounded-b-[40px]'
                                    resizeMode="cover"
                                />
                                <View className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                            </View>
                        )}
                    />

                    <View className="absolute bottom-4 right-4 bg-black/50 px-4 py-2 rounded-full flex-row items-center gap-2">
                        <Ionicons name="images" size={16} color="white" />
                        <Text className="text-white text-sm font-medium">
                            {currentIndex + 1}/{mainData.postCoverImage.length}
                        </Text>
                    </View>

                    <View className="absolute bottom-4 left-0 right-0 flex-row justify-center items-center gap-2">
                        {mainData.postCoverImage.map((_, index) => (
                            <View
                                key={index}
                                className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === index
                                    ? 'w-8 bg-[#FFD700]'
                                    : 'w-2 bg-white/50'
                                    }`}
                            />
                        ))}
                    </View>
                </View>

                <Animated.ScrollView
                    className='flex-1 px-4 relative'
                    showsVerticalScrollIndicator={false}
                    style={{
                        opacity: fadeAnim,
                        transform: [{ translateY }]
                    }}
                >
                    <View className="mt-6">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-white text-3xl font-bold">{mainData.postTitle}</Text>
                            <View className="flex-row items-center gap-2 bg-black/50 px-4 py-2 rounded-full">
                                <Ionicons name="star" size={20} color="#FFD700" />
                                <Text className="text-white font-semibold">4.5</Text>
                            </View>
                        </View>

                        <View className="mt-6">
                            <Text className="text-white text-xl font-semibold mb-4">Food Types & Pricing</Text>
                            <View className="flex-row flex-wrap gap-3 mb-6">
                                {mainData.postFoodType.map((item: string, index: number) => (
                                    <View key={index} className="bg-zinc-800/50 px-5 py-2.5 rounded-full border border-zinc-700">
                                        <Text className="text-white font-medium">{item}</Text>
                                    </View>
                                ))}
                            </View>
                            <View className="bg-gradient-to-r from-zinc-800 to-zinc-900 p-6 rounded-2xl border border-zinc-700">
                                <View className="flex-row justify-between items-center">
                                    <View>
                                        <Text className="text-zinc-400 text-sm">Monthly Plan</Text>
                                        <Text className="text-white text-2xl font-bold mt-1">₹{mainData.postPrice}</Text>
                                    </View>
                                    <View className="bg-[#FFD700] px-6 py-3 rounded-xl">
                                        <Text className="text-black font-bold">Order Now</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View className="mt-8">
                            <Text className="text-white text-xl font-semibold mb-4">About Product</Text>
                            <Text className="text-zinc-400 leading-6">
                                {mainData.postDescription}
                            </Text>
                        </View>
                    </View>

                    <View className='w-full mt-8'>
                        <Text className='text-white text-2xl font-bold mb-6'>Menu Items</Text>
                        <FlatList
                            data={mainData.postMenu}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View className='mr-6' style={{ width: width * 0.75 }}>
                                    <View className="relative">
                                        <Image
                                            source={{ uri: item.image }}
                                            className='w-full h-56 rounded-3xl'
                                            resizeMode="cover"
                                        />
                                        <View className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-3xl" />
                                        <View className="absolute bottom-4 left-4 right-4">
                                            <Text className='text-white text-xl font-bold'>{item.title}</Text>
                                            {item.description && (
                                                <Text className='text-zinc-300 text-sm mt-1' numberOfLines={2}>
                                                    {item.description}
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                    </View>

                    <View className='w-full mt-8'>
                        <View className="flex-row justify-between items-center mb-4">
                            <View>
                                <Text className='text-white text-2xl font-bold'>Customer Reviews</Text>
                                <View className="flex-row items-center gap-2 mt-2">
                                    <View className="flex-row items-center bg-black/50 px-4 py-2 rounded-full">
                                        <Ionicons name="star" size={20} color="#FFD700" />
                                        <Text className="text-white text-lg font-bold ml-1">4.5</Text>
                                    </View>
                                    <Text className="text-zinc-400">(120 reviews)</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className='w-full my-8'>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={openBottomSheet}
                            className='w-full flex-row gap-3 rounded-3xl flex items-center justify-center py-5 bg-zinc-700'

                        >
                            <Ionicons name="call" size={28} color="orange" />
                            <Text className='text-white text-xl font-bold'>View Contact Details</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.ScrollView>

                <BottomSheet
                    ref={bottomSheetRef}
                    style={{ marginBottom: 80, zIndex: 10 }}
                    snapPoints={['60%']}
                    index={-1}
                    enablePanDownToClose={true}
                    handleStyle={{ backgroundColor: BgColor.Primary }}
                    handleIndicatorStyle={{ backgroundColor: Color.Third }}
                    backgroundStyle={{ backgroundColor: BgColor.Primary }}
                    enableHandlePanningGesture={true}
                    onChange={bottomSheetHandleChange}
                >
                    <BottomSheetScrollView style={styles.contentContainer}>
                        {
                            venderData ? <View className="p-6 z-10">
                                <View className="flex-row items-center gap-4 mb-8">
                                    <View className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#FFD700]">
                                        <Image
                                            source={{ uri: venderData.User_Image }}
                                            className="w-full h-full"
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-white text-2xl font-bold">{venderData.User_Name}</Text>
                                        <View className="flex-row items-center gap-2 mt-2">
                                            <View className="flex-row items-center bg-black/50 px-4 py-2 rounded-full">
                                                <Ionicons name="star" size={18} color="#FFD700" />
                                                <Text className="text-white text-lg font-bold ml-1">4.5</Text>
                                            </View>
                                            <Text className="text-zinc-400">(120 reviews)</Text>
                                        </View>
                                    </View>
                                </View>

                                <View className="flex gap-4 mb-8">
                                    <Text className="text-white text-xl font-bold mb-4">Contact Information</Text>

                                    <View className="flex-row items-center gap-4 bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700">
                                        <View className="w-14 h-14 rounded-full bg-zinc-800 items-center justify-center">
                                            <Ionicons name="call" size={28} color="#FFD700" />
                                        </View>
                                        <View>
                                            <Text className="text-zinc-400 text-sm">Phone Number</Text>
                                            <Text className="text-white text-lg font-semibold">+91 {venderData.User_Phone_Number}</Text>
                                        </View>
                                    </View>

                                    <View className="flex-row items-center gap-4 bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700">
                                        <View className="w-14 h-14 rounded-full bg-zinc-800 items-center justify-center">
                                            <Ionicons name="logo-whatsapp" size={28} color="#FFD700" />
                                        </View>
                                        <View>
                                            <Text className="text-zinc-400 text-sm">WhatsApp</Text>
                                            <Text className="text-white text-lg font-semibold">+91 {venderData.User_Phone_Number}</Text>
                                        </View>
                                    </View>

                                    <View className="flex-row items-center gap-4 bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700">
                                        <View className="w-14 h-14 rounded-full bg-zinc-800 items-center justify-center">
                                            <Ionicons name="mail" size={28} color="#FFD700" />
                                        </View>
                                        <View>
                                            <Text className="text-zinc-400 text-sm">Email</Text>
                                            <Text className="text-white text-lg font-semibold">{venderData.User_Email}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View className="mb-8">
                                    <Text className="text-white text-xl font-bold mb-4">Address</Text>
                                    <View className="bg-zinc-800/50 p-5 rounded-2xl border border-zinc-700">
                                        <Text className="text-white text-lg">{venderData.User_Address?.address}</Text>
                                    </View>
                                </View>

                                <View className="mb-8">
                                    <Text className="text-white text-xl font-bold mb-4">Location</Text>
                                    <TouchableOpacity activeOpacity={0.8} onPress={openGoogleMaps}>
                                        <View className="w-full rounded-3xl overflow-hidden border border-zinc-700">
                                            <MapView
                                                provider={PROVIDER_GOOGLE}
                                                style={styles.map}
                                                scrollEnabled={false}
                                                zoomEnabled={false}
                                                rotateEnabled={false}
                                                pitchEnabled={false}
                                                showsUserLocation={true}
                                                showsMyLocationButton={true}
                                                initialRegion={{
                                                    ...markerCoordinate,
                                                    latitudeDelta: 0.0922,
                                                    longitudeDelta: 0.0421,
                                                }}
                                            >
                                                <Marker
                                                    coordinate={markerCoordinate}
                                                    title="Sai Mess"
                                                    description="Tap to open in Google Maps"
                                                    pinColor="#FFD700"
                                                />
                                            </MapView>
                                            <View className="absolute bottom-4 right-4 bg-black/50 px-4 py-2 rounded-full flex-row items-center gap-2">
                                                <Ionicons name="open-outline" size={18} color="white" />
                                                <Text className="text-white text-sm font-medium">Open in Maps</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View className="w-full flex gap-4">
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => Linking.openURL('tel:+919876543210')}
                                        className="bg-[#FFD700] py-5 rounded-2xl flex-row items-center justify-center gap-3"
                                        style={{
                                            shadowColor: "#FFD700",
                                            shadowOffset: {
                                                width: 0,
                                                height: 4,
                                            },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 4.65,
                                            elevation: 8,
                                        }}
                                    >
                                        <Ionicons name="call" size={28} color="black" />
                                        <Text className="text-black font-bold text-xl">Call Now</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => Linking.openURL('https://wa.me/919876543210')}
                                        className="bg-[#25D366] py-5 rounded-2xl flex-row items-center justify-center gap-3"
                                        style={{
                                            shadowColor: "#25D366",
                                            shadowOffset: {
                                                width: 0,
                                                height: 4,
                                            },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 4.65,
                                            elevation: 8,
                                        }}
                                    >
                                        <Ionicons name="logo-whatsapp" size={28} color="white" />
                                        <Text className="text-white font-bold text-xl">WhatsApp</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> : <View className="flex-1 items-center justify-center">
                                <ActivityIndicator size={'large'} color={"#FFD700"} />
                                <Text className="text-white mt-4 text-lg">Loading contact details...</Text>
                            </View>
                        }
                    </BottomSheetScrollView>
                </BottomSheet>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        zIndex: 10,
    },
    map: {
        height: 400,
        width: width,
        borderRadius: 10
    }
});

export default ShowProduct