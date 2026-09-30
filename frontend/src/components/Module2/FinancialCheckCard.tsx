import React from 'react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { FinancialRoadmap, formatIndianCurrency } from '../../services/financialEngine';
import { ShieldCheck, AlertCircle, Info, Scale, CheckCircle2 } from 'lucide-react';

interface FinancialCheckCardProps {
  language: Language;
  roadmap: FinancialRoadmap;
  customBreakdownTotal?: number;
}

export const FinancialCheckCard: React.FC<FinancialCheckCardProps> = ({
  language,
  roadmap,
  customBreakdownTotal,
}) => {
  const t = translations[language];

  if (!roadmap.isValid || roadmap.exceedsLimit) return null;

  const targetCost = customBreakdownTotal && customBreakdownTotal > 0
    ? customBreakdownTotal
    : roadmap.totalProjectCost;

  const isOverFeasible = targetCost > roadmap.totalProjectCost + 10;

  return (
    <div className="card-3d-surface p-6 sm:p-8 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-6">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-lg shadow-md border-b-[3px] border-emerald-800">
          7
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            {t.financialCheckTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
            Advisory decision-support validation against SIH prudent financing rules.
          </p>
        </div>
      </div>

      {/* 5-Metric Quick Audit Table */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
        
        {/* 1. Available Margin */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-1.5 text-2xs font-bold text-slate-500 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{t.checkAvailableMargin}</span>
          </div>
          <div className="text-sm sm:text-base font-black text-slate-900 font-mono">
            {formatIndianCurrency(roadmap.availableMargin)}
          </div>
        </div>

        {/* 2. Estimated Project Cost */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-1.5 text-2xs font-bold text-slate-500 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{t.checkEstimatedCost}</span>
          </div>
          <div className="text-sm sm:text-base font-black text-slate-900 font-mono">
            {formatIndianCurrency(roadmap.totalProjectCost)}
          </div>
        </div>

        {/* 3. Loan Requirement */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-1.5 text-2xs font-bold text-slate-500 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{t.checkLoanReq}</span>
          </div>
          <div className="text-sm sm:text-base font-black text-slate-900 font-mono">
            {formatIndianCurrency(roadmap.maximumLoan)}
          </div>
        </div>

        {/* 4. Selected Scheme */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-1.5 text-2xs font-bold text-slate-500 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{t.checkSelectedScheme}</span>
          </div>
          <div className="text-xs sm:text-sm font-black text-emerald-800 line-clamp-1">
            {roadmap.scheme?.name_en || 'SIH Scheme'}
          </div>
        </div>

        {/* 5. Repayment Estimate */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
          <div className="flex items-center gap-1.5 text-2xs font-bold text-slate-500 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{t.checkRepaymentEst}</span>
          </div>
          <div className="text-xs sm:text-sm font-black text-slate-900 font-mono">
            {formatIndianCurrency(roadmap.indicativeQuarterlyInstallment)}/qtr
          </div>
        </div>

      </div>

      {/* Warning or Affirmation Banner */}
      {isOverFeasible ? (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-3 mb-4">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-950 block mb-0.5">
              {t.affordabilityWarning}
            </span>
            <p className="text-slate-700 leading-relaxed">
              Your requested project scale is larger than what your available margin of {formatIndianCurrency(roadmap.availableMargin)} can support at the statutory 10% own-equity ratio.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2.5 mb-4">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-semibold">
            ✓ Healthy Financial Structure: 10% own equity verified against {formatIndianCurrency(roadmap.maximumLoan)} loan requirement.
          </span>
        </div>
      )}

      {/* Decision-Support Philosophy Notice */}
      <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-2xs text-slate-600 font-medium flex items-center gap-2">
        <Scale className="w-4 h-4 text-slate-500 shrink-0" />
        <span>{t.affordabilityGuidance}</span>
      </div>
    </div>
  );
};
