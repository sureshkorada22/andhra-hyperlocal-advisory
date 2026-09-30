import React, { useState } from 'react';
import { DataConfidenceStats, Language } from '../../types';
import { translations } from '../../i18n/translations';
import { ShieldCheck, Info, ChevronDown, ChevronUp, Database, CheckCircle2, AlertCircle } from 'lucide-react';

interface DataConfidenceCardProps {
  language: Language;
  confidence: DataConfidenceStats;
  qualityCoverage?: any[];
  normalizedIndicators?: any[];
}

export const DataConfidenceCard: React.FC<DataConfidenceCardProps> = ({
  language,
  confidence,
  qualityCoverage,
  normalizedIndicators,
}) => {
  const t = translations[language];
  const [showCoverageTable, setShowCoverageTable] = useState(true);
  const [showNormalizedIndicators, setShowNormalizedIndicators] = useState(false);

  const getBadgeClass = (status: string) => {
    switch (status) {
      case 'High':
      case 'Official data':
      case 'Observed physical POIs':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Medium':
      case 'Estimated':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Low':
      case 'Unavailable':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="card-3d-surface p-6 sm:p-7 bg-slate-50/70 shadow-xl space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-indigo-100 to-indigo-200 text-indigo-800 flex items-center justify-center border border-indigo-300 border-b-2 border-b-indigo-400 shadow-2xs">
            <ShieldCheck className="w-5 h-5 drop-shadow-xs" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">{t.confidenceTitle}</h3>
            <p className="text-2xs sm:text-xs text-slate-500 font-semibold">
              Statutory government records & verifiable geospatial provenance
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 font-bold">{t.overallQualityLabel}</span>
          <span className={`badge-3d px-3.5 py-1 text-xs font-black border ${getBadgeClass(confidence.overall_confidence)}`}>
            {confidence.overall_confidence} ({confidence.overall_score}%)
          </span>
        </div>
      </div>

      {/* 4 Category Confidence Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Competitors Confidence */}
        <div className="p-4 rounded-2xl bg-white border border-slate-300 border-b-[3.5px] border-b-slate-300 shadow-sm hover:-translate-y-0.5 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-800">{t.confCompetitors}</span>
            <span className={`badge-3d text-2xs font-black px-2.5 py-0.5 border ${getBadgeClass(confidence.competitors_confidence)}`}>
              {confidence.competitors_confidence}
            </span>
          </div>
          <p className="text-2xs text-slate-500 font-medium line-clamp-2">
            {confidence.details.competitors.note}
          </p>
        </div>

        {/* Population Confidence */}
        <div className="p-4 rounded-2xl bg-white border border-slate-300 border-b-[3.5px] border-b-slate-300 shadow-sm hover:-translate-y-0.5 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-800">{t.confPopulation}</span>
            <span className={`badge-3d text-2xs font-black px-2.5 py-0.5 border ${getBadgeClass(confidence.population_confidence)}`}>
              {confidence.population_confidence}
            </span>
          </div>
          <p className="text-2xs text-slate-500 font-medium line-clamp-2">
            {confidence.details.population.note}
          </p>
        </div>

        {/* Prices Confidence */}
        <div className="p-4 rounded-2xl bg-white border border-slate-300 border-b-[3.5px] border-b-slate-300 shadow-sm hover:-translate-y-0.5 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-800">{t.confPrices}</span>
            <span className={`badge-3d text-2xs font-black px-2.5 py-0.5 border ${getBadgeClass(confidence.price_confidence)}`}>
              {confidence.price_confidence}
            </span>
          </div>
          <p className="text-2xs text-slate-500 font-medium line-clamp-2">
            {confidence.details.prices.note}
          </p>
        </div>

        {/* Infrastructure Confidence */}
        <div className="p-4 rounded-2xl bg-white border border-slate-300 border-b-[3.5px] border-b-slate-300 shadow-sm hover:-translate-y-0.5 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-800">{t.confInfrastructure}</span>
            <span className={`badge-3d text-2xs font-black px-2.5 py-0.5 border ${getBadgeClass(confidence.infrastructure_confidence)}`}>
              {confidence.infrastructure_confidence}
            </span>
          </div>
          <p className="text-2xs text-slate-500 font-medium line-clamp-2">
            {confidence.details.infrastructure.note}
          </p>
        </div>

      </div>

      {/* Section 14: Data Quality & Coverage Matrix */}
      {qualityCoverage && qualityCoverage.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-300 border-b-[3.5px] border-b-slate-300 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-700" />
              <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide">
                Data Quality & Coverage (Statutory Provenance)
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setShowCoverageTable(!showCoverageTable)}
              className="text-2xs font-black text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
            >
              <span>{showCoverageTable ? 'Collapse Table' : 'Expand Table'}</span>
              {showCoverageTable ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showCoverageTable && (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-2xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-black uppercase tracking-wider border-b border-slate-200">
                    <th className="py-2.5 px-3">Data Domain</th>
                    <th className="py-2.5 px-3">Source & Dataset</th>
                    <th className="py-2.5 px-3">Reference Year</th>
                    <th className="py-2.5 px-3">Geographic Level</th>
                    <th className="py-2.5 px-3">Coverage Status</th>
                    <th className="py-2.5 px-3">Methodology Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {qualityCoverage.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-slate-900 whitespace-nowrap">
                        {item.category}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-slate-800">{item.dataset}</div>
                        <div className="text-3xs text-slate-500">{item.source}</div>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap font-mono font-bold text-emerald-800">
                        {item.reference_year}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap text-slate-600">
                        {item.geographic_level}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-md font-black text-3xs border ${getBadgeClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-3xs text-slate-500 max-w-xs">
                        {item.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Section 18: Normalized Architecture Inspector (Collapsible) */}
      {normalizedIndicators && normalizedIndicators.length > 0 && (
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-800">
                Normalized Government Data Layer ({normalizedIndicators.length} statutory indicators retrieved)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowNormalizedIndicators(!showNormalizedIndicators)}
              className="text-3xs font-black text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer"
            >
              <span>{showNormalizedIndicators ? 'Hide Data Layer' : 'View Normalized Schemas'}</span>
              {showNormalizedIndicators ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showNormalizedIndicators && (
            <div className="mt-3 pt-3 border-t border-slate-100 overflow-x-auto max-h-60 overflow-y-auto">
              <table className="w-full text-left text-3xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase">
                    <th className="py-1.5 px-2">Source</th>
                    <th className="py-1.5 px-2">Dataset</th>
                    <th className="py-1.5 px-2">Ref Year</th>
                    <th className="py-1.5 px-2">Geo Level</th>
                    <th className="py-1.5 px-2">Indicator</th>
                    <th className="py-1.5 px-2">Value</th>
                    <th className="py-1.5 px-2">Badge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {normalizedIndicators.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-1 px-2 font-bold">{row.source}</td>
                      <td className="py-1 px-2">{row.dataset}</td>
                      <td className="py-1 px-2 font-mono">{row.referenceYear}</td>
                      <td className="py-1 px-2">{row.geographicLevel}</td>
                      <td className="py-1 px-2 font-medium">{row.indicator}</td>
                      <td className="py-1 px-2 font-bold font-mono text-emerald-800">{typeof row.value === 'number' ? row.value.toLocaleString() : row.value} {row.unit}</td>
                      <td className="py-1 px-2">
                        <span className="px-1.5 py-0.5 rounded text-3xs bg-slate-100 border border-slate-200">
                          {row.badge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Transparency Disclaimer */}
      <div className="flex items-start gap-2 text-2xs text-slate-500 font-medium">
        <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
        <p>{confidence.disclaimer}</p>
      </div>
    </div>
  );
};
