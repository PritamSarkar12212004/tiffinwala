import { View, Text, Image, StatusBar, SafeAreaView, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity, Linking, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import ShowProductNavigation from '@/src/components/navigation/ShowProductNavigation'
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import BgColor from '@/src/constants/color/BgColor';
import Color from '@/src/constants/color/Color';
import { userContext } from '@/src/utils/context/ContextApi';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get('window');
const ShowProduct = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { bottomSheetRef } = userContext()
    const [bottomSheetIndex, setBottomSheetIndex] = useState(-1)
    const navigation = useNavigation()
    const [comments, setComments] = useState([
        {
            id: 1,
            user: "Rahul Kumar",
            rating: 5,
            text: "Best mess in the area! Food quality is excellent.",
            date: "2 days ago"
        },
        {
            id: 2,
            user: "Priya Singh",
            rating: 4,
            text: "Good food, reasonable prices. Would recommend!",
            date: "1 week ago"
        }
    ]);
    const [newComment, setNewComment] = useState("");
    const [userRating, setUserRating] = useState(5);
    const [showComments, setShowComments] = useState(false);

    const openBottomSheet = () => {
        bottomSheetRef.current?.snapToIndex(1)
    }

    const bottomSheetHandleChange = (index: number) => {
        setBottomSheetIndex(index)
    }

    const data = [
        "https://i.pinimg.com/736x/91/57/fd/9157fd6020803e195c5497b84efd4021.jpg",
        "https://i.pinimg.com/736x/ef/03/c4/ef03c4278c792ec66718322f5493307e.jpg",
        "https://i.pinimg.com/736x/9a/05/56/9a055614844bb211669056131f14d2ef.jpg",
        "https://i.pinimg.com/736x/56/fc/a0/56fca04c5eedebc23902e205fa7419d9.jpg"
    ]

    const menu = [
        {
            name: "Dal bhat ",
            img: "https://i.pinimg.com/736x/2a/8e/57/2a8e57bc82908377e58203bfd9f95e84.jpg"
        },
        {
            name: "Pannir Tikka ",
            img: "https://i.pinimg.com/736x/ae/e1/c5/aee1c5516daa09293fa26bdee5d90d15.jpg"
        },
        {
            name: "Chicken Makhna ",
            img: "https://i.pinimg.com/736x/8c/23/f3/8c23f3cabfaf3aaf1e18ee27edfde5ab.jpg"
        },
    ]

    const foodTypes = [
        { type: "Veg", color: "#4CAF50", price: "₹50" },
        { type: "Non-Veg", color: "#FF6B6B", price: "₹80" },
        { type: "Vegan", color: "#2196F3", price: "₹60" }
    ];

    const pricingInfo = {
        monthly: "₹3000 / Month",
        single: "₹100 / Day",
        oneTime: "₹150 / Plate"
    };

    const markerCoordinate = {
        latitude: 19.0760,
        longitude: 72.8777,
    };

    const openGoogleMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${markerCoordinate.latitude},${markerCoordinate.longitude}`;
        Linking.openURL(url);
    };

    const addComment = () => {
        if (newComment.trim()) {
            const comment = {
                id: comments.length + 1,
                user: "Current User",
                rating: userRating,
                text: newComment.trim(),
                date: "Just now"
            };
            setComments([comment, ...comments]);
            setNewComment("");
        }
    };

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
                        data={data}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item}
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
                                    className='rounded-b-[30px]'
                                    resizeMode="cover"
                                />
                            </View>
                        )}
                    />

                    {/* Image Counter */}
                    <View className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-full">
                        <Text className="text-white text-sm">
                            {currentIndex + 1}/{data.length}
                        </Text>
                    </View>

                    <View className="absolute bottom-4 left-0 right-0 flex-row justify-center items-center gap-2">
                        {data.map((_, index) => (
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
                            <Text className="text-white text-2xl font-bold">Sai Mess</Text>
                            <View className="flex-row items-center gap-1">
                                <Ionicons name="star" size={20} color="#FFD700" />
                                <Text className="text-white">4.5</Text>
                            </View>
                        </View>

                        {/* Food Type Section */}
                        <View className="mt-4">
                            <Text className="text-white text-lg font-semibold mb-3">Food Types & Pricing</Text>
                            <View className="flex-row gap-3 mb-4">
                                {foodTypes.map((item, index) => (
                                    <View key={index} className="bg-zinc-800 px-4 py-2 rounded-full flex-row items-center gap-2">
                                        <View className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                        <Text className="text-white">{item.type}</Text>
                                    </View>
                                ))}
                            </View>
                            <View className="flex-row justify-between bg-zinc-800 p-4 rounded-xl">
                                <View>
                                    <Text className="text-zinc-400 text-sm">Monthly</Text>
                                    <Text className="text-white text-lg">{pricingInfo.monthly}</Text>
                                </View>
                                <View>
                                    <Text className="text-zinc-400 text-sm">Single Day</Text>
                                    <Text className="text-white text-lg">{pricingInfo.single}</Text>
                                </View>
                                <View>
                                    <Text className="text-zinc-400 text-sm">One Time</Text>
                                    <Text className="text-white text-lg">{pricingInfo.oneTime}</Text>
                                </View>
                            </View>
                        </View>

                        <View className="mt-6">
                            <Text className="text-white text-lg font-semibold mb-2">About Product</Text>
                            <Text className="text-zinc-400">
                                This is a detailed description of the product. You can add multiple lines of text here to describe the product features and benefits.
                            </Text>
                        </View>
                    </View>

                    {/* Mess Menu Section */}
                    <View className='w-full mt-6'>
                        <Text className='text-white text-lg font-semibold mb-4'>Mess Menu</Text>
                        <FlatList
                            data={menu}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.name}
                            renderItem={({ item }) => (
                                <View className='mr-4' style={{ width: width * 0.7 }}>
                                    <Image
                                        source={{ uri: item.img }}
                                        className='w-full h-48 rounded-xl'
                                        resizeMode="cover"
                                    />
                                    <Text className='text-white mt-2 text-lg font-medium'>{item.name}</Text>
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
                            <TouchableOpacity
                                onPress={() => navigation.navigate("ProductReviewPage")}
                                className="flex-row items-center gap-2 bg-zinc-800 px-6 py-3 rounded-full border border-zinc-700"
                            >
                                <Text className="text-white font-medium">See Reviews</Text>
                                <Ionicons name="chevron-forward" size={20} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/* Top Reviews Preview */}
                        <View className="flex gap-4">
                            {comments.slice(0, 2).map((comment) => (
                                <View key={comment.id} className="bg-zinc-800 p-4 rounded-xl">
                                    <View className="flex-row justify-between items-center mb-2">
                                        <Text className="text-white font-semibold">{comment.user}</Text>
                                        <Text className="text-zinc-400 text-sm">{comment.date}</Text>
                                    </View>
                                    <View className="flex-row gap-1 mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Ionicons
                                                key={star}
                                                name={star <= comment.rating ? "star" : "star-outline"}
                                                size={16}
                                                color="#FFD700"
                                            />
                                        ))}
                                    </View>
                                    <Text className="text-zinc-300">{comment.text}</Text>
                                </View>
                            ))}
                        </View>
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
                        <View className="p-4 z-10">
                            {/* Owner Profile Section */}
                            <View className="flex-row items-center gap-4 mb-6">
                                <View className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#FFD700]">
                                    <Image
                                        source={{ uri: "https://i.pinimg.com/736x/91/57/fd/9157fd6020803e195c5497b84efd4021.jpg" }}
                                        className="w-full h-full"
                                        resizeMode="cover"
                                    />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-white text-xl font-bold">Rahul Sharma</Text>
                                    <Text className="text-zinc-400">Owner of Sai Mess</Text>
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
                                        <Text className="text-white text-lg">+91 98765 43210</Text>
                                    </View>
                                </View>

                                <View className="flex-row items-center gap-3">
                                    <View className="w-12 h-12 rounded-full bg-zinc-800 items-center justify-center">
                                        <Ionicons name="logo-whatsapp" size={24} color="#FFD700" />
                                    </View>
                                    <View>
                                        <Text className="text-zinc-400 text-sm">WhatsApp</Text>
                                        <Text className="text-white text-lg">+91 98765 43210</Text>
                                    </View>
                                </View>

                                <View className="flex-row items-center gap-3">
                                    <View className="w-12 h-12 rounded-full bg-zinc-800 items-center justify-center">
                                        <Ionicons name="mail" size={24} color="#FFD700" />
                                    </View>
                                    <View>
                                        <Text className="text-zinc-400 text-sm">Email</Text>
                                        <Text className="text-white text-lg">saimess@example.com</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Address Section */}
                            <View className="mb-6">
                                <Text className="text-white text-lg font-semibold mb-3">Address</Text>
                                <View className="bg-zinc-800 p-4 rounded-xl">
                                    <Text className="text-white">123, Main Street</Text>
                                    <Text className="text-white">City Name, State</Text>
                                    <Text className="text-white">Country - PIN Code</Text>
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
                        </View>
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