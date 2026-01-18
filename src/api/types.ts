/**
 * Type definitions for RoxyAPI Vedic Astrology API
 * Auto-generated from OpenAPI schema at https://roxyapi.com/api/v2/astrology-vedic/openapi.json
 * 
 * Regenerate with: npm run generate:types
 */

import type { paths, components } from './schema';

// Request types
export type BirthDataRequest = NonNullable<paths['/birth-chart']['post']['requestBody']>['content']['application/json'];
export type NavamsaRequest = NonNullable<paths['/navamsa']['post']['requestBody']>['content']['application/json'];
export type CompatibilityRequest = NonNullable<paths['/compatibility']['post']['requestBody']>['content']['application/json'];
export type PlanetaryPositionsRequest = NonNullable<paths['/planetary-positions']['post']['requestBody']>['content']['application/json'];
export type CurrentDashaRequest = NonNullable<paths['/dasha/current']['post']['requestBody']>['content']['application/json'];
export type MajorDashaRequest = NonNullable<paths['/dasha/major']['post']['requestBody']>['content']['application/json'];
export type PanchangRequest = NonNullable<paths['/panchang/basic']['post']['requestBody']>['content']['application/json'];
export type ManglikDoshaRequest = NonNullable<paths['/dosha/manglik']['post']['requestBody']>['content']['application/json'];
export type KalsarpaDoshaRequest = NonNullable<paths['/dosha/kalsarpa']['post']['requestBody']>['content']['application/json'];
export type SadhesatiRequest = NonNullable<paths['/dosha/sadhesati']['post']['requestBody']>['content']['application/json'];

// Response types
export type BirthChartResponse = paths['/birth-chart']['post']['responses']['200']['content']['application/json'];
export type NavamsaResponse = paths['/navamsa']['post']['responses']['200']['content']['application/json'];
export type CompatibilityResponse = paths['/compatibility']['post']['responses']['200']['content']['application/json'];
export type PlanetaryPositionsResponse = paths['/planetary-positions']['post']['responses']['200']['content']['application/json'];
export type CurrentDashaResponse = paths['/dasha/current']['post']['responses']['200']['content']['application/json'];
export type MajorDashaResponse = paths['/dasha/major']['post']['responses']['200']['content']['application/json'];
export type PanchangResponse = paths['/panchang/basic']['post']['responses']['200']['content']['application/json'];
export type ManglikDoshaResponse = paths['/dosha/manglik']['post']['responses']['200']['content']['application/json'];
export type KalsarpaDoshaResponse = paths['/dosha/kalsarpa']['post']['responses']['200']['content']['application/json'];
export type SadhesatiResponse = paths['/dosha/sadhesati']['post']['responses']['200']['content']['application/json'];
export type YogasListResponse = paths['/yoga']['get']['responses']['200']['content']['application/json'];
export type KPAyanamsaResponse = paths['/kp/ayanamsa']['get']['responses']['200']['content']['application/json'];

// KP Astrology Request/Response types
export type KPPlanetsRequest = NonNullable<paths['/kp/planets']['post']['requestBody']>['content']['application/json'];
export type KPCuspsRequest = NonNullable<paths['/kp/cusps']['post']['requestBody']>['content']['application/json'];
export type KPChartRequest = NonNullable<paths['/kp/chart']['post']['requestBody']>['content']['application/json'];
export type KPPlanetsResponse = paths['/kp/planets']['post']['responses']['200']['content']['application/json'];
export type KPCuspsResponse = paths['/kp/cusps']['post']['responses']['200']['content']['application/json'];
export type KPChartResponse = paths['/kp/chart']['post']['responses']['200']['content']['application/json'];
