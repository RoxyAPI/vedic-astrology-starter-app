# Vedic Astrology Starter App

A fully functional React Native Expo app showcasing the [RoxyAPI Vedic Astrology API](https://roxyapi.com/products/vedic-astrology-api). Production-grade Vedic (Jyotish) and KP astrology with NASA JPL ephemerides. Birth charts (D1/D9), Ashtakoot Gun Milan compatibility, Vimshottari Dasha predictions, dosha detection (Manglik, Kalsarpa, Sadhesati), 300+ planetary yogas, complete Panchang, and KP horary with 249-level sub-lord analysis. Beautiful UI components with dark mode support.

## Screenshots

<p align="center">
  <img src="screenshots/01.jpeg" width="200" />
  <img src="screenshots/02.jpeg" width="200" />
  <img src="screenshots/03.jpeg" width="200" />
  <img src="screenshots/04.jpeg" width="200" />
</p>

## Features

Build a professional Vedic astrology app with essential features:

- **Birth Chart (Kundli)**: Generate complete D1 Rashi chart with all 9 planetary positions plus Ascendant
- **Navamsa Chart (D9)**: Calculate D9 divisional chart for marriage and spiritual insights
- **Dasha Periods**: Vimshottari Dasha, Yogini Dasha, Char Dasha calculations with accurate periods
- **Panchang**: Daily Tithi, Nakshatra, Yoga, Karana calculations with Rahu Kaal timings
- **Compatibility Analysis**: Kundli matching (Ashtakoota) with Guna Milan scores for marriage
- **Planetary Positions**: Real-time graha positions with nakshatra and pada details
- **Dosha Analysis**: Manglik Dosha, Kaal Sarp Dosha detection and remedies
- **Yogas**: Identify auspicious and inauspicious planetary yogas in birth chart
- **Dark Mode Ready**: Automatic light/dark mode support with violet theme
- **Accurate Calculations**: Professional Vedic astrology calculations with Lahiri ayanamsha

## Tech Stack

- **Expo SDK 54** - React Native development platform
- **Expo Router** - File-based navigation with bottom tabs
- **TypeScript** - Type-safe development
- **NativeWind v4** - Tailwind CSS for React Native styling
- **openapi-fetch** - Type-safe API client
- **Lucide Icons** - Beautiful icons for navigation
- **RoxyAPI Vedic Astrology API** - Professional Vedic astrology calculations
- **Auto-generated Types** - TypeScript types from OpenAPI schema

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/RoxyAPI/vedic-astrology-starter-app
cd vedic-astrology-starter-app
npm install
```

### 2. Get Your API Key

Visit [roxyapi.com/pricing](https://roxyapi.com/pricing) to sign up and get your API key. RoxyAPI provides professional Vedic astrology calculations with:

- Birth chart (D1 Rashi chart) generation
- Navamsa chart (D9) and other divisional charts
- Vimshottari Dasha, Yogini Dasha, Char Dasha periods
- Panchang calculations (Tithi, Nakshatra, Yoga, Karana)
- Compatibility analysis with Ashtakoota Guna Milan
- Planetary positions with nakshatra and pada
- Dosha analysis (Manglik, Kaal Sarp)
- Yoga identification in birth charts
- Accurate calculations with Lahiri ayanamsha

### 3. Configure Environment

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_ROXYAPI_KEY=your_api_key_here
EXPO_PUBLIC_ROXYAPI_BASE_URL=https://roxyapi.com/api/v2
```

### 4. Run the App

```bash
# Start Expo development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

## Project Structure

```
vedic-astrology-starter-app/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx           # Birth chart (Kundli) calculator
│   │   ├── navamsa.tsx         # Navamsa (D9) chart
│   │   ├── dasha.tsx           # Dasha period calculations
│   │   ├── panchang.tsx        # Daily Panchang
│   │   └── compatibility.tsx   # Kundli matching
│   └── _layout.tsx
├── src/
│   ├── api/
│   │   ├── client.ts           # API client singleton
│   │   ├── astrology.ts        # Vedic astrology API methods
│   │   ├── schema.ts           # Auto-generated types
│   │   └── types.ts            # Type exports
│   ├── components/
│   │   └── RoxyBranding.tsx    # RoxyAPI branding
│   ├── constants/
│   │   ├── colors.ts           # App color theme
│   │   └── index.ts
│   └── hooks/
│       └── useUserId.ts        # User ID management
└── assets/                     # App icons and images
```
│   └── _layout.tsx             # Root layout
├── src/
│   ├── api/
│   │   ├── client.ts           # API client setup
│   │   ├── numerology.ts       # API methods
│   │   ├── schema.ts           # Generated types from OpenAPI
│   │   └── types.ts            # Type exports
│   ├── components/
│   │   └── RoxyBranding.tsx    # API key setup screen
│   └── constants/
│       └── colors.ts           # Theme colors
├── assets/                     # Logo, icons, images
├── .env                        # Environment variables
└── package.json
```

## API Endpoints

The app provides access to all 17 RoxyAPI Vedic Astrology endpoints via the type-safe API client:

### Birth Charts & Divisional Charts
- `getBirthChart()` - D1 Rashi chart (natal chart)
- `getNavamsa()` - D9 divisional chart (marriage)
- `getPlanetaryPositions()` - Detailed planetary data

### Dasha Timing Systems
- `getCurrentDasha()` - Current Mahadasha/Antardasha/Pratyantardasha
- `getMajorDasha()` - All 9 Mahadashas (120-year cycle)

### Daily Calendar
- `getPanchang()` - Tithi, Nakshatra, Yoga, Karana

### Compatibility
- `getCompatibility()` - Ashtakoota Guna Milan matching

### Dosha Analysis
- `getManglikDosha()` - Mangal Dosha check
- `getKalsarpaDosha()` - Kalsarpa Yoga detection
- `getSadhesati()` - Saturn transit analysis

### Yogas
- `getAllYogas()` - List of 300+ planetary yoga combinations

### KP Astrology (Krishnamurti Paddhati)
- `getKPAyanamsa()` - Current KP-Newcomb ayanamsa value
- `getKPPlanets()` - Planetary positions with sub-lords
- `getKPCusps()` - House cusps with sub-lords  
- `getKPChart()` - Complete KP chart with all calculations

**Usage example:**

```typescript
import { astrologyApi } from './src/api';

// Birth chart
const chart = await astrologyApi.getBirthChart({
  date: '1990-07-04',
  time: '10:12:00',
  latitude: 28.6139,
  longitude: 77.209,
  timezone: 5.5
});

// KP Astrology
const kpChart = await astrologyApi.getKPChart({
  date: '1990-07-04',
  time: '10:12:00',
  latitude: 28.6139,
  longitude: 77.209,
  timezone: 5.5,
  ayanamsa: 'kp-newcomb' // or 'custom' with ayanamsaValue
});

// Dosha checks
const manglik = await astrologyApi.getManglikDosha({ date, time, latitude, longitude, timezone });
const kalsarpa = await astrologyApi.getKalsarpaDosha({ date, time, latitude, longitude, timezone });
```

## Type Safety

The app uses auto-generated TypeScript types from the RoxyAPI OpenAPI schema:

```bash
# Regenerate types when API updates
npm run generate:types
```

Types are automatically generated from:
```
https://roxyapi.com/api/v2/vedic-astrology/openapi.json
```

## Styling

Built with **NativeWind v4** (Tailwind CSS for React Native):

- `className="text-3xl font-bold text-zinc-900 dark:text-white"` - Tailwind classes
- Automatic dark mode with `dark:` prefix
- Orange brand color (`orange-600`)
- Zinc gray scale for text and backgrounds

## Building for Production

### iOS

```bash
eas build --platform ios
```

### Android

```bash
eas build --platform android
```

Requires [Expo Application Services (EAS)](https://expo.dev/eas) account.

## Customization Tips

1. **Add more charts**: The API supports KP System, Chalit chart, and other divisional charts
2. **Enhance UI**: Add chart visualizations with SVG, animations with Reanimated
3. **Save kundlis**: Use AsyncStorage to save user birth charts
4. **Share results**: Add share functionality for birth chart details
5. **Multi-language**: Add i18n for Hindi/Sanskrit terminology
6. **Custom colors**: Modify `src/constants/colors.ts` and Tailwind config

## Learn More

- **Product Page**: [RoxyAPI Vedic Astrology API](https://roxyapi.com/products/vedic-astrology-api)
- **API Documentation**: [roxyapi.com/docs](https://roxyapi.com/docs)
- **OpenAPI Schema**: [vedic-astrology/openapi.json](https://roxyapi.com/api/v2/vedic-astrology/openapi.json)
- **Pricing**: [roxyapi.com/pricing](https://roxyapi.com/pricing)
- **Expo Documentation**: [docs.expo.dev](https://docs.expo.dev)

## Support

- Product Page: [RoxyAPI Vedic Astrology API](https://roxyapi.com/products/vedic-astrology-api)
- API Documentation: [roxyapi.com/docs](https://roxyapi.com/docs)
- Get API Key: [roxyapi.com/pricing](https://roxyapi.com/pricing)

## License

MIT - Feel free to use this starter for your own Vedic astrology app projects.

---

**Built with ❤️ using [RoxyAPI](https://roxyapi.com) - Professional APIs for developers**
