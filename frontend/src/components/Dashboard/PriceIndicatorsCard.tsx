import React from 'react';
import { PriceIndicatorItem, Language, AnalysisResponse } from '../../types';
import { translations } from '../../i18n/translations';
import { Tag, CheckCircle2, HelpCircle, AlertCircle, TrendingUp, DollarSign, Award, Target } from 'lucide-react';

interface PriceIndicatorsCardProps {
  language: Language;
  priceIndicators: PriceIndicatorItem[];
  analysisResult?: AnalysisResponse;
}

export const PriceIndicatorsCard: React.FC<PriceIndicatorsCardProps> = ({
  language,
  priceIndicators,
  analysisResult,
}) => {
  const t = translations[language];

  // Derive strategic pricing guidance based on empirical competition & demographics
  const directCount = analysisResult?.competitors?.direct_count ?? 0;
  const density = analysisResult?.competitors?.competitor_density ?? 0;
  const radiusKm = analysisResult?.radius?.radius_km ?? 10;
  const district = analysisResult?.location?.district ?? 'Andhra Pradesh';

  let strategyTitle = t.pricingCompetitive || 'Competitive Value Pricing';
  let strategyBadgeColor = 'bg-emerald-100 text-emerald-950 border-emerald-300';
  let strategyBasis = `Balanced local competition (${directCount} direct units) supports matching prevailing AP market benchmarks while differentiating on product quality and reliability.`;

  if (directCount >= 5 || density > 2.0) {
    strategyTitle = t.pricingPenetration || 'Penetration Pricing';
    strategyBadgeColor = 'bg-amber-100 text-amber-950 border-amber-300';
    strategyBasis = `Higher competitor presence (${directCount} direct sellers detected) recommends introductory value pricing or loyalty bundles to capture customer share.`;
  } else if (directCount === 0) {
    strategyTitle = t.pricingPremium || 'Quality / Margin Pricing';
    strategyBadgeColor = 'bg-teal-100 text-teal-950 border-teal-300';
    strategyBasis = `Zero direct digital competitors detected within ${radiusKm} km creates an early-mover advantage to command sustainable margins.`;
  }

  const purchasingPowerLabel = analysisResult?.market_reach?.census_baseline?.rural_population_pct && analysisResult.market_reach.census_baseline.rural_population_pct > 60
    ? 'Rural Agrarian / Steady Agricultural Cash Flow'
    : 'Semi-Urban / Mixed Commercial Purchasing Power';

  return (
    <div className="card-3d-surface p-6 sm:p-7 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 text-amber-800 flex items-center justify-center border border-amber-300 border-b-2 border-b-amber-400 shadow-2xs">
            <Tag className="w-5 h-5 drop-shadow-xs" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              {t.pricingStrategyHeading || 'Product Market Value & Suggested Pricing Strategy'}
            </h3>
            <p className="text-2xs sm:text-xs text-slate-500 font-semibold">
              {t.pricingStrategySub || 'Pricing approach based on local purchasing power, competitor density, and AP market benchmarks'}
            </p>
          </div>
        </div>
        <span className="badge-3d text-xs font-black px-3.5 py-1 bg-amber-100 text-amber-950 border border-amber-300 self-start sm:self-auto">
          {t.priceBadge}
        </span>
      </div>

      {/* Suggested Pricing Strategy & Purchasing Power Block (SIH Requirement) */}
      <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div className="p-4 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 border-b-[3px] border-slate-300 shadow-2xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-2xs uppercase tracking-wider font-black text-slate-500 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-emerald-600" />
              {t.suggestedStrategy || 'Suggested Pricing Strategy'}
            </span>
            <span className={`badge-3d text-2xs font-black px-2.5 py-0.5 border ${strategyBadgeColor}`}>
              {strategyTitle}
            </span>
          </div>
          <p className="text-xs text-slate-700 font-semibold leading-relaxed">
            {strategyBasis}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 border-b-[3px] border-slate-300 shadow-2xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-2xs uppercase tracking-wider font-black text-slate-500 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
              {t.purchasingPower || 'Local Purchasing Power'}
            </span>
            <span className="badge-3d text-2xs font-black px-2.5 py-0.5 bg-teal-50 text-teal-900 border border-teal-300">
              {district} Catchment
            </span>
          </div>
          <p className="text-xs text-slate-700 font-semibold leading-relaxed">
            <span className="text-slate-900 font-black">{purchasingPowerLabel}.</span> Consumer willingness-to-pay aligns with everyday essential pricing benchmarks.
          </p>
        </div>
      </div>

      {/* Operating Cost Indicators: Reference Wages (DES AP) & 2-Worker Feasibility */}
      {analysisResult?.operating_cost_indicators && (
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-teal-50/70 via-white to-emerald-50/70 border border-teal-200 border-b-[3.5px] border-b-teal-300 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center border border-teal-300 shrink-0">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide">
                  Operating Cost Indicators (Rural Labour Wages)
                </h4>
                <div className="text-3xs text-slate-500 font-semibold">
                  Source: {analysisResult.operating_cost_indicators.source || analysisResult.operating_cost_indicators.wage_source || 'Directorate of Economics & Statistics (DES), Govt of AP'} · <span className="text-teal-800 font-bold">Reference Period: {analysisResult.operating_cost_indicators.reference_period || analysisResult.operating_cost_indicators.wage_reference_period || '2023-24'}</span>
                </div>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded text-3xs font-black bg-teal-100 text-teal-900 border border-teal-300 self-start sm:self-auto">
              Reference Wage Benchmark
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3 text-center">
            <div className="p-2.5 rounded-xl bg-white border border-teal-200 shadow-2xs">
              <div className="text-3xs font-bold text-slate-500 uppercase">Agri Labour Wage</div>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                ₹{analysisResult.operating_cost_indicators.agri_labour_male_daily_rs || analysisResult.operating_cost_indicators.reference_daily_wage_agri || 420}
              </div>
              <div className="text-3xs text-teal-700 font-semibold">/ day (reference)</div>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-teal-200 shadow-2xs">
              <div className="text-3xs font-bold text-slate-500 uppercase">Non-Agri Labour</div>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                ₹{analysisResult.operating_cost_indicators.non_agri_labour_daily_rs || analysisResult.operating_cost_indicators.reference_daily_wage_non_agri || 480}
              </div>
              <div className="text-3xs text-teal-700 font-semibold">/ day (reference)</div>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-teal-200 shadow-2xs">
              <div className="text-3xs font-bold text-slate-500 uppercase">Semi-Skilled / Tech</div>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                ₹{analysisResult.operating_cost_indicators.semi_skilled_helper_daily_rs || analysisResult.operating_cost_indicators.reference_daily_wage_construction || 510}
              </div>
              <div className="text-3xs text-teal-700 font-semibold">/ day (reference)</div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 shadow-2xs">
              <div className="text-3xs font-bold text-emerald-800 uppercase">2-Worker Monthly Cost</div>
              <div className="text-base sm:text-lg font-black text-emerald-900 mt-0.5">
                ₹{(analysisResult.operating_cost_indicators.monthly_ref_labour_cost_2workers_rs || analysisResult.operating_cost_indicators.estimated_monthly_operating_labour_cost_2_workers || 25000).toLocaleString()}
              </div>
              <div className="text-3xs text-emerald-700 font-semibold">est. monthly operating</div>
            </div>
          </div>

          <p className="text-3xs text-slate-600 italic">
            * <strong>Notice:</strong> Values shown are official DES AP "Reference wage" benchmarks for operational cost feasibility planning. They are strictly distinguished from guaranteed individual contracts or salaries.
          </p>
        </div>
      )}

      {/* Observed Commodity & Input Prices Header Note */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <h4 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wide">
          Observed Commodity & Input Prices
        </h4>
        <span className="text-3xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-300">
          Clearly distinguished: "Observed price" vs "Estimated revenue"
        </span>
      </div>

      {priceIndicators && priceIndicators.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-slate-300 border-b-[3px] border-slate-300 shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-extrabold uppercase tracking-wider text-2xs">
                <th className="py-3 px-4">{t.tableItem}</th>
                <th className="py-3 px-4">Observed Price</th>
                <th className="py-3 px-4">{t.tableStatus}</th>
                <th className="py-3 px-4">{t.tableSource}</th>
                <th className="py-3 px-4">Year & Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {priceIndicators.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{item.item}</div>
                    {item.indicator_type && (
                      <span className="text-3xs font-mono text-slate-400 font-bold uppercase">{item.indicator_type}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-black text-emerald-700 text-sm">
                    {item.price}
                    <div className="text-3xs text-slate-400 font-normal">Observed price</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-2xs font-extrabold border ${
                        item.status?.includes('Verified') || item.status?.includes('Benchmark') || item.status?.includes('Official')
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : item.status === 'Estimated'
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-slate-100 text-slate-600 border-slate-300'
                      }`}
                    >
                      {(item.status?.includes('Verified') || item.status?.includes('Benchmark') || item.status?.includes('Official')) ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : item.status === 'Estimated' ? (
                        <HelpCircle className="w-3 h-3 text-amber-600" />
                      ) : (
                        <AlertCircle className="w-3 h-3 text-slate-400" />
                      )}
                      <span>{item.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 text-xs font-semibold">
                    {item.source}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-2xs font-medium">
                    <div className="font-bold text-slate-800">{item.year || '2024-25'}</div>
                    <div className="text-slate-400">{item.geographic_level || 'District / Mandi'}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-6 text-slate-500 text-xs sm:text-sm font-medium">
          {t.noPriceData}
        </div>
      )}
    </div>
  );
};
