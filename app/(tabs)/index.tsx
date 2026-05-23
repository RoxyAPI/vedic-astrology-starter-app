/** @jsxImportSource nativewind */
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, useColorScheme } from "react-native";
import { vedicApi, type BirthChartResponse, type City } from "../../src/api";
import { CitySearch } from "../../src/components/CitySearch";
import { appColors } from "../../src/constants/colors";

/** The 12 sign keys on a Vedic chart response, in zodiac order. Each holds the planets currently in that rashi. */
const RASHIS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
] as const;

export default function BirthChartScreen() {
  const isDark = useColorScheme() === 'dark';

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [city, setCity] = useState<City | null>(null);
  const [result, setResult] = useState<BirthChartResponse | null>(null);
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
      const data = await vedicApi.getBirthChart({
        date,
        time,
        latitude: city.latitude,
        longitude: city.longitude,
        timezone: city.timezone,
      });
      setResult(data);
    } catch {
      setError("Failed to calculate birth chart");
    } finally {
      setLoading(false);
    }
  };

  const planets = result
    ? RASHIS.flatMap((rashi) =>
        (result[rashi]?.signs ?? []).map((planet) => ({ ...planet, rashi: result[rashi].rashi })),
      )
    : [];

  return (
    <ScrollView className="flex-1 bg-white dark:bg-zinc-950">
      <View className="p-6">
        <Text className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Birth Chart (Kundli)</Text>
        <Text className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Generate your Vedic D1 Rashi chart with planetary positions
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
            <Text className="text-white font-semibold text-lg">Calculate Birth Chart</Text>
          )}
        </TouchableOpacity>

        {error && (
          <View className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl p-4 mb-4">
            <Text className="text-red-800 dark:text-red-200">{error}</Text>
          </View>
        )}

        {planets.length > 0 && (
          <View className="mt-6">
            <Text className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Planetary Positions</Text>
            {planets.map((planet) => (
              <View
                key={`${planet.graha}-${planet.rashi}`}
                className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-3 border border-zinc-200 dark:border-zinc-800"
              >
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-lg font-bold text-zinc-900 dark:text-white">{planet.graha}</Text>
                  <Text className="text-sm font-medium text-orange-600 dark:text-orange-500">{planet.rashi}</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Text className="text-sm text-zinc-600 dark:text-zinc-400">
                    {planet.nakshatra.name} • Pada {planet.nakshatra.pada}
                  </Text>
                  {planet.isRetrograde && (
                    <Text className="text-xs px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-medium">
                      Retro
                    </Text>
                  )}
                </View>
                <Text className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">{planet.longitude.toFixed(2)} deg</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
