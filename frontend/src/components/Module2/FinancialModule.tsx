import React, { useState, useMemo } from 'react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import {
  calculateFinancialRoadmap,
  OperationalCostItem,
  WorkingCapitalItem,
} from '../../services/financialEngine';
import { StepBreadcrumb } from './StepBreadcrumb';
import { MarginInputStep } from './MarginInputStep';
import { VisualFinancialCard } from './VisualFinancialCard';
import { SchemeRoutingCard } from './SchemeRoutingCard';
import { RepaymentCalculatorCard } from './RepaymentCalculatorCard';
import { RepaymentScheduleTable } from './RepaymentScheduleTable';
import { OperationalCostsCard } from './OperationalCostsCard';
import { WorkingCapitalCard } from './WorkingCapitalCard';
import { FinancialRoadmapCard } from './FinancialRoadmapCard';
import { Sparkles, Calculator, Layers, ShieldCheck, MapPin, Briefcase } from 'lucide-react';

interface FinancialModuleProps {
  language: Language;
  marginCapital: number;
  onMarginChange: (val: number) => void;
  businessName: string;
  businessKey?: string;
  locationName: string;
  onBackToModule1: () => void;
}

export const FinancialModule: React.FC<FinancialModuleProps> = ({
  language,
  marginCapital,
  onMarginChange,
  businessName,
  businessKey,
  locationName,
  onBackToModule1,
}) => {
  const t = translations[language];

  // Deterministic calculation driven by available margin
  const roadmap = useMemo(
    () => calculateFinancialRoadmap(marginCapital),
    [marginCapital]
  );

  const [operationalCostsTotal, setOperationalCostsTotal] = useState<number>(0);
  const [workingCapitalTotal, setWorkingCapitalTotal] = useState<number>(0);

  const handleOperationalCostsChange = (total: number, _items: OperationalCostItem[]) => {
    setOperationalCostsTotal(total);
  };

  const handleWorkingCapitalChange = (total: number, _items: WorkingCapitalItem[]) => {
    setWorkingCapitalTotal(total);
  };

  const handleScrollToSchedule = () => {
    const el = document.getElementById('repayment-schedule-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 4-Stage Continuous Journey Breadcrumb */}
      <StepBreadcrumb
        language={language}
        currentStep={3}
        onBackToModule1={onBackToModule1}
        businessName={businessName}
        locationName={locationName}
      />

      {/* Module 1 Context Carryover Banner (SIH Requirement: Section 7) */}
      <div className="card-3d-surface p-4 sm:p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <span className="text-3xs uppercase font-extrabold text-slate-500 tracking-wider block">
                  Proposed Business Category
                </span>
                <span className="text-sm sm:text-base font-black text-slate-900">
                  Business: <span className="text-emerald-800">{businessName}</span>
                </span>
              </div>
            </div>

            <div className="hidden sm:block h-7 w-px bg-slate-200" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-3xs uppercase font-extrabold text-slate-500 tracking-wider block">
                  Geographic Location
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-800">
                  Location: <span className="text-slate-900">{locationName}</span>
                </span>
              </div>
            </div>
          </div>

          <span className="badge-3d px-2.5 py-1 text-2xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 self-start sm:self-auto">
            From Module 1 Feasibility
          </span>
        </div>
      </div>

      {/* Module 2 3D Hero Banner */}
      <div className="card-3d-hero p-7 sm:p-9 text-white relative">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="badge-3d px-3.5 py-1 text-xs font-black uppercase tracking-widest bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-emerald-300" />
              MODULE 2
            </span>
            <span className="badge-3d px-3 py-1 text-xs font-black bg-white/15 text-white border border-white/20">
              SIH26091
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black mt-3.5 tracking-tight leading-snug drop-shadow-sm">
            SMART FINANCIAL CALCULATOR & SCHEME ROUTER
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 mt-2 max-w-2xl font-medium leading-relaxed drop-shadow-xs">
            Automatically process your available margin capital into a comprehensive financial roadmap with 10% own equity sizing, 90% loan routing, and quarterly repayment schedule.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-extrabold text-emerald-100">
            <div className="badge-3d bg-white/15 px-3.5 py-1.5 border border-white/25 backdrop-blur-xs">
              <Calculator className="w-4 h-4 text-emerald-300 mr-1.5" />
              <span>10% Margin • 90% Concessional Loan</span>
            </div>
            <div className="badge-3d bg-white/15 px-3.5 py-1.5 border border-white/25 backdrop-blur-xs">
              <Layers className="w-4 h-4 text-emerald-300 mr-1.5" />
              <span>Micro Finance & Term Loan Routing</span>
            </div>
            <div className="badge-3d bg-white/15 px-3.5 py-1.5 border border-white/25 backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-300 mr-1.5" />
              <span>Moratorium-Aware Quarterly Schedule</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step 1: Available Margin Capital Input */}
      <MarginInputStep
        language={language}
        marginCapital={marginCapital}
        onMarginChange={onMarginChange}
      />

      {/* Step 2: Financial Structuring (10% Contribution / 90% Loan Model) */}
      <VisualFinancialCard
        language={language}
        roadmap={roadmap}
      />

      {/* Step 3: Automatic Scheme Routing (Micro Finance vs Term Loan vs Limit) */}
      <SchemeRoutingCard
        language={language}
        roadmap={roadmap}
      />

      {/* Step 4: EMI & Moratorium Generator */}
      <RepaymentCalculatorCard
        language={language}
        roadmap={roadmap}
      />

      {/* Step 5: Expected Quarterly Repayment Schedule Table */}
      <RepaymentScheduleTable
        language={language}
        roadmap={roadmap}
      />

      {/* Step 6: Operational Costs (Section 4 SIH Requirement) */}
      <OperationalCostsCard
        language={language}
        roadmap={roadmap}
        businessKey={businessKey}
        businessName={businessName}
        onChange={handleOperationalCostsChange}
      />

      {/* Step 7: Working Capital Requirement (Section 5 SIH Requirement) */}
      <WorkingCapitalCard
        language={language}
        roadmap={roadmap}
        businessKey={businessKey}
        businessName={businessName}
        onChange={handleWorkingCapitalChange}
      />

      {/* Step 8: Final Financial Roadmap Summary (Section 6 SIH Requirement) */}
      <FinancialRoadmapCard
        language={language}
        roadmap={roadmap}
        operationalCostsTotal={operationalCostsTotal}
        workingCapitalTotal={workingCapitalTotal}
        businessName={businessName}
        locationName={locationName}
        onBackToModule1={onBackToModule1}
        onScrollToSchedule={handleScrollToSchedule}
      />

    </div>
  );
};
