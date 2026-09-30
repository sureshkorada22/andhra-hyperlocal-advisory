import React from 'react';
import { OpportunityScoreStats, Language } from '../../types';
import { translations } from '../../i18n/translations';
import { Award, Info, Sparkles } from 'lucide-react';

interface OpportunityScoreCardProps {
  language: Language;
  scoreData: OpportunityScoreStats;
  businessName: string;
  locationName: string;
}

export const OpportunityScoreCard: React.FC<OpportunityScoreCardProps> = ({
  language,
  scoreData,
  businessName,
  locationName,
}) => {
  const t = translations[language];
  const score = scoreData.opportunity_score;

  // Determine color theme
  let dialColor = "#059669"; // green
  let badgeBg = "bg-emerald-100 text-emerald-900 border-emerald-300";
  if (score < 50) {
    dialColor = "#e11d48"; // red
    badgeBg = "bg-rose-100 text-rose-900 border-rose-300";
  } else if (score < 70) {
    dialColor = "#d97706"; // amber
    badgeBg = "bg-amber-100 text-amber-900 border-amber-300";
  }

  // Factor translations helper
  const translateFactorName = (factorName: string) => {
    const fn = factorName.toLowerCase();
    if (fn.includes("customer")) return t.factorCustomer;
    if (fn.includes("gap")) return t.factorMarketGap;
    if (fn.includes("competition")) return t.factorCompetition;
    if (fn.includes("access")) return t.factorAccessibility;
    if (fn.includes("infra")) return t.factorInfrastructure;
    if (fn.includes("demand")) return t.factorDemand;
    return factorName;
  };

  return (
    <div className="card-3d-surface p-6 sm:p-8 bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/40 border-emerald-300 border-b-[4.5px] border-b-emerald-500/80 shadow-xl relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left: 3D Embossed Score Dial & Label */}
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0 flex items-center justify-center">
            {/* 3D Circular SVG Gauge with ambient drop shadow */}
            <svg className="w-full h-full -rotate-90 transform drop-shadow-md" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#e2e8f0"
                strokeWidth="11"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke={dialColor}
                strokeWidth="11"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-2.5 rounded-full bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 shadow-md flex flex-col items-center justify-center text-center">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight drop-shadow-xs">
                {score.toFixed(0)}
              </span>
              <span className="text-2xs sm:text-xs font-black text-slate-400 uppercase tracking-wider">
                / 100
              </span>
            </div>
          </div>

          <div>
            <div className="badge-3d px-3 py-1 text-xs font-black bg-emerald-100 text-emerald-950 border border-emerald-400 mb-2.5">
              <Award className="w-3.5 h-3.5 text-emerald-700 mr-1.5" />
              <span>{t.opportunityScoreHeading}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {scoreData.opportunity_label}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-semibold">
              <span className="font-black text-slate-900">{businessName}</span> {t.forBusinessIn}{' '}
              <span className="font-black text-slate-900">{locationName}</span> {t.atLocation}.
            </p>
          </div>
        </div>

        {/* Right: 3D Factor Weights Breakdown */}
        <div className="flex-1 lg:max-w-md bg-white/95 p-5 sm:p-6 rounded-2xl border border-slate-200 border-b-[3.5px] border-slate-300 shadow-md backdrop-blur-xs">
          <div className="text-xs font-black text-slate-800 uppercase tracking-wider mb-3.5 flex items-center justify-between">
            <span>{t.factorWeightsTitle}</span>
            <span className="badge-3d font-mono text-2xs text-emerald-900 bg-emerald-50 px-2.5 py-0.5 border border-emerald-300">
              {t.deterministicBadge}
            </span>
          </div>
          <div className="space-y-3">
            {scoreData.factors.map((f, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{translateFactorName(f.factor)} ({f.weight}%)</span>
                  <span className="font-mono font-black text-slate-900">{f.score.toFixed(0)}/100</span>
                </div>
                <div className="groove-track-3d w-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 h-2.5 rounded-full transition-all duration-700 shadow-xs"
                    style={{ width: `${Math.min(f.score, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Why This Score? (+ / - Empirical Drivers) */}
      {scoreData.why_this_score && (
        <div className="mt-6 pt-5 border-t border-emerald-200/80">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
              {language === 'te' ? 'ఈ స్కోరు ఎందుకు వచ్చింది? (విశ్లేషణ కారణాలు)' :
               language === 'hi' ? 'यह स्कोर क्यों मिला? (विश्लेषण कारक)' :
               'Why this score? (Key Opportunity & Risk Drivers)'}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Positive Drivers */}
            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
              <div className="text-2xs font-black text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-3xs font-black">+</span>
                <span>{language === 'te' ? 'అనుకూల అంశాలు (Positive Drivers)' : language === 'hi' ? 'सकारात्मक कारक (Positive Drivers)' : 'Positive Drivers'}</span>
              </div>
              <ul className="space-y-1.5">
                {scoreData.why_this_score.positive_drivers.map((driver, idx) => (
                  <li key={idx} className="text-xs text-slate-800 font-medium flex items-start gap-2">
                    <span className="text-emerald-600 font-black mt-0.5">•</span>
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Caution Factors */}
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200">
              <div className="text-2xs font-black text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center text-3xs font-black">!</span>
                <span>{language === 'te' ? 'జాగ్రత్త పడాల్సిన అంశాలు (Caution Factors)' : language === 'hi' ? 'सावधानी के कारक (Caution Factors)' : 'Caution Factors'}</span>
              </div>
              <ul className="space-y-1.5">
                {scoreData.why_this_score.caution_factors.map((caution, idx) => (
                  <li key={idx} className="text-xs text-slate-800 font-medium flex items-start gap-2">
                    <span className="text-amber-600 font-black mt-0.5">•</span>
                    <span>{caution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Mandatory Non-Guarantee Disclaimer Banner */}
      <div className="mt-5 pt-3.5 border-t border-emerald-200/60 flex items-start gap-2.5 text-slate-600 text-xs font-medium">
        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <p>
          <span className="font-bold text-slate-800">{t.disclaimerHeading} </span>
          {scoreData.disclaimer}
        </p>
      </div>
    </div>
  );
};
