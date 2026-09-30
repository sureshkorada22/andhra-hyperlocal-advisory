import React, { useState, useMemo } from 'react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import {
  FinancialRoadmap,
  generateRepaymentSchedule,
  formatIndianCurrency,
} from '../../services/financialEngine';
import {
  Calendar,
  Clock,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  Info,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

interface RepaymentScheduleTableProps {
  language: Language;
  roadmap: FinancialRoadmap;
}

export const RepaymentScheduleTable: React.FC<RepaymentScheduleTableProps> = ({
  language,
  roadmap,
}) => {
  const t = translations[language];
  const [frequency, setFrequency] = useState<'quarterly' | 'monthly'>('quarterly');
  const [showAll, setShowAll] = useState<boolean>(false);

  const schedule = useMemo(() => {
    if (!roadmap.isValid || roadmap.exceedsLimit || roadmap.maximumLoan <= 0) return [];
    return generateRepaymentSchedule(
      roadmap.maximumLoan,
      roadmap.scheme?.interestRate || 0.08,
      roadmap.tenureYears,
      roadmap.moratoriumMonths,
      frequency
    );
  }, [roadmap, frequency]);

  if (!roadmap.isValid || roadmap.exceedsLimit || schedule.length === 0) return null;

  // Primary quarterly view shows first 12 quarters by default (or all with showAll)
  const displayLimit = showAll ? schedule.length : Math.min(12, schedule.length);
  const displayedSchedule = schedule.slice(0, displayLimit);

  const moratoriumQuarters = Math.ceil(roadmap.moratoriumMonths / 3);
  const repaymentBeginsQuarter = moratoriumQuarters + 1;

  return (
    <div id="repayment-schedule-section" className="card-3d-surface p-6 sm:p-8 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-lg shadow-md border-b-[3px] border-emerald-800">
            5
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {language === 'te'
                  ? 'త్రైమాసిక తిరిగి చెల్లింపుల షెడ్యూల్ (Quarterly Repayment Schedule)'
                  : language === 'hi'
                  ? 'त्रैमासिक पुनर्भुगतान अनुसूची (Quarterly Repayment Schedule)'
                  : 'Expected Quarterly Repayment Schedule'}
              </h2>
              <span className="badge-3d px-2.5 py-0.5 text-2xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                SIH PRIMARY VIEW
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
              Loan: {formatIndianCurrency(roadmap.maximumLoan)} • {roadmap.interestRatePct}% p.a. • {roadmap.tenureYears} Years Tenure • {roadmap.moratoriumMonths} Months Moratorium
            </p>
          </div>
        </div>

        {/* View Toggle: Quarterly (Primary) vs Monthly */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFrequency('quarterly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              frequency === 'quarterly'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>{t.toggleQuarterly || 'Quarterly (Primary)'}</span>
            {frequency === 'quarterly' && <CheckCircle className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => setFrequency('monthly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              frequency === 'monthly'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.toggleMonthly || 'Monthly'}
          </button>
        </div>
      </div>

      {/* Moratorium Handling Flow Display (SIH Requirement) */}
      <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-amber-700" />
          <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider">
            {language === 'te'
              ? 'మొరటోరియం మరియు చెల్లింపుల ప్రక్రియ'
              : language === 'hi'
              ? 'मोराटोरियम और पुनर्भुगतान अनुक्रम'
              : 'Moratorium & Repayment Progression'}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          
          {/* Step 1: Moratorium Period */}
          <div className="p-3.5 rounded-xl bg-white border border-amber-300 shadow-2xs">
            <span className="text-2xs font-extrabold uppercase text-amber-800 tracking-wider">
              Step 1 • Grace Period
            </span>
            <div className="text-base font-black text-slate-900 mt-1">
              Moratorium Period
            </div>
            <div className="text-xs font-bold text-amber-700 font-mono mt-0.5">
              {roadmap.moratoriumMonths} Months ({moratoriumQuarters} {moratoriumQuarters === 1 ? 'Quarter' : 'Quarters'})
            </div>
            <p className="text-3xs text-slate-500 font-medium mt-1">
              Zero regular principal repayment due. Setup & commercial readiness grace.
            </p>
          </div>

          {/* Arrow Step 2: Repayment Begins */}
          <div className="p-3.5 rounded-xl bg-white border border-emerald-300 shadow-2xs relative">
            <span className="text-2xs font-extrabold uppercase text-emerald-800 tracking-wider">
              Step 2 • First Installment
            </span>
            <div className="text-base font-black text-slate-900 mt-1">
              Repayment Begins
            </div>
            <div className="text-xs font-bold text-emerald-700 font-mono mt-0.5">
              Quarter {repaymentBeginsQuarter} (Month {roadmap.moratoriumMonths + 1})
            </div>
            <p className="text-3xs text-slate-500 font-medium mt-1">
              Regular amortization starts as enterprise operational cashflows commence.
            </p>
          </div>

          {/* Arrow Step 3: Quarterly Repayment Schedule */}
          <div className="p-3.5 rounded-xl bg-white border border-teal-300 shadow-2xs">
            <span className="text-2xs font-extrabold uppercase text-teal-800 tracking-wider">
              Step 3 • Full Tenure
            </span>
            <div className="text-base font-black text-slate-900 mt-1">
              Quarterly Repayment Schedule
            </div>
            <div className="text-xs font-bold text-teal-700 font-mono mt-0.5">
              {formatIndianCurrency(roadmap.indicativeQuarterlyInstallment)} / quarter
            </div>
            <p className="text-3xs text-slate-500 font-medium mt-1">
              Systematic reducing-balance repayment across {roadmap.tenureYears * 4} installments.
            </p>
          </div>

        </div>
      </div>

      {/* Title & Statutory Indicative Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
          Indicative Repayment Schedule
        </h3>
        <span className="text-2xs text-slate-500 font-semibold italic">
          Dynamic calculation based on reducing balance method
        </span>
      </div>

      {/* SIH Specified 6-Column Quarterly Schedule Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-inner bg-white mb-4">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-black uppercase tracking-wider text-2xs">
              <th className="py-3 px-4">Quarter</th>
              <th className="py-3 px-4">Opening Principal</th>
              <th className="py-3 px-4">Principal Repaid</th>
              <th className="py-3 px-4">Interest</th>
              <th className="py-3 px-4">Total Repayment</th>
              <th className="py-3 px-4">Closing Principal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {displayedSchedule.map((row) => (
              <tr
                key={row.period}
                className={
                  row.isMoratorium
                    ? 'bg-amber-50/70 text-amber-900 font-semibold'
                    : 'hover:bg-slate-50/80 transition-colors text-slate-800'
                }
              >
                {/* 1. Quarter */}
                <td className="py-3 px-4 font-bold font-sans">
                  {row.periodLabel}
                  {row.isMoratorium && (
                    <span className="ml-2 badge-3d px-1.5 py-0.2 text-3xs font-extrabold bg-amber-200 text-amber-900 border border-amber-300">
                      Moratorium
                    </span>
                  )}
                </td>

                {/* 2. Opening Principal */}
                <td className="py-3 px-4 text-slate-700">
                  {formatIndianCurrency(row.openingPrincipal)}
                </td>

                {/* 3. Principal Repaid */}
                <td className="py-3 px-4 font-bold text-teal-700">
                  {row.isMoratorium ? '₹0' : formatIndianCurrency(row.principalRepaid)}
                </td>

                {/* 4. Interest */}
                <td className="py-3 px-4 text-slate-600">
                  {row.isMoratorium ? '₹0' : formatIndianCurrency(row.interest)}
                </td>

                {/* 5. Total Repayment */}
                <td className="py-3 px-4 font-black text-emerald-800">
                  {row.isMoratorium ? '₹0' : formatIndianCurrency(row.totalRepayment)}
                </td>

                {/* 6. Closing Principal */}
                <td className="py-3 px-4 font-bold text-slate-900">
                  {formatIndianCurrency(row.closingPrincipal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show Full / Fewer Schedule Toggle */}
      {schedule.length > 12 && (
        <div className="mb-4 flex items-center justify-between">
          <p className="text-2xs text-slate-400 font-medium">
            Showing {displayLimit} of {schedule.length} {frequency === 'quarterly' ? 'quarters' : 'months'}
          </p>
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="btn-3d-secondary text-xs py-2 px-4 flex items-center gap-1.5 cursor-pointer"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4" />
                <span>{t.showLessSchedule || 'Show Fewer Periods'}</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span>{t.showAllSchedule || 'Show Full Schedule'} ({schedule.length} Quarters)</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* SIH Statutory Mandatory Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <span className="font-bold text-slate-800">Important Disclaimer: </span>
          Actual repayment terms may vary according to the concerned financing authority and sanctioned loan conditions. The displayed schedule represents an indicative calculation under the SIH-defined reducing-balance model and does not constitute an officially sanctioned EMI or sanction letter.
        </p>
      </div>
    </div>
  );
};
