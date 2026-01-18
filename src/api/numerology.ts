import { apiClient } from './client';
import type {
  LifePathRequest,
  LifePathResponse,
  ExpressionRequest,
  ExpressionResponse,
  SoulUrgeRequest,
  SoulUrgeResponse,
  PersonalityRequest,
  PersonalityResponse,
  BirthDayRequest,
  BirthDayResponse,
  MaturityRequest,
  MaturityResponse,
  KarmicLessonsRequest,
  KarmicLessonsResponse,
  KarmicDebtRequest,
  KarmicDebtResponse,
  PersonalYearRequest,
  PersonalYearResponse,
  CompatibilityRequest,
  CompatibilityResponse,
  ChartRequest,
  ChartResponse,
  NumberMeaningResponse,
} from './types';

export const numerologyApi = {
  getLifePath: async (params: LifePathRequest): Promise<LifePathResponse> => {
    const { data, error } = await apiClient.POST('/life-path', { body: params });
    if (error) throw new Error('Failed to calculate Life Path number');
    return data;
  },

  getExpression: async (params: ExpressionRequest): Promise<ExpressionResponse> => {
    const { data, error } = await apiClient.POST('/expression', { body: params });
    if (error) throw new Error('Failed to calculate Expression number');
    return data;
  },

  getSoulUrge: async (params: SoulUrgeRequest): Promise<SoulUrgeResponse> => {
    const { data, error } = await apiClient.POST('/soul-urge', { body: params });
    if (error) throw new Error('Failed to calculate Soul Urge number');
    return data;
  },

  getPersonality: async (params: PersonalityRequest): Promise<PersonalityResponse> => {
    const { data, error } = await apiClient.POST('/personality', { body: params });
    if (error) throw new Error('Failed to calculate Personality number');
    return data;
  },

  getBirthDay: async (params: BirthDayRequest): Promise<BirthDayResponse> => {
    const { data, error } = await apiClient.POST('/birth-day', { body: params });
    if (error) throw new Error('Failed to calculate Birth Day number');
    return data;
  },

  getMaturity: async (params: MaturityRequest): Promise<MaturityResponse> => {
    const { data, error } = await apiClient.POST('/maturity', { body: params });
    if (error) throw new Error('Failed to calculate Maturity number');
    return data;
  },

  getKarmicLessons: async (params: KarmicLessonsRequest): Promise<KarmicLessonsResponse> => {
    const { data, error } = await apiClient.POST('/karmic-lessons', { body: params });
    if (error) throw new Error('Failed to analyze Karmic Lessons');
    return data;
  },

  getKarmicDebt: async (params: KarmicDebtRequest): Promise<KarmicDebtResponse> => {
    const { data, error } = await apiClient.POST('/karmic-debt', { body: params });
    if (error) throw new Error('Failed to detect Karmic Debt');
    return data;
  },

  getPersonalYear: async (params: PersonalYearRequest): Promise<PersonalYearResponse> => {
    const { data, error } = await apiClient.POST('/personal-year', { body: params });
    if (error) throw new Error('Failed to calculate Personal Year');
    return data;
  },

  getCompatibility: async (params: CompatibilityRequest): Promise<CompatibilityResponse> => {
    const { data, error } = await apiClient.POST('/compatibility', { body: params });
    if (error) throw new Error('Failed to calculate compatibility');
    return data;
  },

  getChart: async (params: ChartRequest): Promise<ChartResponse> => {
    const { data, error } = await apiClient.POST('/chart', { body: params });
    if (error) throw new Error('Failed to generate numerology chart');
    return data;
  },

  getNumberMeaning: async (number: number): Promise<NumberMeaningResponse> => {
    const { data, error } = await apiClient.GET('/meanings/{number}', {
      params: { path: { number: String(number) } },
    });
    if (error) throw new Error('Failed to fetch number meaning');
    return data;
  },
};
