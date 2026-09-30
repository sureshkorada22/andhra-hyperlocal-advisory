import React from 'react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import {
  FinancialRoadmap,
  SCHEME_CONFIG,
  formatIndianCurrency,
} from '../../services/financialEngine';
import {
  CheckCircle2,
  AlertTriangle,
  Award,
  Calendar,
  Percent,
  Clock,
  Shield,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface SchemeRoutingCardProps {
  language: Language;
  roadmap: FinancialRoadmap;
}

export const SchemeRoutingCard: React.FC<SchemeRoutingCardProps> = ({
  language,
  roadmap,
}) => {
  const t = translations[language];

  // Case 6: Above ₹50 Lakh limit
  if (roadmap.exceedsLimit) {
    return (
      <div className="card-3d-surface p-6 sm:p-8 border-amber-300 bg-amber-50/80 relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="badge-3d px-3 py-1 bg-amber-200 text-amber-900 font-extrabold text-2xs uppercase tracking-wider">
              SIH BOUNDARY LIMIT
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-amber-950 mt-2">
              Outside SIH-defined scheme range
            </h3>
            <p className="text-sm font-semibold text-amber-900 mt-2 leading-relaxed">
              Your calculated project cost is above ₹50 lakh, which is outside the project-cost range specified for the schemes in this problem statement.
            </p>
            <div className="mt-4 p-4 rounded-xl bg-white/90 border border-amber-200 text-xs text-amber-900">
              <p className="font-bold mb-1">Recommended Action:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>
                  Adjust your available margin capital to ₹5,00,000 or lower to size your project within the SIH ₹50.00 lakh ceiling.
                </li>
                <li>
                  Or consult the State Channelizing Agency (SCA) for large-scale enterprise financing programs beyond the micro-enterprise scope.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isMicro = roadmap.schemeId === 'micro_finance';
  const scheme = roadmap.scheme;
  if (!scheme) return null;

  return (
    <div className="card-3d-surface p-6 sm:p-8 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-lg shadow-md border-b-[3px] border-emerald-800">
            3
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Scheme Auto-Selection
              </h2>
              <span className="badge-3d px-2.5 py-0.5 text-2xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                AUTOMATIC ROUTING
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
              The system automatically selects the applicable scheme based on your calculated Project Cost.
            </p>
          </div>
        </div>

        {/* Selected Scheme Badge */}
        <div className="self-start sm:self-auto">
          <span className="badge-3d px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-200" />
            <span>Auto-Selected: {scheme.name_en}</span>
          </span>
        </div>
      </div>

      {/* Main Scheme Display Card */}
      <div
        className={`p-6 sm:p-7 rounded-2xl border transition-all ${
          isMicro
            ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-white border-emerald-400 border-b-[4px] border-b-emerald-600 shadow-md'
            : 'bg-gradient-to-br from-teal-50 via-cyan-50 to-white border-teal-400 border-b-[4px] border-b-teal-600 shadow-md'
        }`}
      >
        {/* Banner with Clear Applicable Scheme Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <span className="text-2xs font-extrabold uppercase tracking-widest text-emerald-700">
              Applicable Scheme
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {scheme.name_en}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              {language === 'te'
                ? scheme.description_te
                : language === 'hi'
                ? scheme.description_hi
                : scheme.description_en}
            </p>
          </div>

          <div className="text-left md:text-right shrink-0">
            <span className="text-2xs font-bold text-slate-500 uppercase">
              Maximum Loan
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-800 font-mono">
              {isMicro ? '₹1.25 lakh' : '₹45 lakh'}
            </div>
            <span className="text-2xs text-emerald-600 font-bold">
              Funding: Up to 90%
            </span>
          </div>
        </div>

        {/* SIH Exact Display Specifications Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-5">
          
          {/* 1. Project Cost Range */}
          <div className="p-3.5 rounded-xl bg-white/95 border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 text-2xs font-bold text-slate-500 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Project Cost</span>
            </div>
            <div className="text-sm font-black text-slate-900 font-mono">
              {isMicro ? 'Up to ₹1.40 lakh' : 'Above ₹1.40 lakh and up to ₹50.00 lakh'}
            </div>
          </div>

          {/* 2. Funding */}
          <div className="p-3.5 rounded-xl bg-white/95 border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 text-2xs font-bold text-slate-500 mb-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Funding</span>
            </div>
            <div className="text-sm font-black text-slate-900 font-mono">
              Up to 90%
            </div>
          </div>

          {/* 3. Maximum Loan */}
          <div className="p-3.5 rounded-xl bg-white/95 border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 text-2xs font-bold text-slate-500 mb-1">
              <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Maximum Loan</span>
            </div>
            <div className="text-sm font-black text-slate-900 font-mono">
              {isMicro ? '₹1.25 lakh' : '₹45 lakh'}
            </div>
          </div>

          {/* 4. Beneficiary Interest Rate */}
          <div className="p-3.5 rounded-xl bg-white/95 border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 text-2xs font-bold text-slate-500 mb-1">
              <Percent className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Beneficiary Interest Rate</span>
            </div>
            <div className="text-sm font-black text-emerald-700 font-mono">
              {isMicro ? '6.5% per annum' : '8% per annum'}
            </div>
          </div>

          {/* 5. Repayment Period */}
          <div className="p-3.5 rounded-xl bg-white/95 border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 text-2xs font-bold text-slate-500 mb-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Repayment Period</span>
            </div>
            <div className="text-sm font-black text-slate-900 font-mono">
              {isMicro ? '3 years' : '7 years'}
            </div>
          </div>

          {/* 6. Moratorium */}
          <div className="p-3.5 rounded-xl bg-white/95 border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 text-2xs font-bold text-slate-500 mb-1">
              <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Moratorium</span>
            </div>
            <div className="text-sm font-black text-amber-700 font-mono">
              {isMicro ? '3 months' : '6 months'}
            </div>
          </div>

        </div>

        {/* Loan Capping Notification if applicable */}
        {roadmap.isLoanCapped && (
          <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <span className="font-bold">Ceiling Applied: </span>
              90% of your project cost equals {formatIndianCurrency(roadmap.rawCalculatedLoan)}, but the maximum loan amount is capped at the scheme ceiling of{' '}
              <span className="font-black text-slate-900">{formatIndianCurrency(scheme.maxLoan)}</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
