/** @jsxImportSource nativewind */
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, useColorScheme } from "react-native";
import { astrologyApi } from "../../src/api";
import type { CurrentDashaResponse } from "../../src/api/types";
import { appColors } from "../../src/constants/colors";

export default function DashaScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [result, setResult] = useState<CurrentDashaResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = async () => {
    if (!year || !month || !day || !hour || !latitude || !longitude) {
      setError("Please enter all birth details");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await astrologyApi.getCurrentDasha({
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
        hour: parseFloat(hour),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      });
      setResult(data);
    } catch (err) {
      setError("Failed to calculate Dasha periods");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-zinc-950">
      <View className="p-6">
        <Text className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Dasha Periods
        </Text>
        <Text className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Calculate current Vimshottari Dasha for timing of life events
        </Text>

        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          Birth Year
        </Text>
        <TextInput
          value={year}
          onChangeText={setYear}
          placeholder="1990"
          placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
          keyboardType="numeric"
          className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 mb-4 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
        />

        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          Birth Month
        </Text>
        <TextInput
          value={month}
          onChangeText={setMonth}
          placeholder="7"
          placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
          keyboardType="numeric"
          className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 mb-4 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
        />

        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          Birth Day
        </Text>
        <TextInput
          value={day}
          onChangeText={setDay}
          placeholder="4"
          placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
          keyboardType="numeric"
          className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 mb-4 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
        />

        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          Birth Hour (0-23.99)
        </Text>
        <TextInput
          value={hour}
          onChangeText={setHour}
          placeholder="10.2"
          placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
          keyboardType="numeric"
          className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 mb-4 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
        />

        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          Latitude
        </Text>
        <TextInput
          value={latitude}
          onChangeText={setLatitude}
          placeholder="28.6139"
          placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
          keyboardType="numeric"
          className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 mb-4 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
        />

        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          Longitude
        </Text>
        <TextInput
          value={longitude}
          onChangeText={setLongitude}
          placeholder="77.2090"
          placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
          keyboardType="numeric"
          className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 mb-6 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
        />

        <TouchableOpacity
          onPress={calculate}
          disabled={loading}
          className="bg-orange-600 rounded-xl py-4 items-center mb-4"
        >
          {loading ? (
            <ActivityIndicator color={appColors.white} />
          ) : (
            <Text className="text-white font-semibold text-lg">Calculate Dasha</Text>
          )}
        </TouchableOpacity>

        {error && (
          <View className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl p-4 mb-4">
            <Text className="text-red-800 dark:text-red-200">{error}</Text>
          </View>
        )}

        {result && (
          <View className="mt-6">
            <Text className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              Current Dasha Periods
            </Text>
            
            {/* Mahadasha */}
            <View className="bg-orange-50 dark:bg-orange-950/30 rounded-xl p-4 mb-3 border border-orange-200 dark:border-orange-900">
              <Text className="text-xs font-semibold text-orange-700 dark:text-orange-400 mb-1">MAHADASHA</Text>
              <Text className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                {result.mahadasha.planet}
              </Text>
              <Text className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                {new Date(result.mahadasha.startDate).getFullYear()} - {new Date(result.mahadasha.endDate).getFullYear()} • {result.mahadasha.durationYears} years
              </Text>
              {result.mahadasha.interpretation && (
                <Text className="text-sm text-zinc-700 dark:text-zinc-300">
                  {result.mahadasha.interpretation}
                </Text>
              )}
            </View>

            {/* Antardasha */}
            <View className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-200 dark:border-zinc-800">
              <Text className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">ANTARDASHA</Text>
              <Text className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                {result.antardasha.planet}
              </Text>
              <Text className="text-sm text-zinc-600 dark:text-zinc-400">
                {new Date(result.antardasha.startDate).toLocaleDateString()} - {new Date(result.antardasha.endDate).toLocaleDateString()}
              </Text>
            </View>

            {/* Pratyantardasha */}
            <View className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
              <Text className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">PRATYANTARDASHA</Text>
              <Text className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                {result.pratyantardasha.planet}
              </Text>
              <Text className="text-sm text-zinc-600 dark:text-zinc-400">
                {new Date(result.pratyantardasha.startDate).toLocaleDateString()} - {new Date(result.pratyantardasha.endDate).toLocaleDateString()}
              </Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
