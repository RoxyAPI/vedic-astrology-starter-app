import { roxy } from './client';
import type {
  BirthChartRequest,
  BirthChartResponse,
  NavamsaRequest,
  NavamsaResponse,
  CompatibilityRequest,
  CompatibilityResponse,
  ManglikRequest,
  ManglikResponse,
  KalsarpaRequest,
  KalsarpaResponse,
  SadhesatiRequest,
  SadhesatiResponse,
  KpRulingPlanetsResponse,
  GetLocationSearchResponse,
  PostVedicAstrologyPanchangDetailedData,
  PostVedicAstrologyPanchangDetailedResponse,
  PostVedicAstrologyDashaCurrentData,
  PostVedicAstrologyDashaCurrentResponse,
  PostVedicAstrologyDashaMajorData,
  PostVedicAstrologyDashaMajorResponse,
  PostVedicAstrologyKpRulingPlanetsData,
} from '@roxyapi/sdk';

type SdkResult<T> = { data?: T; error?: unknown };

/**
 * Unwrap a Roxy SDK result, returning `data` or throwing a screen-friendly message. The SDK never throws on a non-2xx response: it returns `{ data, error }`, so every call site funnels through here to turn an error into one thrown `Error` the screens can catch.
 */
const unwrap = <T>(result: SdkResult<T>, message: string): T => {
  if (result.error || !result.data) throw new Error(message);
  return result.data;
};

/** Body shapes for the chart and reading calls. Pulled from the SDK request types so the screens cannot drift from the spec. Charts that the SDK exposes a friendly alias for use it; the rest derive the body from the generated request type. */
export type BirthChartRequestBody = BirthChartRequest;
export type NavamsaRequestBody = NavamsaRequest;
export type GunMilanRequestBody = CompatibilityRequest;
export type ManglikRequestBody = ManglikRequest;
export type KalsarpaRequestBody = KalsarpaRequest;
export type SadhesatiRequestBody = SadhesatiRequest;
export type PanchangRequestBody = NonNullable<PostVedicAstrologyPanchangDetailedData['body']>;
export type CurrentDashaRequestBody = NonNullable<PostVedicAstrologyDashaCurrentData['body']>;
export type MajorDashaRequestBody = NonNullable<PostVedicAstrologyDashaMajorData['body']>;
export type KpRulingPlanetsRequestBody = NonNullable<PostVedicAstrologyKpRulingPlanetsData['body']>;

/** One geocoded city as returned by `roxy.location.searchCities`. Feed `latitude`, `longitude`, and `timezone` straight into any chart call. */
export type City = GetLocationSearchResponse['cities'][number];

export const vedicApi = {
  /** Geocode a birth city so the user never types coordinates. `timezone` is the IANA string and can be passed straight into any chart method. */
  searchCities: async (q: string): Promise<City[]> =>
    unwrap(await roxy.location.searchCities({ query: { q } }), 'Failed to search cities').cities,

  /** Vedic kundli (D1 Rashi chart). The top India astrology query and the entry point for every Jyotish product. */
  getBirthChart: async (body: BirthChartRequestBody): Promise<BirthChartResponse> =>
    unwrap(await roxy.vedicAstrology.generateBirthChart({ body }), 'Failed to calculate birth chart'),

  /** Navamsa (D9) divisional chart for marriage and spiritual analysis, with Vargottama detection. */
  getNavamsa: async (body: NavamsaRequestBody): Promise<NavamsaResponse> =>
    unwrap(await roxy.vedicAstrology.generateNavamsa({ body }), 'Failed to calculate Navamsa chart'),

  /** Detailed Panchang: tithi, nakshatra, yoga, karana, Rahu Kaal, and the muhurtas in one call. */
  getPanchang: async (body: PanchangRequestBody): Promise<PostVedicAstrologyPanchangDetailedResponse> =>
    unwrap(await roxy.vedicAstrology.getDetailedPanchang({ body }), 'Failed to calculate Panchang'),

  /** Current Vimshottari Dasha: running Mahadasha, Antardasha, and Pratyantardasha with remaining time. */
  getCurrentDasha: async (body: CurrentDashaRequestBody): Promise<PostVedicAstrologyDashaCurrentResponse> =>
    unwrap(await roxy.vedicAstrology.getCurrentDasha({ body }), 'Failed to calculate current Dasha'),

  /** All nine Mahadashas across the 120-year Vimshottari cycle. */
  getMajorDashas: async (body: MajorDashaRequestBody): Promise<PostVedicAstrologyDashaMajorResponse> =>
    unwrap(await roxy.vedicAstrology.getMajorDashas({ body }), 'Failed to calculate major Dashas'),

  /** Ashtakoota Guna Milan: the 36-point matrimonial compatibility score with a koota breakdown. */
  getGunMilan: async (body: GunMilanRequestBody): Promise<CompatibilityResponse> =>
    unwrap(await roxy.vedicAstrology.calculateGunMilan({ body }), 'Failed to calculate Guna Milan'),

  /** Manglik (Mangal) Dosha: the most-asked matrimonial question in India. */
  checkManglikDosha: async (body: ManglikRequestBody): Promise<ManglikResponse> =>
    unwrap(await roxy.vedicAstrology.checkManglikDosha({ body }), 'Failed to check Manglik Dosha'),

  /** Kalsarpa Dosha detection. */
  checkKalsarpaDosha: async (body: KalsarpaRequestBody): Promise<KalsarpaResponse> =>
    unwrap(await roxy.vedicAstrology.checkKalsarpaDosha({ body }), 'Failed to check Kalsarpa Dosha'),

  /** Sade Sati: the seven-and-a-half-year Saturn transit over the natal Moon. */
  checkSadhesati: async (body: SadhesatiRequestBody): Promise<SadhesatiResponse> =>
    unwrap(await roxy.vedicAstrology.checkSadhesati({ body }), 'Failed to check Sade Sati'),

  /** KP ruling planets: horary answers for real-time "will X happen" questions. */
  getKpRulingPlanets: async (body: KpRulingPlanetsRequestBody): Promise<KpRulingPlanetsResponse> =>
    unwrap(await roxy.vedicAstrology.getKpRulingPlanets({ body }), 'Failed to calculate KP ruling planets'),
};
