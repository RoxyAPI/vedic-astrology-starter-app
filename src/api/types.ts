/**
 * Vedic astrology response types, re-exported from `@roxyapi/sdk` so the screens import stable app-friendly names without depending on the SDK's path-based type names. The SDK ships these types from the same OpenAPI spec the API serves, so they cannot drift from the live responses.
 */

export type {
  BirthChartResponse,
  NavamsaResponse,
  CompatibilityResponse as GunMilanResponse,
  ManglikResponse,
  KalsarpaResponse,
  SadhesatiResponse,
  KpRulingPlanetsResponse,
  PostVedicAstrologyPanchangDetailedResponse as PanchangResponse,
  PostVedicAstrologyDashaCurrentResponse as CurrentDashaResponse,
  PostVedicAstrologyDashaMajorResponse as MajorDashaResponse,
} from '@roxyapi/sdk';

export type { City } from './vedic';
