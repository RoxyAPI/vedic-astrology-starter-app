/** @jsxImportSource nativewind */
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, useColorScheme } from "react-native";
import { vedicApi, type PanchangResponse, type City } from "../../src/api";
import { CitySearch } from "../../src/components/CitySearch";
import { appColors } from "../../src/constants/colors";

export default function PanchangScreen() {
  const isDark = useColorScheme() === 'dark';

  const [date, setDate] = useState("");
  const [city, setCity] = useState<City | null>(null);
  const [result, setResult] = useState<PanchangResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = async () => {
    if (!date || !city) {
      setError("Enter a date and city");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await vedicApi.getPanchang({
        date,
        latitude: city.latitude,
        longitude: city.longitude,
        timezone: city.timezone,
      });
      setResult(data);
    } catch {
      setError("Failed to calculate Panchang");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-zinc-950">
      <View className="p-6">
        <Text className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Panchang</Text>
        <Text className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Daily Vedic almanac with Tithi, Nakshatra, Yoga, Karana, and Rahu Kaal
        </Text>

        <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">Date (YYYY-MM-DD)</Text>
        <TextInput
          value={date}
          onChangeText={setDate}
          placeholder="2026-05-23"
          placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
          className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 mb-4 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
        />

        <CitySearch label="Location" selected={city} onSelect={setCity} />

        <TouchableOpacity onPress={calculate} disabled={loading} className="bg-orange-600 rounded-xl py-4 items-center mb-4">
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
            <Text className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Panchang Elements</Text>

            <View className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-200 dark:border-zinc-800">
              <View className="flex-row justify-between">
                <Text className="text-sm text-zinc-600 dark:text-zinc-400">Vara: {result.vara.name}</Text>
                <Text className="text-sm text-zinc-600 dark:text-zinc-400">Lord: {result.vara.lord}</Text>
              </View>
              <Text className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                Sunrise {result.sunrise} • Sunset {result.sunset}
              </Text>
            </View>

            <View className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-200 dark:border-zinc-800">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-sm font-semibold text-orange-600 dark:text-orange-500">TITHI</Text>
                <Text className="text-xs text-zinc-500 dark:text-zinc-400">{result.tithi.paksha} Paksha</Text>
              </View>
              <Text className="text-xl font-bold text-zinc-900 dark:text-white mb-1">{result.tithi.name}</Text>
              <Text className="text-sm text-zinc-600 dark:text-zinc-400">{result.tithi.percent.toFixed(1)}% complete</Text>
              {result.tithi.deity && (
                <Text className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">Deity: {result.tithi.deity}</Text>
              )}
            </View>

            <View className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-200 dark:border-zinc-800">
              <Text className="text-sm font-semibold text-orange-600 dark:text-orange-500 mb-2">NAKSHATRA</Text>
              <Text className="text-xl font-bold text-zinc-900 dark:text-white mb-1">{result.nakshatra.name}</Text>
              <Text className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Lord: {result.nakshatra.lord} • Pada {result.nakshatra.pada}</Text>
              {result.nakshatra.deity && (
                <Text className="text-xs text-zinc-500 dark:text-zinc-500">{result.nakshatra.deity} • {result.nakshatra.symbol}</Text>
              )}
            </View>

            <View className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-200 dark:border-zinc-800">
              <Text className="text-sm font-semibold text-orange-600 dark:text-orange-500 mb-2">YOGA</Text>
              <Text className="text-xl font-bold text-zinc-900 dark:text-white mb-1">{result.yoga.name}</Text>
              {result.yoga.characteristics && (
                <Text className="text-sm text-zinc-600 dark:text-zinc-400">{result.yoga.characteristics}</Text>
              )}
            </View>

            <View className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-200 dark:border-zinc-800">
              <Text className="text-sm font-semibold text-orange-600 dark:text-orange-500 mb-2">KARANA</Text>
              <Text className="text-xl font-bold text-zinc-900 dark:text-white mb-1">{result.karana.name}</Text>
              {result.karana.characteristics && (
                <Text className="text-sm text-zinc-600 dark:text-zinc-400">{result.karana.characteristics}</Text>
              )}
            </View>

            <View className="bg-red-50 dark:bg-red-950/20 rounded-xl p-4 border border-red-200 dark:border-red-900">
              <Text className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">RAHU KAAL</Text>
              <Text className="text-base font-bold text-zinc-900 dark:text-white">
                {result.rahuKaal.start} - {result.rahuKaal.end}
              </Text>
              <Text className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                Abhijit Muhurta {result.abhijitMuhurta.start} - {result.abhijitMuhurta.end}
              </Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
