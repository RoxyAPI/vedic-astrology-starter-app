# Agents Guide

This is a RoxyAPI starter app. A Vedic Jyotish and KP astrology app built with React Native, Expo SDK 54, and TypeScript. Runs on iOS, Android, and Web from one codebase. Demonstrates Kundli, Navamsa, Dasha, Panchang, and Ashtakoota Guna Milan compatibility using the RoxyAPI Vedic Astrology API.

## Setup
- Get an API key at https://roxyapi.com/pricing
- Create `.env` in the project root with:
  - `EXPO_PUBLIC_ROXYAPI_KEY=your_api_key_here`
  - `EXPO_PUBLIC_ROXYAPI_BASE_URL=https://roxyapi.com/api/v2`
- Install with `npm install`
- Run with `npm start`, then `npm run ios`, `npm run android`, or `npm run web`

## How to call RoxyAPI
- Base URL: `https://roxyapi.com/api/v2`
- Auth header: `X-API-Key: <key>`
- Live OpenAPI spec: https://roxyapi.com/api/v2/openapi.json
- Live playground: https://roxyapi.com/api-reference

## Endpoints used in this app
- `GET /vedic-astrology/birth-chart` for the D1 Rashi Kundli with planets, houses, and Ascendant
- `GET /vedic-astrology/navamsa` for the D9 divisional chart
- `GET /vedic-astrology/dasha/current` and related Dasha endpoints for Vimshottari periods
- `GET /vedic-astrology/panchang/detailed` for Tithi, Nakshatra, Yoga, Karana, and Rahu Kaal
- `GET /vedic-astrology/compatibility` for Ashtakoota Guna Milan matching
- `GET /vedic-astrology/kp/chart` and `GET /vedic-astrology/kp/planets` for the Krishnamurti Paddhati system
- Geocode birth locations with `GET /location/search` before chart calls, so users never have to type latitude and longitude

## Where to extend
- `src/api/client.ts` is the API client singleton.
- `src/api/astrology.ts` exports the Vedic and KP methods used by screens.
- `src/api/schema.ts` holds auto generated types from the OpenAPI spec.
- `app/(tabs)/` holds the tab screens: `index.tsx` (Kundli), `navamsa.tsx`, `dasha.tsx`, `panchang.tsx`, `compatibility.tsx`. Add a KP screen here when extending.

## Conventions
- All RoxyAPI calls go through `src/api/`. Do not call `fetch` directly from screens.
- Lahiri ayanamsha is the default for Vedic charts. Confirm the ayanamsha query parameter when adding a new endpoint.
- Verified accuracy claims are cross referenced against NASA JPL Horizons DE441. Never claim the calculation engine is "open source". The public framing is "Roxy Ephemeris".

## Resources
- TypeScript SDK: https://github.com/RoxyAPI/sdk-typescript (npm: `@roxyapi/sdk`)
- Python SDK: https://github.com/RoxyAPI/sdk-python (PyPI: `roxy-sdk`)
- MCP servers: https://roxyapi.com/docs/mcp
- Methodology and accuracy: https://roxyapi.com/methodology
- Open benchmark: https://github.com/RoxyAPI/astrology-api-benchmark
- More starters: https://roxyapi.com/starters
- Pricing: https://roxyapi.com/pricing
