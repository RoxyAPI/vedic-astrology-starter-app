/** @jsxImportSource nativewind */
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, useColorScheme } from 'react-native';
import { vedicApi, type City } from '../api';
import { appColors } from '../constants/colors';

/**
 * Birth-city picker that geocodes through `roxy.location.searchCities` so the user never types latitude, longitude, or timezone. Pick a result and the parent receives the full {@link City}, whose `latitude`, `longitude`, and `timezone` feed straight into any chart call.
 */
export function CitySearch({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: City | null;
  onSelect: (city: City) => void;
}) {
  const isDark = useColorScheme() === 'dark';
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      setResults(await vedicApi.searchCities(query.trim()));
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">{label}</Text>
      <View className="flex-row gap-2">
        <TextInput
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={search}
          placeholder="Search a city, e.g. Delhi"
          placeholderTextColor={isDark ? appColors.zinc[400] : appColors.gray[400]}
          className="flex-1 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-base bg-white dark:bg-zinc-900"
        />
        <TouchableOpacity onPress={search} disabled={loading} className="bg-orange-600 rounded-xl px-4 justify-center">
          {loading ? (
            <ActivityIndicator color={appColors.white} />
          ) : (
            <Text className="text-white font-semibold">Search</Text>
          )}
        </TouchableOpacity>
      </View>

      {selected && results.length === 0 && (
        <Text className="text-sm text-orange-600 dark:text-orange-500 mt-2">
          {selected.city}, {selected.province ? `${selected.province}, ` : ''}{selected.country}
        </Text>
      )}

      {results.length > 0 && (
        <View className="mt-2 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
          {results.map((city) => (
            <TouchableOpacity
              key={`${city.city}-${city.latitude}-${city.longitude}`}
              onPress={() => {
                onSelect(city);
                setResults([]);
                setQuery(`${city.city}, ${city.country}`);
              }}
              className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900"
            >
              <Text className="text-zinc-900 dark:text-white font-medium">
                {city.city}{city.province ? `, ${city.province}` : ''}
              </Text>
              <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                {city.country} • {city.latitude.toFixed(2)}, {city.longitude.toFixed(2)} • {city.timezone}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
