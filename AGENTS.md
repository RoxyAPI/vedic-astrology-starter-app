# Agents Guide

This is a RoxyAPI starter app. A Vedic Jyotish and KP astrology app built with React Native, Expo SDK 54, and TypeScript. Runs on iOS, Android, and Web from one codebase. Ships Kundli (D1), Navamsa (D9), Vimshottari Dasha, detailed Panchang, and Ashtakoota Guna Milan matching, all powered by the RoxyAPI Vedic Astrology API through the official `@roxyapi/sdk`.

## Setup
- Get an API key at https://roxyapi.com/pricing
- Create `.env` in the project root with:
  - `EXPO_PUBLIC_ROXYAPI_KEY=your_api_key_here`
- Install with `npm install`
- Run with `npm start`, then `npm run ios`, `npm run android`, or `npm run web`
- Test with `npm test`, typecheck with `npm run typecheck`

## How it calls RoxyAPI
- The only data layer is `@roxyapi/sdk`. `createRoxy(key)` sets the base URL and the auth header, and ships its own types from the OpenAPI spec, so there is no generated schema file to keep in sync.
- The key is bundled into the app (mobile has no server). Treat `EXPO_PUBLIC_ROXYAPI_KEY` as a public, restricted key locked to your bundle id, or proxy calls through a backend you control.
- Live OpenAPI spec: https://roxyapi.com/api/v2/vedic-astrology/openapi.json
- Live playground: https://roxyapi.com/api-reference

## Endpoints used in this app
- `roxy.location.searchCities` to geocode the birth city before any chart call, so users never type latitude, longitude, or timezone
- `roxy.vedicAstrology.generateBirthChart` for the D1 Rashi Kundli with planets, nakshatras, and pada
- `roxy.vedicAstrology.generateNavamsa` for the D9 divisional chart with Vargottama detection
- `roxy.vedicAstrology.getCurrentDasha` for the running Mahadasha, Antardasha, and Pratyantardasha
- `roxy.vedicAstrology.getDetailedPanchang` for Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, and the muhurtas
- `roxy.vedicAstrology.calculateGunMilan` for Ashtakoota Guna Milan matrimonial matching

The data layer also wraps `getMajorDashas`, `checkManglikDosha`, `checkKalsarpaDosha`, `checkSadhesati`, and `getKpRulingPlanets` so a new screen is one call away.

## Where to extend
- `src/api/client.ts` is the single Roxy SDK client and the `hasApiKey` guard.
- `src/api/vedic.ts` wraps the `roxy.vedicAstrology.*` and `roxy.location.*` methods used by screens and unwraps the SDK `{ data, error }` result.
- `src/api/types.ts` re-exports the SDK response types under app-friendly names.
- `src/components/CitySearch.tsx` is the reusable geocoding picker. Drop it into any new chart screen instead of asking for raw coordinates.
- `app/(tabs)/` holds the tab screens: `index.tsx` (Kundli), `navamsa.tsx`, `dasha.tsx`, `panchang.tsx`, `compatibility.tsx`. Add a KP or dosha screen here when extending.

## Conventions
- All RoxyAPI calls go through `src/api/`. Do not call `fetch` or the SDK directly from screens.
- Method names and body fields come from the SDK types, never invented. Verify against the OpenAPI spec.
- Always geocode with `searchCities` first, then feed `city.latitude`, `city.longitude`, and `city.timezone` into the chart method. `timezone` is the IANA string and the server resolves it to the DST-correct offset for the chart date.
- Lahiri ayanamsha is the default for Vedic charts. Confirm the ayanamsha when adding a new endpoint.
- Verified accuracy claims are cross referenced against NASA JPL Horizons. Never claim the calculation engine is "open source". The public framing is "Roxy Ephemeris".

## Resources
- TypeScript SDK: https://github.com/RoxyAPI/sdk-typescript (npm: `@roxyapi/sdk`)
- Python SDK: https://github.com/RoxyAPI/sdk-python (PyPI: `roxy-sdk`)
- MCP servers: https://roxyapi.com/docs/mcp
- Methodology and accuracy: https://roxyapi.com/methodology
- More starters: https://roxyapi.com/starters
- Pricing: https://roxyapi.com/pricing
