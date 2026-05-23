/** @jsxImportSource nativewind */
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, useColorScheme } from "react-native";
import { vedicApi, type CurrentDashaResponse, type City } from "../../src/api";
import { CitySearch } from "../../src/components/CitySearch";
import { appColors } from "../../src/constants/colors";

export default function DashaScreen() {
  const isDark = useColorScheme() === 'dark';

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [city, setCity] = useState<City | null>(null);
  const [result, setResult] = useState<CurrentDashaResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = async () => {
    if (!date || !time || !city) {
      setError("Enter a birth date, time, and city");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await vedicApi.getCurrentDasha({
        date,
        time,
        latitude: city.latitude,
        longitude: city.longitude,
        timezone: city.timezone,
      });
      setResult(data);
    } catch {
      setError("Failed to calculate Dasha periods");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-zinc-950">
      <View className="p-6">
        <Text className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Dasha Periods</Text>
        <Text className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Current Vimshottari Dasha for timing of life events
        </Text>

        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">Birth Date (YYYY-MM-DD)</Text>
        <TextInput
          value={date}
          onChangeText={setDate}
          placeholder="1990-07-04"
          placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
          className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 mb-4 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
        />

        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">Birth Time (HH:MM:SS)</Text>
        <TextInput
          value={time}
          onChangeText={setTime}
          placeholder="10:12:00"
          placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
          className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 mb-4 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
        />

        <CitySearch label="Birth City" selected={city} onSelect={setCity} />

        <TouchableOpacity onPress={calculate} disabled={loading} className="bg-orange-600 rounded-xl py-4 items-center mb-4">
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
            <Text className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Current Dasha Periods</Text>

            <View className="bg-orange-50 dark:bg-orange-950/30 rounded-xl p-4 mb-3 border border-orange-200 dark:border-orange-900">
              <Text className="text-xs font-semibold text-orange-700 dark:text-orange-400 mb-1">MAHADASHA</Text>
              <Text className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{result.mahadasha.planet}</Text>
              <Text className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                {new Date(result.mahadasha.startDate).getFullYear()} - {new Date(result.mahadasha.endDate).getFullYear()} • {result.mahadasha.durationYears} years
              </Text>
              {result.mahadasha.interpretation && (
                <Text className="text-sm text-zinc-700 dark:text-zinc-300">{result.mahadasha.interpretation}</Text>
              )}
            </View>

            <View className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-200 dark:border-zinc-800">
              <Text className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">ANTARDASHA</Text>
              <Text className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{result.antardasha.planet}</Text>
              <Text className="text-sm text-zinc-600 dark:text-zinc-400">
                {new Date(result.antardasha.startDate).toLocaleDateString()} - {new Date(result.antardasha.endDate).toLocaleDateString()}
              </Text>
            </View>

            <View className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
              <Text className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">PRATYANTARDASHA</Text>
              <Text className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{result.pratyantardasha.planet}</Text>
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
