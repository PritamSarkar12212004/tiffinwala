import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import BgColor from '@/src/constants/color/BgColor';

const PromotionAnalytics = () => {
  const screenWidth = Dimensions.get('window').width;

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: BgColor.Secondary,
    backgroundGradientFrom: BgColor.Secondary,
    backgroundGradientTo: BgColor.Secondary,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <ScrollView className="flex-1" style={{ backgroundColor: BgColor.Primary }}>
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4 text-white">Promotion Analytics</Text>
        
        {/* Summary Cards */}
        <View className="flex-row flex-wrap justify-between mb-6">
          <View className="bg-zinc-800 p-4 rounded-lg w-[48%] mb-4">
            <Text className="text-zinc-400 font-semibold">Total Views</Text>
            <Text className="text-2xl font-bold text-white">1,234</Text>
          </View>
          <View className="bg-zinc-800 p-4 rounded-lg w-[48%] mb-4">
            <Text className="text-zinc-400 font-semibold">Engagement Rate</Text>
            <Text className="text-2xl font-bold text-white">45%</Text>
          </View>
          <View className="bg-zinc-800 p-4 rounded-lg w-[48%]">
            <Text className="text-zinc-400 font-semibold">Total Shares</Text>
            <Text className="text-2xl font-bold text-white">89</Text>
          </View>
          <View className="bg-zinc-800 p-4 rounded-lg w-[48%]">
            <Text className="text-zinc-400 font-semibold">Conversion Rate</Text>
            <Text className="text-2xl font-bold text-white">12%</Text>
          </View>
        </View>

        {/* Views Chart */}
        <View className="bg-zinc-800 p-4 rounded-lg shadow-sm mb-6">
          <Text className="text-lg font-semibold mb-4 text-white">Views Over Time</Text>
          <LineChart
            data={data}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        {/* Top Performing Posts */}
        <View className="bg-zinc-800 p-4 rounded-lg shadow-sm">
          <Text className="text-lg font-semibold mb-4 text-white">Top Performing Posts</Text>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity
              key={item}
              className="flex-row items-center justify-between p-3 border-b border-zinc-700"
            >
              <View className="flex-1">
                <Text className="font-medium text-white">Post Title {item}</Text>
                <Text className="text-zinc-400">Posted on {new Date().toLocaleDateString()}</Text>
              </View>
              <View className="items-end">
                <Text className="font-bold text-blue-400">1.2K views</Text>
                <Text className="text-zinc-400">45% engagement</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default PromotionAnalytics; 