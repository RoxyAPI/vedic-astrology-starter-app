/** @jsxImportSource nativewind */
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, useColorScheme } from "react-native";
import { astrologyApi } from "../../src/api";
import type { CompatibilityResponse } from "../../src/api/types";
import { appColors } from "../../src/constants/colors";

export default function CompatibilityScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Person 1
  const [date1, setDate1] = useState("");
  const [time1, setTime1] = useState("");
  const [lat1, setLat1] = useState("");
  const [lon1, setLon1] = useState("");
  const [tz1, setTz1] = useState("5.5");
  
  // Person 2
  const [date2, setDate2] = useState("");
  const [time2, setTime2] = useState("");
  const [lat2, setLat2] = useState("");
  const [lon2, setLon2] = useState("");
  const [tz2, setTz2] = useState("5.5");
  
  const [result, setResult] = useState<CompatibilityResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = async () => {
    if (!date1 || !time1 || !lat1 || !lon1 || !date2 || !time2 || !lat2 || !lon2) {
      setError("Please enter all birth details for both people");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await astrologyApi.getCompatibility({
        person1: {
          date: date1,
          time: time1,
          latitude: parseFloat(lat1),
          longitude: parseFloat(lon1),
          timezone: parseFloat(tz1),
        },
        person2: {
          date: date2,
          time: time2,
          latitude: parseFloat(lat2),
          longitude: parseFloat(lon2),
          timezone: parseFloat(tz2),
        },
      });
      setResult(data);
    } catch (err) {
      setError("Failed to calculate compatibility");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-zinc-950">
      <View className="p-6">
        <Text className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Kundli Matching
        </Text>
        <Text className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Ashtakoota Guna Milan compatibility analysis
        </Text>

        {/* Person 1 */}
        <Text className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Person 1</Text>
        
        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">Date (YYYY-MM-DD)</Text>
        <TextInput
          value={date1}
          onChangeText={setDate1}
          placeholder="1990-07-04"
          placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
          className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 mb-3 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
        />

        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">Time (HH:MM:SS)</Text>
        <TextInput
          value={time1}
          onChangeText={setTime1}
          placeholder="10:12:00"
          placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
          className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 mb-3 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
        />

        <View className="flex-row gap-3 mb-4">
          <View className="flex-1">
            <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">Latitude</Text>
            <TextInput
              value={lat1}
              onChangeText={setLat1}
              placeholder="28.6139"
              placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
              keyboardType="numeric"
              className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
            />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">Longitude</Text>
            <TextInput
              value={lon1}
              onChangeText={setLon1}
              placeholder="77.2090"
              placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
              keyboardType="numeric"
              className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
            />
          </View>
        </View>

        {/* Person 2 */}
        <Text className="text-xl font-bold text-zinc-900 dark:text-white mb-4 mt-6">Person 2</Text>
        
        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">Date (YYYY-MM-DD)</Text>
        <TextInput
          value={date2}
          onChangeText={setDate2}
          placeholder="1992-03-15"
          placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
          className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 mb-3 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
        />

        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">Time (HH:MM:SS)</Text>
        <TextInput
          value={time2}
          onChangeText={setTime2}
          placeholder="14:30:00"
          placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
          className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 mb-3 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
        />

        <View className="flex-row gap-3 mb-6">
          <View className="flex-1">
            <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">Latitude</Text>
            <TextInput
              value={lat2}
              onChangeText={setLat2}
              placeholder="19.0760"
              placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
              keyboardType="numeric"
              className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
            />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">Longitude</Text>
            <TextInput
              value={lon2}
              onChangeText={setLon2}
              placeholder="72.8777"
              placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
              keyboardType="numeric"
              className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={calculate}
          disabled={loading}
          className="bg-orange-600 rounded-xl py-4 items-center mb-4"
        >
          {loading ? (
            <ActivityIndicator color={appColors.white} />
          ) : (
            <Text className="text-white font-semibold text-lg">Check Compatibility</Text>
          )}
        </TouchableOpacity>

        {error && (
          <View className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl p-4 mb-4">
            <Text className="text-red-800 dark:text-red-200">{error}</Text>
          </View>
        )}

        {result && (
          <View className="mt-6">
            <View className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20 rounded-2xl p-6 mb-4 border border-orange-200 dark:border-orange-900">
              <Text className="text-center text-5xl font-bold text-orange-600 dark:text-orange-500 mb-2">
                {result.total.toFixed(1)}<Text className="text-2xl text-zinc-500 dark:text-zinc-400">/{result.maxScore}</Text>
              </Text>
              <Text className="text-center text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                {result.percentage.toFixed(1)}% Compatible
              </Text>
              <View className={`mt-3 px-4 py-2 rounded-full ${result.isCompatible ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                <Text className={`text-center font-semibold ${result.isCompatible ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                  {result.isCompatible ? '✓ Good Match' : '✗ Challenging Match'}
                </Text>
              </View>
            </View>
            
            <Text className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
              Ashtakoota Breakdown
            </Text>
            {result.breakdown.map((item: any, index: number) => (
              <View key={index} className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-200 dark:border-zinc-800">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-base font-semibold text-zinc-900 dark:text-white">
                    {item.category}
                  </Text>
                  <Text className="text-lg font-bold text-orange-600 dark:text-orange-500">
                    {item.score}
                  </Text>
                </View>
                <Text className="text-sm text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
