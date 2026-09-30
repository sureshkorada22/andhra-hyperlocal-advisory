import React from 'react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { FinancialRoadmap, formatIndianCurrency } from '../../services/financialEngine';
import {
  FileText,
  Printer,
  ArrowLeft,
  ChevronDown,
  Info,
  ShieldCheck,
  Award,
  Sparkles,
  Calendar,
  Layers,
  Percent,
  Clock,
  Coins,
  Receipt,
} from 'lucide-react';

interface FinancialRoadmapCardProps {
  language: Language;
  roadmap: FinancialRoadmap;
  operationalCostsTotal?: number;
  workingCapitalTotal?: number;
  businessName: string;
  locationName: string;
  onBackToModule1: () => void;
  onScrollToSchedule: () => void;
}

export const FinancialRoadmapCard: React.FC<FinancialRoadmapCardProps> = ({
  language,
  roadmap,
  operationalCostsTotal = 0,
  workingCapitalTotal = 0,
  businessName,
  locationName,
  onBackToModule1,
  onScrollToSchedule,
}) => {
  const t = translations[language];

  if (!roadmap.isValid || roadmap.exceedsLimit) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="card-3d-surface p-6 sm:p-8 relative overflow-hidden">
      {/* Header Badge & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-600 text-white flex items-center justify-center font-black text-xl shadow-md border-b-[3px] border-emerald-800">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="badge-3d px-3 py-0.5 text-2xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300">
              SIH 2026 • MODULE 2 SUMMARY
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              YOUR FINANCIAL ROADMAP
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handlePrint}
            className="btn-3d-primary text-xs py-2.5 px-4 flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Download Financial Report</span>
          </button>

          <button
            type="button"
            onClick={onScrollToSchedule}
            className="btn-3d-secondary text-xs py-2.5 px-4 flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronDown className="w-4 h-4" />
            <span>View Quarterly Repayment Schedule</span>
          </button>
        </div>
      </div>

      {/* Enterprise & Geolocation Context Banner */}
      <div className="my-6 p-4 sm:p-5 rounded-2xl bg-slate-900 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-2xs font-extrabold text-emerald-400 uppercase tracking-widest">
            Proposed Business Category
          </span>
          <div className="text-lg sm:text-xl font-black text-white mt-0.5">
            {businessName}
          </div>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-2xs font-extrabold text-slate-400 uppercase tracking-widest">
            Geographic Location
          </span>
          <div className="text-sm sm:text-base font-bold text-slate-200 mt-0.5 truncate max-w-sm">
            {locationName}
          </div>
        </div>
      </div>

      {/* SIH Section 6 Defined Roadmap Specifications Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 mb-6">
        
        {/* 1. Available Margin Capital */}
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 shadow-2xs">
          <span className="text-2xs font-bold text-emerald-800 uppercase block">
            Available Margin Capital
          </span>
          <div className="text-lg sm:text-xl font-black text-emerald-950 font-mono mt-1">
            {formatIndianCurrency(roadmap.availableMargin)}
          </div>
          <span className="text-3xs text-emerald-700 font-semibold">
            Beneficiary Contribution: 10%
          </span>
        </div>

        {/* 2. Total Feasible Project Cost */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
          <span className="text-2xs font-bold text-slate-500 uppercase block">
            Total Feasible Project Cost
          </span>
          <div className="text-lg sm:text-xl font-black text-slate-900 font-mono mt-1">
            {formatIndianCurrency(roadmap.totalProjectCost)}
          </div>
          <span className="text-3xs text-slate-500 font-semibold">
            Available Margin ÷ 10%
          </span>
        </div>

        {/* 3. Maximum Loan Amount */}
        <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 shadow-2xs">
          <span className="text-2xs font-bold text-teal-800 uppercase block">
            Maximum Loan Amount
          </span>
          <div className="text-lg sm:text-xl font-black text-teal-950 font-mono mt-1">
            {formatIndianCurrency(roadmap.maximumLoan)}
          </div>
          <span className="text-3xs text-teal-700 font-semibold">
            Loan Portion: 90%
          </span>
        </div>

        {/* 4. Applicable Scheme */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
          <span className="text-2xs font-bold text-slate-500 uppercase block">
            Applicable Scheme
          </span>
          <div className="text-sm sm:text-base font-black text-slate-900 mt-1 line-clamp-1">
            {roadmap.scheme?.name_en}
          </div>
          <span className="text-3xs text-emerald-700 font-bold">
            SIH Problem Statement
          </span>
        </div>

        {/* 5. Beneficiary Interest Rate */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
          <span className="text-2xs font-bold text-slate-500 uppercase block">
            Interest Rate
          </span>
          <div className="text-lg sm:text-xl font-black text-emerald-800 font-mono mt-1">
            {roadmap.interestRatePct}% p.a.
          </div>
          <span className="text-3xs text-slate-500 font-semibold">
            Concessional Beneficiary Rate
          </span>
        </div>

        {/* 6. Repayment Period */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
          <span className="text-2xs font-bold text-slate-500 uppercase block">
            Repayment Period
          </span>
          <div className="text-lg sm:text-xl font-black text-slate-900 font-mono mt-1">
            {roadmap.tenureYears} years
          </div>
          <span className="text-3xs text-slate-500 font-semibold">
            {roadmap.tenureYears * 4} Quarterly Installments
          </span>
        </div>

        {/* 7. Moratorium */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 shadow-2xs">
          <span className="text-2xs font-bold text-amber-800 uppercase block">
            Moratorium
          </span>
          <div className="text-lg sm:text-xl font-black text-amber-950 font-mono mt-1">
            {roadmap.moratoriumMonths} months
          </div>
          <span className="text-3xs text-amber-700 font-semibold">
            Grace period before repayment
          </span>
        </div>

        {/* 8. Operational Costs */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
          <span className="text-2xs font-bold text-slate-500 uppercase block">
            Operational Costs
          </span>
          <div className="text-lg sm:text-xl font-black text-slate-900 font-mono mt-1">
            {operationalCostsTotal > 0 ? formatIndianCurrency(operationalCostsTotal) : '₹ —'}
          </div>
          <span className="text-3xs text-slate-500 font-semibold">
            {operationalCostsTotal > 0 ? '8 Itemized Categories' : 'Estimated recurring costs'}
          </span>
        </div>

        {/* 9. Working Capital Requirement */}
        <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 shadow-2xs">
          <span className="text-2xs font-bold text-teal-800 uppercase block">
            Working Capital Requirement
          </span>
          <div className="text-lg sm:text-xl font-black text-teal-950 font-mono mt-1">
            {workingCapitalTotal > 0 ? formatIndianCurrency(workingCapitalTotal) : '₹ —'}
          </div>
          <span className="text-3xs text-teal-700 font-semibold">
            {workingCapitalTotal > 0 ? '5 Essential Reserve Buffers' : 'Inventory & cashflow buffer'}
          </span>
        </div>

        {/* 10. Quarterly Repayment Quick Link */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-2xs flex flex-col justify-between col-span-2 sm:col-span-1">
          <div>
            <span className="text-2xs font-bold text-emerald-100 uppercase block">
              Quarterly Repayment
            </span>
            <div className="text-lg sm:text-xl font-black font-mono mt-1 text-white">
              {formatIndianCurrency(roadmap.indicativeQuarterlyInstallment)}
            </div>
          </div>
          <button
            type="button"
            onClick={onScrollToSchedule}
            className="mt-2 text-2xs font-bold text-emerald-200 hover:text-white underline cursor-pointer text-left"
          >
            [ View Quarterly Repayment Schedule ]
          </button>
        </div>

      </div>

      {/* Button: [ View Quarterly Repayment Schedule ] */}
      <div className="mb-6 flex justify-center">
        <button
          type="button"
          onClick={onScrollToSchedule}
          className="btn-3d-primary py-3 px-6 text-sm font-black flex items-center gap-2 cursor-pointer shadow-md"
        >
          <ChevronDown className="w-4 h-4" />
          <span>[ View Quarterly Repayment Schedule ]</span>
        </button>
      </div>

      {/* Scheme Information & Data Transparency Section (SIH Section 12) */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            Scheme Information
          </h3>
        </div>

        <div className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
          <p>
            <strong>Source: </strong>
            <span className="font-bold text-emerald-900">SIH 2026 Problem Statement — SIH26091</span>
          </p>
          <p>
            These scheme parameters (Micro Finance Scheme & Term Loan Scheme) are specified in the official SIH problem statement for rural micro-entrepreneur advisory and financial structuring.
          </p>
          <p className="font-medium text-slate-600">
            Calculated maximum loan under the SIH-defined financial model.
          </p>
          <p className="font-semibold text-amber-900">
            Actual sanction is subject to the concerned financing authority.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-white border border-slate-200 text-2xs text-slate-500 flex items-start gap-2">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p>
            This system does not claim &quot;Loan Approved&quot;, &quot;Guaranteed Loan&quot;, or &quot;Guaranteed Eligibility&quot;. It provides deterministic decision-support structuring based on the SIH26091 problem statement.
          </p>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToModule1}
          className="btn-3d-secondary text-xs sm:text-sm py-2.5 px-5 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-700" />
          <span>{t.backToModule1Btn || '← Back to Module 1'}</span>
        </button>

        <span className="text-2xs text-slate-400 font-semibold">
          SIH 2026 Problem Statement SIH26091 • Module 1 + Module 2
        </span>
      </div>
    </div>
  );
};
