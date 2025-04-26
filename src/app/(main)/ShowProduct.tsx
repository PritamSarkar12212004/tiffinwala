import { View, Text, Image, StatusBar, SafeAreaView, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity, Linking, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import ShowProductNavigation from '@/src/components/navigation/ShowProductNavigation'
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import BgColor from '@/src/constants/color/BgColor';
import Color from '@/src/constants/color/Color';
import { userContext } from '@/src/utils/context/ContextApi';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import useUserFetchData from '@/src/hooks/profile/useUserFetchData';

const { width } = Dimensions.get('window');
const ShowProduct = () => {
    const { fetchUserData } = useUserFetchData()
    const [currentIndex, setCurrentIndex] = useState(0);
    const { bottomSheetRef, setMainData, mainData } = userContext()
    const [bottomSheetIndex, setBottomSheetIndex] = useState(-1)
    const openBottomSheet = () => {
        bottomSheetRef.current?.snapToIndex(1)
    }
    const bottomSheetHandleChange = (index: number) => {
        setBottomSheetIndex(index)
    }
    const markerCoordinate = {
        latitude: 19.0760 | mainData?.postlatitude,
        longitude: 72.8777 | mainData?.postlongitude,
    };

    const openGoogleMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${markerCoordinate.latitude},${markerCoordinate.longitude}`;
        Linking.openURL(url);
    };

    const [venderData, setVenderData] = useState<any>(null)


    useEffect(() => {
        fetchUserData(mainData.postVendorId, setVenderData)
        return () => {
            setVenderData(null)
            setMainData(null)
        }
    }, [mainData])
    useEffect(() => {


    }, [bottomSheetIndex])

    return (
        <View className='w-full h-full relative bg-black'>
            <StatusBar barStyle="light-content" />
            <SafeAreaView className="flex-1">
                {bottomSheetIndex === -1 && <ShowProductNavigation />}
                <View className="">
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
                        renderItem={({ item, }) => (
                            <View style={{ width: width }}>
                                <Image
                                    source={{ uri: item }}
                                    style={{ width: width, height: 400 }}
                                    className='rounded-b-[30px]'
                                    resizeMode="cover"
                                />
                            </View>
                        )}
                    />

                    {/* Image Counter */}
                    <View className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-full">
                        <Text className="text-white text-sm">
                            {currentIndex + 1}/{mainData.postCoverImage.length}
                        </Text>
                    </View>

                    <View className="absolute bottom-4 left-0 right-0 flex-row justify-center items-center gap-2">
                        {mainData.postCoverImage.map((_, index) => (
                            <View
                                key={index}
                                className={`h-1 rounded-full transition-all duration-300 ${currentIndex === index
                                    ? 'w-6 bg-white'
                                    : 'w-2 bg-white/50'
                                    }`}
                            />
                        ))}
                    </View>
                </View>

                <ScrollView className='flex-1 px-4 relative' showsVerticalScrollIndicator={false}>
                    <View className="mt-4">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-white text-2xl font-bold">{mainData.postTitle}</Text>
                            <View className="flex-row items-center gap-1">
                                <Ionicons name="star" size={20} color="#FFD700" />
                                <Text className="text-white">4.5</Text>
                            </View>
                        </View>

                        {/* Food Type Section */}
                        <View className="mt-4">
                            <Text className="text-white text-lg font-semibold mb-3">Food Types & Pricing</Text>
                            <View className="flex-row gap-3 mb-4">
                                {mainData.postFoodType.map((item, index) => (
                                    <View key={index} className="bg-zinc-800 px-4 py-2 rounded-full flex-row items-center gap-2">
                                        <View className="w-2 h-2 rounded-full" />
                                        <Text className="text-white">{item}</Text>
                                    </View>
                                ))}
                            </View>
                            <View className="flex-row justify-between bg-zinc-800 p-4 rounded-xl">
                                <View>
                                    <Text className="text-zinc-400 text-sm">Monthly</Text>
                                    <Text className="text-white text-lg">{mainData.postPrice}</Text>
                                </View>

                            </View>
                        </View>

                        <View className="mt-6">
                            <Text className="text-white text-lg font-semibold mb-2">About Product</Text>
                            <Text className="text-zinc-400">
                                {
                                    mainData.postDescription
                                }
                            </Text>
                        </View>
                    </View>

                    {/* Mess Menu Section */}
                    <View className='w-full mt-6'>
                        <Text className='text-white text-lg font-semibold mb-4'>Mess Menu</Text>
                        <FlatList
                            data={mainData.postMenu}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View className='mr-4' style={{ width: width * 0.7 }}>
                                    <Image
                                        source={{ uri: item.image }}
                                        className='w-full h-48 rounded-xl'
                                        resizeMode="cover"
                                    />
                                    <Text className='text-white mt-2 text-lg font-medium'>{item.title}</Text>
                                </View>
                            )}
                        />
                    </View>

                    {/* Reviews Section */}
                    <View className='w-full mt-6'>
                        <View className="flex-row justify-between items-center mb-4">
                            <View>
                                <Text className='text-white text-lg font-semibold'>Reviews</Text>
                                <View className="flex-row items-center gap-2 mt-1">
                                    <View className="flex-row items-center">
                                        <Ionicons name="star" size={20} color="#FFD700" />
                                        <Text className="text-white text-lg font-bold ml-1">4.5</Text>
                                    </View>
                                    <Text className="text-zinc-400">(120 reviews)</Text>
                                </View>
                            </View>
                        </View>

                        {/* Top Reviews Preview */}

                    </View>

                    <View className='w-full mb-6 mt-6 flex items-center justify-center px-5'>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => openBottomSheet()} className='w-full flex-row gap-2 rounded-full flex items-center justify-center py-4' style={{ backgroundColor: BgColor.Secondary }}>
                            <Text className='text-white text-lg font-semibold'>View Contact Details</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

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
                            venderData ? <View className="p-4 z-10">
                                {/* Owner Profile Section */}
                                <View className="flex-row items-center gap-4 mb-6">
                                    <View className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#FFD700]">
                                        <Image
                                            source={{ uri: venderData.User_Image }}
                                            className="w-full h-full"
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-white text-xl font-bold">{venderData.User_Name}</Text>
                                        <View className="flex-row items-center gap-2 mt-1">
                                            <Ionicons name="star" size={16} color="#FFD700" />
                                            <Text className="text-white">4.5 (120 reviews)</Text>
                                        </View>
                                    </View>
                                </View>
                                {/* Contact Information */}
                                <View className="flex gap-2 mb-6">
                                    <Text className="text-white text-lg font-semibold mb-3">Contact Information</Text>

                                    <View className="flex-row items-center gap-3">
                                        <View className="w-12 h-12 rounded-full bg-zinc-800 items-center justify-center">
                                            <Ionicons name="call" size={24} color="#FFD700" />
                                        </View>
                                        <View>
                                            <Text className="text-zinc-400 text-sm">Phone Number</Text>
                                            <Text className="text-white text-lg">+91 {venderData.User_Phone_Number}</Text>
                                        </View>
                                    </View>

                                    <View className="flex-row items-center gap-3">
                                        <View className="w-12 h-12 rounded-full bg-zinc-800 items-center justify-center">
                                            <Ionicons name="logo-whatsapp" size={24} color="#FFD700" />
                                        </View>
                                        <View>
                                            <Text className="text-zinc-400 text-sm">WhatsApp</Text>
                                            <Text className="text-white text-lg">+91 {venderData.User_Phone_Number}</Text>
                                        </View>
                                    </View>

                                    <View className="flex-row items-center gap-3">
                                        <View className="w-12 h-12 rounded-full bg-zinc-800 items-center justify-center">
                                            <Ionicons name="mail" size={24} color="#FFD700" />
                                        </View>
                                        <View>
                                            <Text className="text-zinc-400 text-sm">Email</Text>
                                            <Text className="text-white text-lg">{venderData.User_Email}</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Address Section */}
                                <View className="mb-6">
                                    <Text className="text-white text-lg font-semibold mb-3">Address</Text>
                                    <View className="bg-zinc-800 p-4 rounded-xl">
                                        <Text className="text-white">{venderData.User_Address?.address}</Text>

                                    </View>
                                </View>

                                {/* Map Section */}
                                <View className="mb-6">
                                    <Text className="text-white text-lg font-semibold mb-3">Location</Text>
                                    <TouchableOpacity activeOpacity={0.8} onPress={openGoogleMaps}>
                                        <View className="w-full rounded-3xl overflow-hidden">
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
                                            <View className="absolute bottom-2 right-2 bg-black/50 px-3 py-1 rounded-full flex-row items-center gap-1">
                                                <Ionicons name="open-outline" size={16} color="white" />
                                                <Text className="text-white text-sm">Open in Maps</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                {/* Action Buttons */}
                                <View className="w-full flex gap-4">
                                    <TouchableOpacity activeOpacity={0.8}
                                        onPress={() => Linking.openURL('tel:+919876543210')}
                                        className="bg-[#FFD700] py-4 rounded-xl flex-row items-center justify-center gap-2">
                                        <Ionicons name="call" size={24} color="black" />
                                        <Text className="text-black font-semibold text-lg">Call Now</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={0.8}
                                        onPress={() => Linking.openURL('https://wa.me/919876543210')}
                                        className="bg-[#25D366] py-4 rounded-xl flex-row items-center justify-center gap-2">
                                        <Ionicons name="logo-whatsapp" size={24} color="white" />
                                        <Text className="text-white font-semibold text-lg">WhatsApp</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> : <ActivityIndicator size={'large'} color={"red"} />
                        }
                    </BottomSheetScrollView>
                </BottomSheet>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'grey',
        zIndex: 1,
    },
    contentContainer: {
        flex: 1,
        zIndex: 10,
    },
    map: {
        height: 400,
        width: width,
        borderRadius: 10
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ShowProduct