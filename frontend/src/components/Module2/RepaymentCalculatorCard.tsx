import React from 'react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { FinancialRoadmap, formatIndianCurrency } from '../../services/financialEngine';
import {
  Clock,
  ArrowRight,
  ShieldAlert,
  Info,
  CalendarCheck,
  CreditCard,
} from 'lucide-react';

interface RepaymentCalculatorCardProps {
  language: Language;
  roadmap: FinancialRoadmap;
}

export const RepaymentCalculatorCard: React.FC<RepaymentCalculatorCardProps> = ({
  language,
  roadmap,
}) => {
  const t = translations[language];

  if (!roadmap.isValid || roadmap.exceedsLimit) return null;

  return (
    <div className="card-3d-surface p-6 sm:p-8 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-6">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-lg shadow-md border-b-[3px] border-emerald-800">
          4
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            {t.repaymentTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
            {t.repaymentSubtitle}
          </p>
        </div>
      </div>

      {/* Dual Indicative Repayment Cards: Monthly EMI vs Quarterly Installment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        
        {/* Card 1: Quarterly Installment (SIH Recommended) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 text-white shadow-lg border-b-[4px] border-b-emerald-950 relative overflow-hidden">
          <div className="absolute top-3 right-3">
            <span className="badge-3d px-2.5 py-0.5 text-2xs font-black bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
              SIH RECOMMENDED
            </span>
          </div>

          <span className="text-2xs font-extrabold uppercase tracking-widest text-emerald-300">
            {t.indicativeQuarterlyLabel}
          </span>

          <div className="text-3xl sm:text-4xl font-black font-mono mt-3 text-white">
            {formatIndianCurrency(roadmap.indicativeQuarterlyInstallment)}
            <span className="text-xs font-bold text-emerald-300 ml-1.5 font-sans">
              / quarter
            </span>
          </div>

          <p className="text-xs text-slate-300 font-medium mt-2 leading-relaxed">
            4 installments per year across {roadmap.tenureYears} years ({roadmap.tenureYears * 4} installments total).
          </p>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-2xs text-slate-400">
            <span>Interest: {roadmap.interestRatePct}% p.a.</span>
            <span>Principal: {formatIndianCurrency(roadmap.maximumLoan)}</span>
          </div>
        </div>

        {/* Card 2: Monthly Indicative EMI */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 border-b-[4px] border-b-slate-300 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-2xs font-extrabold uppercase tracking-widest text-slate-500">
                {t.indicativeEmiLabel}
              </span>
              <CreditCard className="w-4 h-4 text-slate-400" />
            </div>

            <div className="text-3xl sm:text-4xl font-black font-mono mt-3 text-slate-900">
              {formatIndianCurrency(roadmap.indicativeMonthlyEmi)}
              <span className="text-xs font-bold text-slate-500 ml-1.5 font-sans">
                / month
              </span>
            </div>

            <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
              Standard monthly reducing-balance amortization over {roadmap.tenureYears * 12} months.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-400">
            <span>Formula: Reducing Balance</span>
            <span>Tenure: {roadmap.tenureYears} Years</span>
          </div>
        </div>

      </div>

      {/* Moratorium Timeline Representation */}
      <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-amber-700" />
          <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider">
            Repayment Timeline & Moratorium Grace Structure
          </h4>
        </div>

        <p className="text-xs text-amber-900 font-semibold mb-4 leading-relaxed">
          {t.moratoriumNotice}
        </p>

        {/* Visual 3-Stage Moratorium Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Stage 1: Moratorium */}
          <div className="p-3 rounded-xl bg-white border border-amber-300 shadow-2xs">
            <span className="badge-3d px-2 py-0.5 text-3xs font-extrabold bg-amber-100 text-amber-800">
              STAGE 1
            </span>
            <div className="text-sm font-black text-slate-900 mt-1.5">
              {t.timelineMoratorium}
            </div>
            <div className="text-xs font-bold text-amber-700 font-mono mt-0.5">
              Months 1 to {roadmap.moratoriumMonths} ({roadmap.moratoriumMonths} Mos)
            </div>
            <p className="text-3xs text-slate-500 font-medium mt-1">
              ₹0 Principal Repayment. Focus on equipment installation & initial production.
            </p>
          </div>

          {/* Stage 2: Repayment Begins */}
          <div className="p-3 rounded-xl bg-white border border-emerald-300 shadow-2xs">
            <span className="badge-3d px-2 py-0.5 text-3xs font-extrabold bg-emerald-100 text-emerald-800">
              STAGE 2
            </span>
            <div className="text-sm font-black text-slate-900 mt-1.5">
              {t.timelineBegins}
            </div>
            <div className="text-xs font-bold text-emerald-700 font-mono mt-0.5">
              Month {roadmap.moratoriumMonths + 1} Onwards
            </div>
            <p className="text-3xs text-slate-500 font-medium mt-1">
              First installment scheduled as cash flows from business operations begin.
            </p>
          </div>

          {/* Stage 3: Regular Period */}
          <div className="p-3 rounded-xl bg-white border border-teal-300 shadow-2xs">
            <span className="badge-3d px-2 py-0.5 text-3xs font-extrabold bg-teal-100 text-teal-800">
              STAGE 3
            </span>
            <div className="text-sm font-black text-slate-900 mt-1.5">
              {t.timelineRegular}
            </div>
            <div className="text-xs font-bold text-teal-700 font-mono mt-0.5">
              Full {roadmap.tenureYears} Years Amortization
            </div>
            <p className="text-3xs text-slate-500 font-medium mt-1">
              Gradual principal reduction with interest on remaining balance until ₹0 closing.
            </p>
          </div>

        </div>
      </div>

      {/* Statutory Indicative Disclaimer */}
      <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 flex items-start gap-2.5 text-2xs text-slate-600 font-medium">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>
          <span className="font-bold text-slate-800">Indicative Repayment Estimate: </span>
          {t.repaymentDisclaimer}
        </p>
      </div>

    </div>
  );
};
