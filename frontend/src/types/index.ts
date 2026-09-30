export type Language = 'te' | 'hi' | 'en';

export interface LocationItem {
  resolved_name: string;
  village_or_town?: string;
  village?: string;
  mandal?: string;
  district?: string;
  state?: string;
  country?: string;
  latitude: number;
  longitude: number;
  postal_code?: string;
  pincode?: string;
  location_code?: string;
  provider?: string;
  confidence?: number;
  is_demo?: boolean;
  source?: 'hierarchy' | 'live_gps' | 'search';
  undetermined_note?: string;
}

export interface BusinessIdea {
  slug: string;
  name_en: string;
  name_te: string;
  name_hi: string;
  image?: string;
  description_en?: string;
  description_te?: string;
  description_hi?: string;
}

export interface BusinessCategory {
  slug: string;
  icon: string;
  name_en: string;
  name_te: string;
  name_hi: string;
  description?: string;
  ideas: BusinessIdea[];
}

export interface BusinessProfile {
  business_name: string;
  category_slug: string;
  category_name_en?: string;
  category_name_te?: string;
  category_name_hi?: string;
  confidence?: number;
  raw_input?: string;
  customer_segments?: string[];
  supplier_categories?: string[];
  infrastructure_requirements?: string[];
  relevant_price_indicators?: string[];
}

export interface CompetitorItem {
  osm_id?: string;
  name: string;
  latitude: number;
  longitude: number;
  distance_km: number;
  classification: 'direct' | 'indirect';
  source: string;
  verification_status: string;
  tags?: Record<string, string>;
  address?: string;
}

export interface DistanceBin {
  range: string;
  count: number;
}

export interface CompetitorStats {
  direct_count: number;
  indirect_count: number;
  total_count: number;
  area_sq_km: number;
  competitor_density: number;
  density_label: string;
  nearest_competitor_km?: number | null;
  average_competitor_distance_km?: number | null;
  distance_distribution: DistanceBin[];
  coverage_statement: string;
  direct_competitors: CompetitorItem[];
  indirect_competitors: CompetitorItem[];
  methodology: string;
}

export interface AccessibilityStats {
  accessibility_score: number;
  accessibility_level: string;
  reason: string;
  highway_proximity_score: number;
  transit_connectivity_score: number;
  road_network_score: number;
  traffic_data_status: string;
  source: string;
}

export interface MarketGapStats {
  market_gap_grade: string;
  market_gap_level: string;
  reason: string;
  households_per_competitor_ratio: number;
  methodology: string;
}

export interface OpportunityFactor {
  factor: string;
  weight: number;
  score: number;
}

export interface WhyThisScore {
  positive_drivers: string[];
  caution_factors: string[];
}

export interface OpportunityScoreStats {
  opportunity_score: number;
  opportunity_label: string;
  color_class: string;
  factors: OpportunityFactor[];
  why_this_score?: WhyThisScore;
  disclaimer: string;
  formula: string;
}

export interface ThreatItem {
  title: string;
  level: 'High' | 'Medium' | 'Low';
  category: string;
  reason: string;
}

export interface SwotMatrix {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface ConfidenceDetailItem {
  status: string;
  score: number;
  note: string;
}

export interface DataConfidenceStats {
  overall_confidence: 'High' | 'Medium' | 'Low';
  overall_score: number;
  population_confidence: string;
  competitors_confidence: string;
  price_confidence: string;
  infrastructure_confidence: string;
  details: {
    competitors: ConfidenceDetailItem;
    population: ConfidenceDetailItem;
    prices: ConfidenceDetailItem;
    infrastructure: ConfidenceDetailItem;
  };
  disclaimer: string;
}

export interface PriceIndicatorItem {
  item: string;
  price: string;
  status: 'Verified / Observed' | 'Estimated' | 'Unavailable' | string;
  source: string;
  year?: string;
  geographic_level?: string;
  indicator_type?: string;
}

export interface CensusBaseline {
  district_name: string;
  total_population: number;
  male_population?: number;
  female_population?: number;
  sex_ratio?: number;
  total_households: number;
  population_density_per_sq_km: number;
  literacy_rate_pct?: number;
  male_literacy_pct?: number;
  female_literacy_pct?: number;
  rural_population_pct?: number;
  urban_population_pct?: number;
  main_workers?: number;
  marginal_workers?: number;
  non_workers?: number;
  cultivators_count?: number;
  agri_labourers_count?: number;
  source: string;
  year: string;
  geographic_level: string;
  provider: string;
  notes?: string;
}

export interface DemographicsStats {
  area_sq_km: number;
  estimated_population: number;
  estimated_households: number;
  district_density_per_sq_km: number;
  identified_settlements_count: number;
  settlement_samples?: Array<{ name: string; type: string; distance_km: number }>;
  demographic_status: string;
  data_source: string;
  census_baseline?: CensusBaseline;
  data_provenance?: {
    census_source: string;
    census_year: string;
    census_level: string;
    osm_source: string;
    osm_year: string;
    osm_level: string;
  };
  note: string;
}

export interface WeatherStats {
  avg_temp_c: number;
  max_temp_c: number;
  humidity_percent: number;
  precipitation_mm: number;
  seasonal_risk: string;
  climate_suitability: string;
  source: string;
  status: string;
}

export interface SourcesContract {
  geocoding_source: string;
  competitors_source: string;
  demographics_source: string;
  weather_source: string;
  prices_source: string;
  last_updated: string;
  limitations: string[];
}

export interface DataSourceItem {
  id: string;
  name: string;
  provider: string;
  year: string;
  geographic_level: string;
  status: string;
  indicators: string[];
  description: string;
  official_url: string;
  limitations: string;
}

export interface AiExplanation {
  te: string;
  hi: string;
  en: string;
  selected_language_text: string;
}

export interface BudgetFeasibility {
  margin_capital: number;
  scale_classification: 'Micro Scale' | 'Standard Scale' | 'Commercial Scale' | string;
  recommended_allocation: {
    fixed_setup_equipment_pct: number;
    initial_inventory_stock_pct: number;
    working_capital_buffer_pct: number;
  };
  working_capital_runway: string;
  capital_assessment: string;
}

export interface VillageHierarchyItem {
  village_or_town: string;
  name_te?: string;
  latitude: number;
  longitude: number;
  postal_code?: string;
  location_code?: string;
  is_hq?: boolean;
  is_popular?: boolean;
  resolved_name: string;
}

export interface MandalHierarchyItem {
  mandal: string;
  villages: VillageHierarchyItem[];
}

export interface DistrictHierarchyItem {
  district: string;
  mandals: MandalHierarchyItem[];
}

export interface LocationHierarchyResponse {
  state: string;
  total_districts: number;
  districts: DistrictHierarchyItem[];
}

export interface DataQualityCoverageItem {
  domain: string;
  source: string;
  dataset: string;
  reference_year: string;
  geographic_level: string;
  badge: string;
}

export interface NormalizedIndicatorItem {
  source: string;
  dataset: string;
  referenceYear: number | string;
  geographicLevel: string;
  locationCode: string;
  locationName: string;
  indicator: string;
  value: any;
  unit: string;
  badge: string;
  category: string;
}

export interface OperatingCostIndicators {
  source?: string;
  dataset?: string;
  reference_period?: string;
  geographic_level?: string;
  badge?: string;
  label?: string;
  agri_labour_male_daily_rs?: number;
  agri_labour_female_daily_rs?: number;
  non_agri_labour_daily_rs?: number;
  skilled_mason_daily_rs?: number;
  semi_skilled_helper_daily_rs?: number;
  monthly_ref_labour_cost_2workers_rs?: number;
  cost_context_note?: string;

  reference_daily_wage_agri?: number;
  reference_daily_wage_non_agri?: number;
  reference_daily_wage_construction?: number;
  estimated_monthly_operating_labour_cost_2_workers?: number;
  wage_source?: string;
  wage_reference_period?: string;
  wage_geographic_level?: string;
  labour_note?: string;
}

export interface BusinessLandscape {
  economic_census: {
    source: string;
    dataset: string;
    reference_year: string;
    geographic_level: string;
    badge: string;
    total_establishments: number;
    agricultural_establishments: number;
    non_agricultural_establishments: number;
    own_account_establishments: number;
    establishments_with_hired_workers: number;
    total_employment: number;
    rural_establishments_pct: number;
    urban_establishments_pct: number;
    establishment_density_per_sq_km: number;
    primary_sectors: Array<{ sector: string; share_pct: number }>;
  };
  registered_msmes: {
    source: string;
    dataset: string;
    reference_period: string;
    geographic_level: string;
    badge: string;
    label: string;
    total_registered_msmes: number;
    micro_enterprises: number;
    small_enterprises: number;
    medium_enterprises: number;
    manufacturing_units: number;
    service_units: number;
    trading_units: number;
    registered_msme_density_per_10k_pop: number;
    key_msme_clusters: string[];
  };
}

export interface AnalysisResponse {
  analysis_id: number;
  data_mode?: string;
  is_demo?: boolean;
  margin_capital?: number;
  budget_feasibility?: BudgetFeasibility;
  business: {
    name: string;
    category_slug: string;
    category_name: string;
    customer_segments: string[];
    infrastructure_requirements: string[];
  };
  location: LocationItem;
  radius: {
    radius_km: number;
    area_sq_km: number;
  };
  market_reach: DemographicsStats;
  competitors: CompetitorStats;
  accessibility: AccessibilityStats;
  market_gap: MarketGapStats;
  price_indicators: PriceIndicatorItem[];
  operating_cost_indicators?: OperatingCostIndicators;
  business_landscape?: BusinessLandscape;
  local_snapshot?: CensusBaseline;
  normalized_indicators?: NormalizedIndicatorItem[];
  opportunity_insights?: string[];
  data_quality_coverage?: DataQualityCoverageItem[];
  sector_indicators?: Record<string, any>;
  supporting_infrastructure: {
    accessibility_score: number;
    apmc_market_yards: string[];
    livestock_indicators?: Record<string, any>;
  };
  opportunity_score: OpportunityScoreStats;
  threats: ThreatItem[];
  swot: SwotMatrix;
  data_confidence: DataConfidenceStats;
  weather: WeatherStats;
  ai_explanation: AiExplanation;
  sources: SourcesContract;
  data_sources?: Record<string, any>;
}

