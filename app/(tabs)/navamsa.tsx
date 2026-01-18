/** @jsxImportSource nativewind */
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, useColorScheme } from "react-native";
import { astrologyApi } from "../../src/api";
import type { NavamsaResponse } from "../../src/api/types";
import { appColors } from "../../src/constants/colors";

export default function NavamsaScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [timezone, setTimezone] = useState("5.5");
  const [result, setResult] = useState<NavamsaResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = async () => {
    if (!date || !time || !latitude || !longitude) {
      setError("Please enter all birth details");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await astrologyApi.getNavamsa({
        date,
        time,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        timezone: parseFloat(timezone),
      });
      setResult(data);
    } catch (err) {
      setError("Failed to calculate Navamsa chart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-zinc-950">
      <View className="p-6">
        <Text className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Navamsa Chart (D9)
        </Text>
        <Text className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Calculate D9 divisional chart for marriage and spiritual insights
        </Text>

        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          Birth Date (YYYY-MM-DD)
        </Text>
        <TextInput
          value={date}
          onChangeText={setDate}
          placeholder="1990-07-04"
          placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
          className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 mb-4 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
        />

        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          Birth Time (HH:MM:SS)
        </Text>
        <TextInput
          value={time}
          onChangeText={setTime}
          placeholder="10:12:00"
          placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
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
          className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 mb-4 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
        />

        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
          Timezone (hours from UTC)
        </Text>
        <TextInput
          value={timezone}
          onChangeText={setTimezone}
          placeholder="5.5"
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
            <Text className="text-white font-semibold text-lg">Calculate Navamsa</Text>
          )}
        </TouchableOpacity>

        {error && (
          <View className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl p-4 mb-4">
            <Text className="text-red-800 dark:text-red-200">{error}</Text>
          </View>
        )}

        {result && result.chart && typeof result.chart === 'object' && (result.chart as any).meta && (
          <View className="mt-6">
            <Text className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              Navamsa Chart (D9)
            </Text>
            
            {/* Vargottama Planets Badge */}
            {result.vargottama && result.vargottama.length > 0 && (
              <View className="bg-orange-50 dark:bg-orange-950/30 rounded-xl p-4 mb-4 border border-orange-200 dark:border-orange-900">
                <Text className="text-sm font-semibold text-orange-700 dark:text-orange-400 mb-2">
                  🌟 Vargottama Planets
                </Text>
                <Text className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                  {result.vargottama.join(', ')}
                </Text>
                <Text className="text-xs text-zinc-600 dark:text-zinc-400">
                  {result.vargottamaExplanation}
                </Text>
              </View>
            )}

            {/* Table Header */}
            <View className="bg-orange-600 dark:bg-orange-700 rounded-t-xl px-4 py-3">
              <View className="flex-row">
                <Text className="flex-1 text-white font-bold text-sm">Planet</Text>
                <Text className="flex-1 text-white font-bold text-sm">D9 Sign</Text>
                <Text className="flex-1 text-white font-bold text-sm">Nakshatra</Text>
              </View>
            </View>

            {/* Table Rows */}
            {Object.entries((result.chart as any).meta).map(([key, planet]: [string, any], index: number) => (
              <View
                key={key}
                className={`px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 ${
                  index % 2 === 0 
                    ? 'bg-white dark:bg-zinc-900' 
                    : 'bg-zinc-50 dark:bg-zinc-900/50'
                }`}
              >
                <View className="flex-row items-center">
                  <View className="flex-1">
                    <Text className="font-semibold text-zinc-900 dark:text-white">
                      {planet.graha}
                    </Text>
                    {planet.isRetrograde && (
                      <Text className="text-xs text-red-600 dark:text-red-400">℞ Retrograde</Text>
                    )}
                  </View>
                  <View className="flex-1">
                    <Text className="font-medium text-orange-600 dark:text-orange-500">
                      {planet.rashi}
                    </Text>
                    <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                      {planet.longitude.toFixed(2)}°
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm text-zinc-700 dark:text-zinc-300">
                      {planet.nakshatra.name}
                    </Text>
                    <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                      Pada {planet.nakshatra.pada}
                    </Text>
                  </View>
                </View>
              </View>
            ))}

            {/* Table Footer */}
            <View className="bg-zinc-100 dark:bg-zinc-800 rounded-b-xl px-4 py-3">
              <Text className="text-xs text-zinc-600 dark:text-zinc-400 text-center">
                Marriage & Spiritual Chart • D9 Divisional Analysis
              </Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
