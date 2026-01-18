import { apiClient } from './client';
import type {
  BirthDataRequest,
  NavamsaRequest,
  CompatibilityRequest,
  PlanetaryPositionsRequest,
  CurrentDashaRequest,
  MajorDashaRequest,
  PanchangRequest,
  ManglikDoshaRequest,
  KalsarpaDoshaRequest,
  SadhesatiRequest,
  BirthChartResponse,
  NavamsaResponse,
  CompatibilityResponse,
  PlanetaryPositionsResponse,
  CurrentDashaResponse,
  MajorDashaResponse,
  PanchangResponse,
  ManglikDoshaResponse,
  KalsarpaDoshaResponse,
  SadhesatiResponse,
  YogasListResponse,
  KPAyanamsaResponse,
  KPPlanetsRequest,
  KPCuspsRequest,
  KPChartRequest,
  KPPlanetsResponse,
  KPCuspsResponse,
  KPChartResponse,
} from './types';

export const astrologyApi = {
  // Birth Chart & Divisional Charts
  getBirthChart: async (params: BirthDataRequest): Promise<BirthChartResponse> => {
    const { data, error } = await apiClient.POST('/birth-chart', { body: params });
    if (error) throw new Error('Failed to calculate birth chart');
    return data;
  },

  getNavamsa: async (params: NavamsaRequest): Promise<NavamsaResponse> => {
    const { data, error } = await apiClient.POST('/navamsa', { body: params });
    if (error) throw new Error('Failed to calculate Navamsa chart');
    return data;
  },

  // Planetary Positions
  getPlanetaryPositions: async (params: PlanetaryPositionsRequest): Promise<PlanetaryPositionsResponse> => {
    const { data, error } = await apiClient.POST('/planetary-positions', { body: params });
    if (error) throw new Error('Failed to calculate planetary positions');
    return data;
  },

  // Dasha Periods
  getCurrentDasha: async (params: CurrentDashaRequest): Promise<CurrentDashaResponse> => {
    const { data, error } = await apiClient.POST('/dasha/current', { body: params });
    if (error) throw new Error('Failed to calculate current Dasha');
    return data;
  },

  getMajorDasha: async (params: MajorDashaRequest): Promise<MajorDashaResponse> => {
    const { data, error } = await apiClient.POST('/dasha/major', { body: params });
    if (error) throw new Error('Failed to calculate major Dasha');
    return data;
  },

  // Panchang
  getPanchang: async (params: PanchangRequest): Promise<PanchangResponse> => {
    const { data, error } = await apiClient.POST('/panchang/basic', { body: params });
    if (error) throw new Error('Failed to calculate Panchang');
    return data;
  },

  // Compatibility
  getCompatibility: async (params: CompatibilityRequest): Promise<CompatibilityResponse> => {
    const { data, error } = await apiClient.POST('/compatibility', { body: params });
    if (error) throw new Error('Failed to calculate compatibility');
    return data;
  },

  // Doshas
  getManglikDosha: async (params: ManglikDoshaRequest): Promise<ManglikDoshaResponse> => {
    const { data, error } = await apiClient.POST('/dosha/manglik', { body: params });
    if (error) throw new Error('Failed to check Manglik Dosha');
    return data;
  },

  getKalsarpaDosha: async (params: KalsarpaDoshaRequest): Promise<KalsarpaDoshaResponse> => {
    const { data, error } = await apiClient.POST('/dosha/kalsarpa', { body: params });
    if (error) throw new Error('Failed to check Kalsarpa Dosha');
    return data;
  },

  getSadhesati: async (params: SadhesatiRequest): Promise<SadhesatiResponse> => {
    const { data, error } = await apiClient.POST('/dosha/sadhesati', { body: params });
    if (error) throw new Error('Failed to check Sadhesati');
    return data;
  },

  // Yogas (GET - no params needed)
  getAllYogas: async (): Promise<YogasListResponse> => {
    const { data, error } = await apiClient.GET('/yoga');
    if (error) throw new Error('Failed to fetch yogas list');
    return data;
  },

  // KP Astrology - Get current ayanamsa (GET - optional date param)
  getKPAyanamsa: async (date?: string): Promise<KPAyanamsaResponse> => {
    const { data, error } = await apiClient.GET('/kp/ayanamsa', {
      params: { query: date ? { date } : {} }
    });
    if (error) throw new Error('Failed to fetch KP ayanamsa');
    return data;
  },

  // KP Astrology - Planetary positions with sub-lords
  getKPPlanets: async (params: KPPlanetsRequest): Promise<KPPlanetsResponse> => {
    const { data, error } = await apiClient.POST('/kp/planets', { body: params });
    if (error) throw new Error('Failed to calculate KP planetary positions');
    return data;
  },

  // KP Astrology - House cusps with sub-lords
  getKPCusps: async (params: KPCuspsRequest): Promise<KPCuspsResponse> => {
    const { data, error } = await apiClient.POST('/kp/cusps', { body: params });
    if (error) throw new Error('Failed to calculate KP house cusps');
    return data;
  },

  // KP Astrology - Complete KP chart
  getKPChart: async (params: KPChartRequest): Promise<KPChartResponse> => {
    const { data, error } = await apiClient.POST('/kp/chart', { body: params });
    if (error) throw new Error('Failed to generate KP chart');
    return data;
  },
};
