/**
 * Tests for the Vedic data layer. `@roxyapi/sdk` is mocked, so these run offline with no real key. They prove every `vedicApi` method calls the matching SDK method with the spec body shape, unwraps `data`, and turns an SDK `{ error }` result into a thrown message the screens can catch.
 *
 * The mock SDK builds its clients once and returns the same instances from every `createRoxy` call, so the test can grab the same `jest.fn` handles the data layer holds. The factory is self-contained to satisfy the `jest.mock` hoisting rule.
 */

import { createRoxy } from '@roxyapi/sdk';

jest.mock('@roxyapi/sdk', () => {
  const vedicAstrology = {
    generateBirthChart: jest.fn(),
    generateNavamsa: jest.fn(),
    getDetailedPanchang: jest.fn(),
    getCurrentDasha: jest.fn(),
    getMajorDashas: jest.fn(),
    calculateGunMilan: jest.fn(),
    checkManglikDosha: jest.fn(),
    checkKalsarpaDosha: jest.fn(),
    checkSadhesati: jest.fn(),
    getKpRulingPlanets: jest.fn(),
  };
  const location = { searchCities: jest.fn() };
  return { createRoxy: () => ({ vedicAstrology, location }) };
});

import { vedicApi } from './vedic';

const roxy = createRoxy('test-key') as unknown as {
  vedicAstrology: Record<string, jest.Mock>;
  location: Record<string, jest.Mock>;
};
const mockVedic = roxy.vedicAstrology;
const mockLocation = roxy.location;

const ok = <T>(data: T) => ({ data, error: undefined });

const birth = { date: '1990-07-04', time: '10:12:00', latitude: 28.6139, longitude: 77.209, timezone: 'Asia/Kolkata' };

beforeEach(() => {
  for (const fn of [...Object.values(mockVedic), ...Object.values(mockLocation)]) fn.mockReset();
});

describe('vedicApi success paths', () => {
  it('searchCities geocodes and returns the cities array', async () => {
    const cities = [{ city: 'Delhi', country: 'India', latitude: 28.61, longitude: 77.2, timezone: 'Asia/Kolkata' }];
    mockLocation.searchCities.mockResolvedValue(ok({ total: 1, limit: 10, offset: 0, cities }));
    const result = await vedicApi.searchCities('Delhi');
    expect(mockLocation.searchCities).toHaveBeenCalledWith({ query: { q: 'Delhi' } });
    expect(result[0].city).toBe('Delhi');
  });

  it('getBirthChart forwards the birth body and returns the chart', async () => {
    mockVedic.generateBirthChart.mockResolvedValue(ok({ aries: { rashi: 'Mesha', signs: [] } }));
    const chart = await vedicApi.getBirthChart(birth);
    expect(mockVedic.generateBirthChart).toHaveBeenCalledWith({ body: birth });
    expect(chart.aries.rashi).toBe('Mesha');
  });

  it('getNavamsa casts the D9 chart', async () => {
    mockVedic.generateNavamsa.mockResolvedValue(ok({ chart: { meta: {} }, vargottama: [], vargottamaExplanation: '' }));
    await vedicApi.getNavamsa(birth);
    expect(mockVedic.generateNavamsa).toHaveBeenCalledWith({ body: birth });
  });

  it('getPanchang sends date plus location and returns the almanac', async () => {
    mockVedic.getDetailedPanchang.mockResolvedValue(ok({ tithi: { name: 'Pratipada' } }));
    const body = { date: '2026-05-23', latitude: 28.6139, longitude: 77.209, timezone: 'Asia/Kolkata' };
    const panchang = await vedicApi.getPanchang(body);
    expect(mockVedic.getDetailedPanchang).toHaveBeenCalledWith({ body });
    expect(panchang.tithi.name).toBe('Pratipada');
  });

  it('getCurrentDasha returns the running periods', async () => {
    mockVedic.getCurrentDasha.mockResolvedValue(ok({ mahadasha: { planet: 'Venus' } }));
    const dasha = await vedicApi.getCurrentDasha(birth);
    expect(mockVedic.getCurrentDasha).toHaveBeenCalledWith({ body: birth });
    expect(dasha.mahadasha.planet).toBe('Venus');
  });

  it('getMajorDashas returns the 120-year cycle', async () => {
    mockVedic.getMajorDashas.mockResolvedValue(ok({ mahadashas: [], totalYears: 120 }));
    await vedicApi.getMajorDashas(birth);
    expect(mockVedic.getMajorDashas).toHaveBeenCalledWith({ body: birth });
  });

  it('getGunMilan scores two charts', async () => {
    const body = { person1: birth, person2: birth };
    mockVedic.calculateGunMilan.mockResolvedValue(ok({ total: 28, maxScore: 36, isCompatible: true }));
    const milan = await vedicApi.getGunMilan(body);
    expect(mockVedic.calculateGunMilan).toHaveBeenCalledWith({ body });
    expect(milan.total).toBe(28);
  });

  it('checkManglikDosha asks the dosha endpoint', async () => {
    mockVedic.checkManglikDosha.mockResolvedValue(ok({ present: false, description: 'No dosha' }));
    const dosha = await vedicApi.checkManglikDosha(birth);
    expect(mockVedic.checkManglikDosha).toHaveBeenCalledWith({ body: birth });
    expect(dosha.present).toBe(false);
  });

  it('getKpRulingPlanets returns the horary planets', async () => {
    const body = { latitude: 28.6139, longitude: 77.209, timezone: 'Asia/Kolkata' };
    mockVedic.getKpRulingPlanets.mockResolvedValue(ok({ rulingPlanets: ['Venus', 'Mercury'] }));
    const kp = await vedicApi.getKpRulingPlanets(body);
    expect(mockVedic.getKpRulingPlanets).toHaveBeenCalledWith({ body });
    expect(kp.rulingPlanets).toContain('Venus');
  });
});

describe('vedicApi error paths', () => {
  it('throws when the SDK returns an error result', async () => {
    mockVedic.generateBirthChart.mockResolvedValue({ data: undefined, error: { error: 'boom', code: 'internal_error' } });
    await expect(vedicApi.getBirthChart(birth)).rejects.toThrow('Failed to calculate birth chart');
  });

  it('throws when the SDK returns no data', async () => {
    mockLocation.searchCities.mockResolvedValue({ data: undefined, error: undefined });
    await expect(vedicApi.searchCities('Nowhere')).rejects.toThrow('Failed to search cities');
  });
});
