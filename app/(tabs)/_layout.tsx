import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Star, Globe, Clock, CalendarDays, Heart } from "lucide-react-native";
import { appColors } from "../../src/constants/colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: appColors.primary,
        tabBarInactiveTintColor: appColors.gray[400],
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? appColors.zinc[950] : appColors.white,
          borderTopColor: colorScheme === 'dark' ? appColors.zinc[800] : appColors.gray[200],
        },
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? appColors.zinc[950] : appColors.white,
        },
        headerTintColor: colorScheme === 'dark' ? appColors.white : appColors.zinc[900],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Birth Chart",
          tabBarIcon: ({ color }) => <Star color={String(color)} size={24} />,
        }}
      />
      <Tabs.Screen
        name="navamsa"
        options={{
          title: "Navamsa",
          tabBarIcon: ({ color }) => <Globe color={String(color)} size={24} />,
        }}
      />
      <Tabs.Screen
        name="dasha"
        options={{
          title: "Dasha",
          tabBarIcon: ({ color }) => <Clock color={String(color)} size={24} />,
        }}
      />
      <Tabs.Screen
        name="panchang"
        options={{
          title: "Panchang",
          tabBarIcon: ({ color }) => <CalendarDays color={String(color)} size={24} />,
        }}
      />
      <Tabs.Screen
        name="compatibility"
        options={{
          title: "Matching",
          tabBarIcon: ({ color }) => <Heart color={String(color)} size={24} />,
        }}
      />
    </Tabs>
  );
}
