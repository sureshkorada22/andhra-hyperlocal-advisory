import React from 'react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { FinancialRoadmap, formatIndianCurrency } from '../../services/financialEngine';
import { TrendingUp, UserCheck, Building2, Layers, Info } from 'lucide-react';

interface VisualFinancialCardProps {
  language: Language;
  roadmap: FinancialRoadmap;
}

export const VisualFinancialCard: React.FC<VisualFinancialCardProps> = ({
  language,
  roadmap,
}) => {
  const t = translations[language];

  if (!roadmap.isValid) {
    return (
      <div className="card-3d-surface p-6 sm:p-8 border-slate-200">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Please enter an available margin capital amount above ₹0 to calculate the financial roadmap.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card-3d-surface p-6 sm:p-8 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-6">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-lg shadow-md border-b-[3px] border-emerald-800">
          2
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Financial Structuring
            </h2>
            <span className="badge-3d px-2.5 py-0.5 text-2xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
              SIH FINANCIAL MODEL
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
            Beneficiary Contribution = 10% • Concessional Loan = 90%
          </p>
        </div>
      </div>

      {/* Formula Explanation Callout */}
      <div className="mb-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-mono font-bold text-slate-800">
          <span className="badge-3d px-2 py-0.5 text-3xs font-extrabold bg-slate-200 text-slate-800">
            FORMULA
          </span>
          <span>Project Cost = Margin ÷ 10% (or Margin × 10)</span>
        </div>
        <div className="font-mono font-bold text-teal-800">
          Maximum Loan = 90% × Project Cost
        </div>
      </div>

      {/* SIH Central Visual Breakdown: 3 Distinct Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        {/* Block 1: Total Project Cost */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg border-b-[4px] border-b-slate-950 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-extrabold uppercase tracking-widest text-emerald-300">
              Total Project Cost
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
              <Layers className="w-4 h-4 text-emerald-300" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white drop-shadow-sm">
              {formatIndianCurrency(roadmap.totalProjectCost)}
            </div>
            <div className="text-xs text-slate-300 font-medium mt-1">
              Total Feasible Project Cost (100%)
            </div>
          </div>
          <div className="pt-2.5 border-t border-white/10 text-2xs text-slate-400 font-mono">
            {formatIndianCurrency(roadmap.availableMargin)} ÷ 10%
          </div>
        </div>

        {/* Block 2: Your Contribution (10%) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100/70 border border-emerald-300 border-b-[4px] border-b-emerald-600/70 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-extrabold uppercase tracking-widest text-emerald-800">
              Your Contribution
            </span>
            <span className="badge-3d px-2 py-0.5 text-2xs font-black bg-emerald-600 text-white">
              10%
            </span>
          </div>
          <div className="my-3">
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-emerald-950">
              {formatIndianCurrency(roadmap.availableMargin)}
            </div>
            <div className="text-xs text-emerald-800 font-medium mt-1">
              Beneficiary Equity Contribution
            </div>
          </div>
          <div className="pt-2.5 border-t border-emerald-200/80 text-2xs text-emerald-700 font-semibold flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Own equity — zero debt obligation</span>
          </div>
        </div>

        {/* Block 3: Concessional Loan (90%) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100/70 border border-teal-300 border-b-[4px] border-b-teal-600/70 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-extrabold uppercase tracking-widest text-teal-800">
              Concessional Loan
            </span>
            <span className="badge-3d px-2 py-0.5 text-2xs font-black bg-teal-600 text-white">
              90%
            </span>
          </div>
          <div className="my-3">
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-teal-950">
              {formatIndianCurrency(roadmap.maximumLoan)}
            </div>
            <div className="text-xs text-teal-800 font-medium mt-1">
              Maximum Loan Amount under SIH Scheme
            </div>
          </div>
          <div className="pt-2.5 border-t border-teal-200/80 text-2xs text-teal-700 font-semibold flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>
              {roadmap.isLoanCapped
                ? 'Capped at scheme ceiling'
                : 'Project Cost × 90%'}
            </span>
          </div>
        </div>

      </div>

      {/* Visual Proportional Split Bar (10% Own vs 90% Loan) */}
      <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between text-xs font-black mb-2">
          <span className="text-emerald-800 flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
            Your Contribution: {formatIndianCurrency(roadmap.availableMargin)} (10%)
          </span>
          <span className="text-teal-800 flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-teal-600 inline-block" />
            Concessional Loan: {formatIndianCurrency(roadmap.maximumLoan)} (90%)
          </span>
        </div>

        {/* Progress Bar Visual */}
        <div className="w-full h-5 bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
          <div
            style={{ width: '10%' }}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-2xs font-black"
            title="Beneficiary Contribution (10%)"
          >
            10%
          </div>
          <div
            style={{ width: '90%' }}
            className="bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center text-white text-2xs font-black"
            title="Concessional Loan (90%)"
          >
            90%
          </div>
        </div>
      </div>
    </div>
  );
};
