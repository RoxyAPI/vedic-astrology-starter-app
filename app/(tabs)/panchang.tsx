/** @jsxImportSource nativewind */
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, useColorScheme } from "react-native";
import { astrologyApi } from "../../src/api";
import type { PanchangResponse } from "../../src/api/types";
import { appColors } from "../../src/constants/colors";

export default function PanchangScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [result, setResult] = useState<PanchangResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = async () => {
    if (!year || !month || !day || !hour || !latitude || !longitude) {
      setError("Please enter all details");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await astrologyApi.getPanchang({
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
        hour: parseFloat(hour),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      });
      setResult(data);
    } catch (err) {
      setError("Failed to calculate Panchang");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-zinc-950">
      <View className="p-6">
        <Text className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Panchang
        </Text>
        <Text className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Daily Vedic almanac with Tithi, Nakshatra, Yoga, Karana
        </Text>

        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          Year
        </Text>
        <TextInput
          value={year}
          onChangeText={setYear}
          placeholder="2026"
          placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
          keyboardType="numeric"
          className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 mb-4 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
        />

        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          Month
        </Text>
        <TextInput
          value={month}
          onChangeText={setMonth}
          placeholder="1"
          placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
          keyboardType="numeric"
          className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 mb-4 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
        />

        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          Day
        </Text>
        <TextInput
          value={day}
          onChangeText={setDay}
          placeholder="19"
          placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
          keyboardType="numeric"
          className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 mb-4 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
        />

        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          Hour (0-23.99)
        </Text>
        <TextInput
          value={hour}
          onChangeText={setHour}
          placeholder="12"
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
            <Text className="text-white font-semibold text-lg">Calculate Panchang</Text>
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
              Panchang Elements
            </Text>
            
            {/* Tithi */}
            <View className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-200 dark:border-zinc-800">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-sm font-semibold text-orange-600 dark:text-orange-500">TITHI</Text>
                <Text className="text-xs text-zinc-500 dark:text-zinc-400">{result.tithi.paksha} Paksha</Text>
              </View>
              <Text className="text-xl font-bold text-zinc-900 dark:text-white mb-1">
                {result.tithi.name}
              </Text>
              <Text className="text-sm text-zinc-600 dark:text-zinc-400">
                {result.tithi.percent.toFixed(1)}% complete
              </Text>
              {result.tithi.deity && (
                <Text className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                  Deity: {result.tithi.deity} • Element: {result.tithi.element}
                </Text>
              )}
            </View>

            {/* Nakshatra */}
            <View className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-200 dark:border-zinc-800">
              <Text className="text-sm font-semibold text-orange-600 dark:text-orange-500 mb-2">NAKSHATRA</Text>
              <Text className="text-xl font-bold text-zinc-900 dark:text-white mb-1">
                {result.nakshatra.name}
              </Text>
              <Text className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                Lord: {result.nakshatra.lord}
              </Text>
              {result.nakshatra.deity && (
                <Text className="text-xs text-zinc-500 dark:text-zinc-500">
                  {result.nakshatra.deity} • {result.nakshatra.symbol}
                </Text>
              )}
            </View>

            {/* Yoga */}
            <View className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-200 dark:border-zinc-800">
              <Text className="text-sm font-semibold text-orange-600 dark:text-orange-500 mb-2">YOGA</Text>
              <Text className="text-xl font-bold text-zinc-900 dark:text-white mb-1">
                {result.yoga.name}
              </Text>
              {result.yoga.characteristics && (
                <Text className="text-sm text-zinc-600 dark:text-zinc-400">
                  {result.yoga.characteristics}
                </Text>
              )}
            </View>

            {/* Karana */}
            <View className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
              <Text className="text-sm font-semibold text-orange-600 dark:text-orange-500 mb-2">KARANA</Text>
              <Text className="text-xl font-bold text-zinc-900 dark:text-white mb-1">
                {result.karana.name}
              </Text>
              {result.karana.characteristics && (
                <Text className="text-sm text-zinc-600 dark:text-zinc-400">
                  {result.karana.characteristics}
                </Text>
              )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
