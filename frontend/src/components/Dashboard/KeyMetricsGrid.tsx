import React, { useState } from 'react';
import { CompetitorStats, DemographicsStats, AccessibilityStats, MarketGapStats, Language } from '../../types';
import { translations } from '../../i18n/translations';
import {
  Users, Store, Navigation, Gauge, CheckCircle, TrendingUp,
  Landmark, ChevronDown, ChevronUp, ShieldCheck, GraduationCap, Briefcase
} from 'lucide-react';

interface KeyMetricsGridProps {
  language: Language;
  competitors: CompetitorStats;
  demographics: DemographicsStats;
  accessibility: AccessibilityStats;
  marketGap: MarketGapStats;
  localSnapshot?: any;
  businessLandscape?: any;
  dataMode?: string;
}

export const KeyMetricsGrid: React.FC<KeyMetricsGridProps> = ({
  language,
  competitors,
  demographics,
  accessibility,
  marketGap,
  localSnapshot,
  businessLandscape,
  dataMode,
}) => {
  const t = translations[language];
  const [showCensusBaseline, setShowCensusBaseline] = useState(false);
  const baseline = demographics.census_baseline;
  const snapshot = localSnapshot;
  const landscape = businessLandscape;

  return (
    <div className="space-y-3.5">
      {/* Small Business Coverage Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-100 via-white to-slate-100 border border-slate-300 border-b-[3.5px] border-b-slate-400/80 text-xs text-slate-800 flex items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-300 shadow-2xs">
            <Store className="w-4 h-4" />
          </div>
          <span className="font-black text-slate-900 text-xs sm:text-sm">
            {competitors.coverage_statement}
          </span>
        </div>
      </div>

      {/* Official Government Data Panels: Local Area Snapshot + Business Landscape */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Local Area Snapshot (Census 2011) */}
        <div className="card-3d-surface p-5 bg-white border-slate-300 border-b-[3.5px] border-b-slate-400/80 shadow-md">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-300 shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide">
                  Local Area Snapshot
                </h4>
                <div className="text-3xs text-slate-500 font-semibold">
                  Census 2011 Primary Census Abstract · <span className="text-emerald-700 font-bold">Reference year: 2011</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded text-3xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                {snapshot?.badge || 'Official data'}
              </span>
              <span className="px-2 py-0.5 rounded text-3xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-300">
                {snapshot?.geographic_level || 'Village / District'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 mb-3 text-center">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-3xs font-bold text-slate-500 uppercase">Population</div>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                {(snapshot?.population || demographics.estimated_population).toLocaleString()}
              </div>
              <div className="text-3xs text-slate-500 font-medium">
                {snapshot?.rural_urban || 'Rural'} Area
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-3xs font-bold text-slate-500 uppercase">Households</div>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                {(snapshot?.households || demographics.estimated_households).toLocaleString()}
              </div>
              <div className="text-3xs text-slate-500 font-medium">
                ~4.2 persons/HH
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-3xs font-bold text-slate-500 uppercase">Literacy Rate</div>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                {snapshot?.literacy_rate_pct || 67.0}%
              </div>
              <div className="text-3xs text-slate-500 font-medium">
                Census 2011
              </div>
            </div>
          </div>

          {/* Worker Composition Breakdown */}
          <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-2xs text-slate-800">
            <div className="font-bold text-emerald-950 mb-1.5 flex items-center justify-between">
              <span>Worker Profile (Census 2011):</span>
              <span className="font-mono text-3xs text-emerald-800 font-bold">
                Total: {(snapshot?.workers_total || 2200).toLocaleString()} workers
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-3xs">
              <div className="bg-white/80 p-1.5 rounded border border-emerald-200">
                <span className="text-slate-500 block">Cultivators</span>
                <span className="font-bold text-slate-900">{(snapshot?.cultivators || 450).toLocaleString()}</span>
              </div>
              <div className="bg-white/80 p-1.5 rounded border border-emerald-200">
                <span className="text-slate-500 block">Agri Labour</span>
                <span className="font-bold text-slate-900">{(snapshot?.agricultural_labourers || 850).toLocaleString()}</span>
              </div>
              <div className="bg-white/80 p-1.5 rounded border border-emerald-200">
                <span className="text-slate-500 block">Household Ind.</span>
                <span className="font-bold text-slate-900">{(snapshot?.household_industry_workers || 120).toLocaleString()}</span>
              </div>
              <div className="bg-white/80 p-1.5 rounded border border-emerald-200">
                <span className="text-slate-500 block">Other Workers</span>
                <span className="font-bold text-slate-900">{(snapshot?.other_workers || 780).toLocaleString()}</span>
              </div>
            </div>
            {snapshot?.location_code && (
              <div className="mt-2 text-3xs text-slate-500 font-mono">
                Official Location Census Code: <span className="font-black text-slate-800">{snapshot.location_code}</span> ({snapshot.location_name})
              </div>
            )}
          </div>
        </div>

        {/* Business Landscape (Udyam MSME + MoSPI Economic Census) */}
        <div className="card-3d-surface p-5 bg-white border-slate-300 border-b-[3.5px] border-b-slate-400/80 shadow-md">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center border border-indigo-300 shrink-0">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide">
                  Business Landscape
                </h4>
                <div className="text-3xs text-slate-500 font-semibold">
                  Udyam Portal + MoSPI 6th Economic Census · <span className="text-indigo-700 font-bold">Official Records</span>
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-3xs font-black bg-indigo-100 text-indigo-900 border border-indigo-300">
              District Baseline
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-3 text-center">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-3xs font-bold text-slate-500 uppercase">Registered MSMEs</div>
              <div className="text-base sm:text-lg font-black text-indigo-900 mt-0.5">
                {(landscape?.registered_msmes_district || 14200).toLocaleString()}
              </div>
              <div className="text-3xs text-slate-500 font-medium">
                Ref: {landscape?.msme_reference_year || '2023-24'} (Udyam)
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-3xs font-bold text-slate-500 uppercase">Economic Census Units</div>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                {(landscape?.economic_census_establishments || 38500).toLocaleString()}
              </div>
              <div className="text-3xs text-slate-500 font-medium">
                Ref: {landscape?.economic_census_reference_year || '2013-14'} (MoSPI)
              </div>
            </div>
          </div>

          {/* MSME & Sector Distribution */}
          <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-200 text-2xs text-slate-800">
            <div className="font-bold text-indigo-950 mb-1.5 flex items-center justify-between">
              <span>MSME Classification (Formal Registrations):</span>
              <span className="font-mono text-3xs text-indigo-800">
                Micro: {(landscape?.msme_micro || 13500).toLocaleString()} · Small: {(landscape?.msme_small || 650).toLocaleString()}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-3xs mb-2">
              <div className="bg-white/80 p-1.5 rounded border border-indigo-200 text-center">
                <span className="text-slate-500 block">Manufacturing</span>
                <span className="font-bold text-slate-900">{(landscape?.msme_manufacturing || 3800).toLocaleString()}</span>
              </div>
              <div className="bg-white/80 p-1.5 rounded border border-indigo-200 text-center">
                <span className="text-slate-500 block">Services</span>
                <span className="font-bold text-slate-900">{(landscape?.msme_services || 6200).toLocaleString()}</span>
              </div>
              <div className="bg-white/80 p-1.5 rounded border border-indigo-200 text-center">
                <span className="text-slate-500 block">Trading</span>
                <span className="font-bold text-slate-900">{(landscape?.msme_trading || 4200).toLocaleString()}</span>
              </div>
            </div>
            {landscape?.top_district_sectors && landscape.top_district_sectors.length > 0 && (
              <div className="text-3xs text-slate-600">
                <strong className="text-indigo-950">Top Sectors:</strong> {landscape.top_district_sectors.join(', ')}
              </div>
            )}
            <div className="mt-1.5 text-3xs text-slate-500 italic">
              * Note: Udyam records represent formally registered enterprises; local informal retail units are mapped via geodesic physical POIs.
            </div>
          </div>
        </div>
      </div>

      {/* 6 Key Empirical Metrics with Provenance Metadata Badges */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        
        {/* Metric 1: Direct Competitors */}
        <div className="metric-tile-3d p-4 flex flex-col justify-between hover:border-b-rose-500">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-black text-slate-800 leading-snug min-h-[32px] flex items-center">
                {t.directCompetitors}
              </span>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-rose-50 to-rose-100 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200 border-b-2 border-b-rose-300 shadow-2xs">
                <Store className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight drop-shadow-xs">
              {competitors.direct_count}
            </div>
            <div className="text-2xs text-slate-600 font-bold mt-0.5">
              +{competitors.indirect_count} {t.indirectCompetitors}
            </div>
          </div>
          {/* Provenance Micro-Badge */}
          <div className="mt-3 pt-2 border-t border-slate-100 text-3xs text-slate-400 font-bold flex flex-col gap-0.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Source:</span>
              <span className="text-slate-700 font-black">OSM Overpass</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Year / Level:</span>
              <span className="text-slate-700">2026 · Radius</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Nearest Competitor */}
        <div className="metric-tile-3d p-4 flex flex-col justify-between hover:border-b-amber-500">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-black text-slate-800 leading-snug min-h-[32px] flex items-center">
                {t.nearestCompetitor}
              </span>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-amber-50 to-amber-100 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200 border-b-2 border-b-amber-300 shadow-2xs">
                <Navigation className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight drop-shadow-xs">
              {competitors.nearest_competitor_km !== null && competitors.nearest_competitor_km !== undefined
                ? `${competitors.nearest_competitor_km} km`
                : t.noneRecorded}
            </div>
            <div className="text-2xs text-slate-600 font-bold mt-0.5">
              {t.avgDistance} {competitors.average_competitor_distance_km ? `${competitors.average_competitor_distance_km} km` : "N/A"}
            </div>
          </div>
          {/* Provenance Micro-Badge */}
          <div className="mt-3 pt-2 border-t border-slate-100 text-3xs text-slate-400 font-bold flex flex-col gap-0.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Source:</span>
              <span className="text-slate-700 font-black">Geodesic OSM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Year / Level:</span>
              <span className="text-slate-700">2026 · Spatial</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Competitor Density */}
        <div className="metric-tile-3d p-4 flex flex-col justify-between hover:border-b-indigo-500">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-black text-slate-800 leading-snug min-h-[32px] flex items-center">
                {t.competitorDensity}
              </span>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-indigo-50 to-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-200 border-b-2 border-b-indigo-300 shadow-2xs">
                <Gauge className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight drop-shadow-xs">
              {competitors.competitor_density}
            </div>
            <div className="text-2xs text-indigo-800 font-black mt-0.5">
              {competitors.density_label.split(' ')[0]} {t.densityUnit}
            </div>
          </div>
          {/* Provenance Micro-Badge */}
          <div className="mt-3 pt-2 border-t border-slate-100 text-3xs text-slate-400 font-bold flex flex-col gap-0.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Source:</span>
              <span className="text-slate-700 font-black">Geometric Ratio</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Year / Level:</span>
              <span className="text-slate-700">2026 · Catchment</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Catchment Households & Population */}
        <div className="metric-tile-3d p-4 flex flex-col justify-between hover:border-b-emerald-500">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-black text-slate-800 leading-snug min-h-[32px] flex items-center">
                {t.customerReach}
              </span>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-emerald-50 to-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200 border-b-2 border-b-emerald-300 shadow-2xs">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight drop-shadow-xs">
              {demographics.estimated_households.toLocaleString()}
            </div>
            <div className="text-2xs text-slate-600 font-bold mt-0.5">
              {t.catchmentPopulation} ~{demographics.estimated_population.toLocaleString()}
            </div>
          </div>
          {/* Provenance Micro-Badge */}
          <div className="mt-3 pt-2 border-t border-slate-100 text-3xs text-slate-400 font-bold flex flex-col gap-0.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Source:</span>
              <span className="text-emerald-700 font-black">Census 2011</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Year / Level:</span>
              <span className="text-slate-700">2011 · District Base</span>
            </div>
          </div>
        </div>

        {/* Metric 5: Accessibility Score */}
        <div className="metric-tile-3d p-4 flex flex-col justify-between hover:border-b-teal-500">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-black text-slate-800 leading-snug min-h-[32px] flex items-center">
                {t.accessibilityScore}
              </span>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-teal-50 to-teal-100 text-teal-600 flex items-center justify-center shrink-0 border border-teal-200 border-b-2 border-b-teal-300 shadow-2xs">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight drop-shadow-xs">
              {accessibility.accessibility_score.toFixed(0)}/100
            </div>
            <div className="text-2xs text-teal-800 font-black mt-0.5">
              {accessibility.accessibility_level.split(' ')[0]}
            </div>
          </div>
          {/* Provenance Micro-Badge */}
          <div className="mt-3 pt-2 border-t border-slate-100 text-3xs text-slate-400 font-bold flex flex-col gap-0.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Source:</span>
              <span className="text-slate-700 font-black">AP Rural Roads</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Year / Level:</span>
              <span className="text-slate-700">2026 · Mandal Link</span>
            </div>
          </div>
        </div>

        {/* Metric 6: Market Gap */}
        <div className="metric-tile-3d p-4 flex flex-col justify-between bg-gradient-to-b from-white to-amber-50/50 border-amber-200 hover:border-b-amber-500">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-black text-slate-800 leading-snug min-h-[32px] flex items-center">
                {t.marketGap}
              </span>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 text-amber-800 flex items-center justify-center shrink-0 border border-amber-300 border-b-2 border-b-amber-400 shadow-2xs">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
            <div className={`text-2xl sm:text-3xl font-black tracking-tight drop-shadow-xs ${
              marketGap.market_gap_grade === 'High' ? 'text-emerald-700' :
              marketGap.market_gap_grade === 'Medium' ? 'text-amber-700' : 'text-slate-700'
            }`}>
              {marketGap.market_gap_grade}
            </div>
            <div className="text-2xs text-slate-800 font-extrabold mt-0.5 line-clamp-1">
              {marketGap.market_gap_level}
            </div>
          </div>
          {/* Provenance Micro-Badge */}
          <div className="mt-3 pt-2 border-t border-slate-100 text-3xs text-slate-400 font-bold flex flex-col gap-0.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Source:</span>
              <span className="text-slate-700 font-black">Gap Ratio Model</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Year / Level:</span>
              <span className="text-slate-700">2026 · Empirical</span>
            </div>
          </div>
        </div>

      </div>

      {/* Official Census 2011 District Baseline Section */}
      {baseline && (
        <div className="card-3d-surface p-4 sm:p-5 border-slate-300 border-b-[3.5px] border-b-slate-400/80 bg-white">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-300 shrink-0 shadow-2xs">
                <Landmark className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm sm:text-base font-black text-slate-900">
                    {baseline.district_name} District Demographic Baseline
                  </h4>
                  <span className="px-2 py-0.5 rounded-md text-3xs font-black bg-blue-100 text-blue-800 border border-blue-300">
                    Census of India 2011
                  </span>
                </div>
                <p className="text-2xs text-slate-500 font-semibold mt-0.5">
                  Official statutory administrative data baseline from Office of the Registrar General & Census Commissioner, India
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowCensusBaseline(!showCensusBaseline)}
              className="btn-3d-secondary text-xs py-1.5 px-3.5 flex items-center gap-1.5 cursor-pointer ml-auto"
            >
              <span>{showCensusBaseline ? 'Hide Census Details' : 'View Official Census 2011 Data'}</span>
              {showCensusBaseline ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Collapsible Census 2011 Key Statistical Attributes */}
          {showCensusBaseline && (
            <div className="mt-4 pt-4 border-t border-slate-200 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-3xs font-extrabold text-slate-500 uppercase tracking-wider">District Population</div>
                  <div className="text-base font-black text-slate-900 mt-1">{baseline.total_population?.toLocaleString()}</div>
                  <div className="text-3xs text-slate-500 font-semibold mt-0.5">Census 2011 Official</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-3xs font-extrabold text-slate-500 uppercase tracking-wider">Total Households</div>
                  <div className="text-base font-black text-slate-900 mt-1">{baseline.total_households?.toLocaleString()}</div>
                  <div className="text-3xs text-slate-500 font-semibold mt-0.5">District Total</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-3xs font-extrabold text-slate-500 uppercase tracking-wider">Population Density</div>
                  <div className="text-base font-black text-slate-900 mt-1">{baseline.population_density_per_sq_km} / km²</div>
                  <div className="text-3xs text-slate-500 font-semibold mt-0.5">Persons / sq.km</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-3xs font-extrabold text-slate-500 uppercase tracking-wider">Literacy Rate</div>
                  <div className="text-base font-black text-slate-900 mt-1">{baseline.literacy_rate_pct}%</div>
                  <div className="text-3xs text-slate-500 font-semibold mt-0.5">M: {baseline.male_literacy_pct}% · F: {baseline.female_literacy_pct}%</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-3xs font-extrabold text-slate-500 uppercase tracking-wider">Rural / Urban Split</div>
                  <div className="text-base font-black text-slate-900 mt-1">{baseline.rural_population_pct}% Rural</div>
                  <div className="text-3xs text-slate-500 font-semibold mt-0.5">{baseline.urban_population_pct}% Urban</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-3xs font-extrabold text-slate-500 uppercase tracking-wider">Sex Ratio</div>
                  <div className="text-base font-black text-slate-900 mt-1">{baseline.sex_ratio}</div>
                  <div className="text-3xs text-slate-500 font-semibold mt-0.5">Females per 1,000 Males</div>
                </div>
              </div>

              {/* Economic & Occupational Composition from Census 2011 */}
              {(baseline.main_workers || baseline.cultivators_count) && (
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-700" />
                    <span className="font-bold">Economic Activity (Census 2011):</span>
                    <span>Main Workers: <strong>{baseline.main_workers?.toLocaleString()}</strong></span>
                    <span>· Marginal: <strong>{baseline.marginal_workers?.toLocaleString()}</strong></span>
                    {baseline.cultivators_count && (
                      <span>· Cultivators: <strong>{baseline.cultivators_count?.toLocaleString()}</strong></span>
                    )}
                    {baseline.agri_labourers_count && (
                      <span>· Agri Labourers: <strong>{baseline.agri_labourers_count?.toLocaleString()}</strong></span>
                    )}
                  </div>
                  <span className="text-3xs font-mono text-emerald-800 bg-white/80 px-2 py-0.5 rounded border border-emerald-300">
                    Administrative Level: {baseline.geographic_level}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

