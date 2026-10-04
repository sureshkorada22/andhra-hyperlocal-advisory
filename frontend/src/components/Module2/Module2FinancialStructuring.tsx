import React, { useState, useMemo, useEffect } from 'react';
import {
  AnalysisResponse,
  Language
} from '../../types';
import { translations } from '../../i18n/translations';
import {
  resolveBusinessCostProfile,
  CostComponentItem,
  CostDataStatus
} from '../../services/projectCostService';
import {
  calculateReducingBalanceInstallment,
  generateRepaymentSchedule,
  SCHEME_CONFIG,
  SCHEME_MAX_LIMIT
} from '../../services/financialEngine';
import {
  MapPin,
  Briefcase,
  ArrowLeft,
  Calculator,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Info,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Building,
  Truck,
  Package,
  Wrench,
  Layers,
  FileText,
  Calendar,
  Percent,
  Clock,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface Module2FinancialStructuringProps {
  language: Language;
  analysisResult: AnalysisResponse;
  locationName: string;
  businessName: string;
  radiusKm: number;
  onBackToModule1: () => void;
  onModifySearch: () => void;
}

export const Module2FinancialStructuring: React.FC<Module2FinancialStructuringProps> = ({
  language,
  analysisResult,
  locationName,
  businessName,
  radiusKm,
  onBackToModule1,
  onModifySearch
}) => {
  const t = translations[language];

  // Helper formatters
  const formatInr = (val?: number | null) => {
    if (val == null || isNaN(val)) return '₹0';
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  // 1. Resolve initial data-driven cost profile for the business
  const initialCostProfile = useMemo(() => {
    return resolveBusinessCostProfile(businessName, analysisResult.business.category_slug);
  }, [businessName, analysisResult.business.category_slug]);

  // State: Cost components & custom overrides
  const [components, setComponents] = useState<CostComponentItem[]>(() => {
    if (initialCostProfile.components.length > 0) {
      return initialCostProfile.components.map((c) => ({ ...c }));
    }
    // Default 5 categories if unavailable
    return [
      { id: 'infra', name_en: 'Infrastructure / Setup', name_te: 'మౌలిక సదుపాయాలు / షెడ్', name_hi: 'बुनियादी ढांचा / शेड', amount: 0, icon: '🏗️', description_en: 'Shop racks, shed or space renovation', description_te: 'దుకాణం లేదా స్థల మరమ్మతులు' },
      { id: 'equipment', name_en: 'Machinery / Equipment', name_te: 'యంత్రాలు / పనిముట్లు', name_hi: 'उपकरण और मशीनरी', amount: 0, icon: '🛠️', description_en: 'Core tools, machines, or appliances', description_te: 'వ్యాపారానికి అవసరమైన యంత్రాలు' },
      { id: 'stock', name_en: 'Initial Stock / Inputs', name_te: 'ప్రారంభ స్టాక్ / ముడి సరుకులు', name_hi: 'प्रारंभिक स्टॉक / कच्चा माल', amount: 0, icon: '📦', description_en: 'First inventory batch or raw supplies', description_te: 'మొదటి విడత సరుకుల కొనుగోలు' },
      { id: 'transport', name_en: 'Transportation / Setup', name_te: 'రవాణా / అమరిక ఖర్చులు', name_hi: 'परिवहन और स्थापना', amount: 0, icon: '🚚', description_en: 'Logistics, delivery, and setup', description_te: 'సరుకుల రవాణా మరియు ఫిట్టింగ్' },
      { id: 'working_cap', name_en: 'Working Capital Buffer', name_te: 'నిర్వహణ మూలధనం (Working Capital)', name_hi: 'कार्यशील पूंजी बफर', amount: 0, icon: '💼', description_en: '1-month operational buffer for supplies', description_te: 'మొదటి నెల నిర్వహణ నగదు' }
    ];
  });

  const [isUserEdited, setIsUserEdited] = useState<boolean>(false);
  const [showScheduleTable, setShowScheduleTable] = useState<boolean>(false);
  const [scheduleView, setScheduleView] = useState<'quarterly' | 'monthly'>('quarterly');

  // Compute Total Project Cost from components
  const totalProjectCost = useMemo(() => {
    return components.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  }, [components]);

  // Cost status resolution
  const currentCostStatus: CostDataStatus = useMemo(() => {
    if (isUserEdited) return 'user_entered';
    return initialCostProfile.status;
  }, [isUserEdited, initialCostProfile.status]);

  // Handle single component edit
  const handleComponentChange = (id: string, newAmount: number) => {
    setIsUserEdited(true);
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, amount: Math.max(0, newAmount) } : c))
    );
  };

  // Quick total project cost override
  const handleTotalCostOverride = (newTotal: number) => {
    setIsUserEdited(true);
    const validTotal = Math.max(0, newTotal);
    // Pro-rate across existing components
    if (components.length > 0) {
      const currentSum = components.reduce((s, c) => s + c.amount, 0);
      if (currentSum > 0) {
        const ratio = validTotal / currentSum;
        setComponents((prev) =>
          prev.map((c) => ({ ...c, amount: Math.round(c.amount * ratio) }))
        );
      } else {
        // distribute standard ratios: 20%, 30%, 30%, 5%, 15%
        const ratios = [0.2, 0.3, 0.3, 0.05, 0.15];
        setComponents((prev) =>
          prev.map((c, idx) => ({ ...c, amount: Math.round(validTotal * (ratios[idx] || 0.2)) }))
        );
      }
    }
  };

  // =========================================================================
  // FINANCIAL STRUCTURING MATHEMATICS (SIH SCHEME RULES)
  // =========================================================================

  // 1. Entrepreneur's Own Contribution = Exactly 10% of Project Cost
  const ownContribution = Math.round(totalProjectCost * 0.10 * 100) / 100;

  // 2. Financing Required = Project Cost - Own Contribution (90%)
  const financingRequired = Math.round((totalProjectCost - ownContribution) * 100) / 100;

  // 3. Deterministic Scheme Selection
  const isOutsideLimit = totalProjectCost > SCHEME_MAX_LIMIT;
  const isMicroFinance = totalProjectCost > 0 && totalProjectCost <= SCHEME_CONFIG.MICRO_FINANCE.projectCostMax;
  const isTermLoan = totalProjectCost > SCHEME_CONFIG.MICRO_FINANCE.projectCostMax && totalProjectCost <= SCHEME_MAX_LIMIT;

  const activeScheme = isMicroFinance
    ? SCHEME_CONFIG.MICRO_FINANCE
    : isTermLoan
    ? SCHEME_CONFIG.TERM_LOAN
    : null;

  // 4. Eligible Financing = MIN(Required Financing, Scheme Maximum)
  const schemeMaxLimit = activeScheme ? activeScheme.maxLoan : 0;
  const eligibleFinancing = activeScheme
    ? Math.min(financingRequired, schemeMaxLimit)
    : 0;

  // 5. Funding Gap = Project Cost - Own Contribution - Eligible Financing
  const fundingGap = Math.max(
    0,
    Math.round((totalProjectCost - ownContribution - eligibleFinancing) * 100) / 100
  );

  // 6. Repayment Calculations (Illustrative Reducing Balance)
  const interestRatePa = activeScheme ? activeScheme.interestRate : 0.065;
  const tenureYears = activeScheme ? activeScheme.tenureYears : 3;
  const moratoriumMonths = activeScheme ? activeScheme.moratoriumMonths : 3;

  const illustrativeMonthlyEmi = useMemo(() => {
    if (eligibleFinancing <= 0) return 0;
    return calculateReducingBalanceInstallment(
      eligibleFinancing,
      interestRatePa,
      tenureYears,
      12
    );
  }, [eligibleFinancing, interestRatePa, tenureYears]);

  const illustrativeQuarterlyInstallment = useMemo(() => {
    if (eligibleFinancing <= 0) return 0;
    return calculateReducingBalanceInstallment(
      eligibleFinancing,
      interestRatePa,
      tenureYears,
      4
    );
  }, [eligibleFinancing, interestRatePa, tenureYears]);

  // Full Repayment Schedule
  const repaymentSchedule = useMemo(() => {
    if (eligibleFinancing <= 0) return [];
    return generateRepaymentSchedule(
      eligibleFinancing,
      interestRatePa,
      tenureYears,
      moratoriumMonths,
      scheduleView
    );
  }, [eligibleFinancing, interestRatePa, tenureYears, moratoriumMonths, scheduleView]);

  // Module 1 Feasibility label helper
  const opp = analysisResult.opportunity_score;
  const m1FeasibilityLabel =
    opp?.opportunity_label ||
    (opp?.opportunity_score && opp.opportunity_score >= 70
      ? 'Good Potential'
      : opp?.opportunity_score && opp.opportunity_score >= 50
      ? 'Moderate Feasibility'
      : 'Constrained Feasibility');

  const m1ScoreBadge =
    opp?.opportunity_score && opp.opportunity_score >= 70
      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
      : opp?.opportunity_score && opp.opportunity_score >= 50
      ? 'bg-amber-100 text-amber-900 border-amber-300'
      : 'bg-rose-100 text-rose-900 border-rose-300';

  // Module 1 Product Market Value connection
  const priceIndicators = analysisResult.price_indicators || [];
  const primaryPrice = priceIndicators.length > 0 ? priceIndicators[0] : null;

  // Module 1 Threat Identification connection
  const threats = analysisResult.threats || [];
  const transportThreat = threats.find((t) =>
    t.title.toLowerCase().includes('transport') ||
    t.title.toLowerCase().includes('access') ||
    t.title.toLowerCase().includes('road')
  );
  const seasonalThreat = threats.find((t) =>
    t.title.toLowerCase().includes('season') ||
    t.title.toLowerCase().includes('weather') ||
    t.title.toLowerCase().includes('climate') ||
    t.title.toLowerCase().includes('monsoon')
  );
  const competitionThreat = threats.find((t) =>
    t.title.toLowerCase().includes('competit') ||
    t.title.toLowerCase().includes('cluster')
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">

      {/* ========================================================================= */}
      {/* SECTION 1: FEASIBILITY CONTEXT CARRYOVER BANNER                           */}
      {/* ========================================================================= */}
      <div className="card-3d-surface p-5 sm:p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="badge-3d px-2.5 py-0.5 text-3xs font-black uppercase tracking-widest bg-emerald-700 text-white shadow-2xs">
                SIH 2026 • FINANCIAL STRUCTURING
              </span>
              <span className="badge-3d px-2.5 py-0.5 text-3xs font-black bg-white/80 text-emerald-900 border border-emerald-300">
                Direct Continuation of Feasibility Analysis
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs pt-1">
              {/* Location */}
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>📍 <strong className="text-slate-900">{locationName}</strong></span>
              </div>

              {/* Business */}
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Briefcase className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>🏪 <strong className="text-slate-900">{businessName}</strong></span>
              </div>

              {/* Radius */}
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <span>📏 Catchment: <strong className="text-slate-900">{radiusKm} km Radius</strong></span>
              </div>

              {/* Feasibility Assessment */}
              <div className="flex items-center gap-1.5 font-bold">
                <span>📊 Feasibility Assessment:</span>
                <span className={`badge-3d px-2.5 py-0.5 text-3xs font-black border ${m1ScoreBadge}`}>
                  {m1FeasibilityLabel} ({opp?.opportunity_score?.toFixed(0) || 'N/A'}/100)
                </span>
              </div>
            </div>

            <p className="text-2xs text-slate-600 font-semibold italic pt-1">
              "Financial structuring is based on the business and location analyzed in Feasibility Assessment."
            </p>
          </div>

          {/* Back to Feasibility Button */}
          <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
            <button
              onClick={onBackToModule1}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-emerald-500 text-slate-700 hover:text-emerald-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Feasibility Analysis</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: DATA-DRIVEN PROJECT COST & COST STATUS BADGE                   */}
      {/* ========================================================================= */}
      <section className="card-3d-surface p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-3xs font-black uppercase tracking-widest text-emerald-700">Financial Sizing</span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">1. Business Project Cost</h3>
            </div>
          </div>

          {/* Provenance Status Badge */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {currentCostStatus === 'verified' && (
              <span className="badge-3d px-3 py-1 text-xs font-black bg-emerald-50 text-emerald-950 border border-emerald-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                🟢 Verified / Source-Based
              </span>
            )}
            {currentCostStatus === 'estimated' && (
              <span className="badge-3d px-3 py-1 text-xs font-black bg-amber-50 text-amber-950 border border-amber-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                🟡 Estimated (Benchmark-Derived)
              </span>
            )}
            {currentCostStatus === 'user_entered' && (
              <span className="badge-3d px-3 py-1 text-xs font-black bg-teal-50 text-teal-950 border border-teal-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                🟡 User-Entered / Custom Override
              </span>
            )}
            {currentCostStatus === 'unavailable' && (
              <span className="badge-3d px-3 py-1 text-xs font-black bg-slate-100 text-slate-700 border border-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                ⚪ Verified Cost Data Unavailable
              </span>
            )}
          </div>
        </div>

        {/* Project Cost Top Display & Interactive Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg space-y-3">
            <span className="text-3xs uppercase font-extrabold text-emerald-400 tracking-widest block">
              Estimated Total Project Cost
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                {formatInr(totalProjectCost)}
              </span>
              <span className="text-xs text-slate-300 font-medium">
                (Inclusive of setup, machinery & working capital)
              </span>
            </div>

            <div className="pt-2 text-2xs text-slate-300 space-y-1 font-medium border-t border-slate-700/80">
              <p><strong>Source:</strong> {initialCostProfile.source}</p>
              <p><strong>Data Year:</strong> {initialCostProfile.dataYear}</p>
              <p><strong>Methodology:</strong> {initialCostProfile.methodology}</p>
              <p className="text-slate-400"><strong>Limitation:</strong> {initialCostProfile.limitation}</p>
            </div>
          </div>

          <div className="lg:col-span-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-800 uppercase tracking-wide">
                Adjust Total Project Cost (₹)
              </label>
              <span className="text-3xs font-bold text-slate-500">Edit amount anytime</span>
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-500">₹</span>
              <input
                type="number"
                min="10000"
                max="10000000"
                step="5000"
                value={totalProjectCost || ''}
                onChange={(e) => handleTotalCostOverride(parseFloat(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 bg-white font-mono font-extrabold text-slate-900 text-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-inner"
                placeholder="Enter estimated project cost"
              />
            </div>

            <p className="text-2xs text-slate-500 font-medium leading-relaxed">
              💡 You can manually override the total amount above or customize each cost line-item in the breakdown below. Overriding updates the status to <strong>User-Entered</strong>.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: BUSINESS COST BREAKDOWN TABLE                                  */}
        {/* ========================================================================= */}
        <div className="space-y-3 pt-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <span>📋 Itemized Business Cost Structure</span>
            </h4>
            <span className="text-2xs text-slate-500 font-medium">Click amounts to edit</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-3xs uppercase font-black text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-3 w-10">#</th>
                  <th className="p-3">Cost Category</th>
                  <th className="p-3">Description & Scope</th>
                  <th className="p-3 text-right">Amount (₹)</th>
                  <th className="p-3 text-center">% Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {components.map((item, idx) => {
                  const sharePct = totalProjectCost > 0 ? (item.amount / totalProjectCost) * 100 : 0;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 text-base">{item.icon}</td>
                      <td className="p-3 font-bold text-slate-900">
                        {language === 'te' ? item.name_te : language === 'hi' ? item.name_hi : item.name_en}
                      </td>
                      <td className="p-3 text-2xs text-slate-600">
                        {language === 'te' ? item.description_te : item.description_en}
                      </td>
                      <td className="p-3 text-right">
                        <div className="inline-flex items-center justify-end">
                          <span className="text-xs font-mono font-bold text-slate-400 mr-1">₹</span>
                          <input
                            type="number"
                            min="0"
                            step="1000"
                            value={item.amount || ''}
                            onChange={(e) => handleComponentChange(item.id, parseFloat(e.target.value) || 0)}
                            className="w-24 text-right px-2 py-1 rounded-md border border-slate-300 font-mono font-bold text-slate-900 focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-slate-600 text-2xs">
                        {sharePct.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-100/80 font-black text-slate-900 border-t border-slate-200">
                <tr>
                  <td colSpan={3} className="p-3 text-right text-xs uppercase tracking-wide">
                    Total Estimated Project Cost:
                  </td>
                  <td className="p-3 text-right font-mono text-base text-emerald-800">
                    {formatInr(totalProjectCost)}
                  </td>
                  <td className="p-3 text-center font-mono text-2xs">100.0%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 4: FEASIBILITY PRODUCT MARKET VALUE CONNECTION                     */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
          <div className="flex items-center gap-2">
            <span className="badge-3d px-2.5 py-0.5 text-3xs font-black bg-amber-600 text-white">
              Feasibility Connection
            </span>
            <span className="text-xs font-black text-slate-900">
              Product Market Value Benchmark (From Feasibility Phase 6)
            </span>
          </div>

          {primaryPrice ? (
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <div>
                <span className="text-3xs uppercase font-extrabold text-slate-500 block">
                  Referenced Commodity / Output
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {primaryPrice.item}
                </span>
              </div>

              <div>
                <span className="text-3xs uppercase font-extrabold text-slate-500 block">
                  Observed Market Benchmark
                </span>
                <span className="text-base font-black font-mono text-amber-900">
                  {primaryPrice.price}
                </span>
              </div>

              <div>
                <span className="text-3xs uppercase font-extrabold text-slate-500 block">
                  Official Source
                </span>
                <span className="text-xs text-slate-700 font-medium">
                  {primaryPrice.source || 'AP Agricultural Marketing / APDDCF Rate Cards'} ({primaryPrice.year || '2024'})
                </span>
              </div>

              <span className="badge-3d px-2.5 py-1 text-3xs font-black bg-emerald-100 text-emerald-950 border border-emerald-300">
                🟢 {primaryPrice.status || 'Verified in Feasibility Stage'}
              </span>
            </div>
          ) : (
            <div className="text-xs text-slate-600 font-medium pt-1">
              ⚪ <em>Verified market-price data unavailable for this specific micro-enterprise in Feasibility Phase 6. Operating revenues will depend on individual direct local trade.</em>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 & 6: FINANCIAL STRUCTURING & DETERMINISTIC SCHEME ROUTER        */}
      {/* ========================================================================= */}
      <section className="card-3d-surface p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-3xs font-black uppercase tracking-widest text-teal-700">Scheme Parameters</span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">2. Financial Structuring & Scheme Selection</h3>
            </div>
          </div>

          <span className="badge-3d px-3 py-1 text-xs font-black bg-teal-50 text-teal-950 border border-teal-300">
            Deterministic Scheme Rules
          </span>
        </div>

        {/* 3 Core Financial Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card A: Your Own Contribution (10%) */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-3xs font-extrabold uppercase tracking-wider text-slate-400">
                👤 Your Own Contribution
              </span>
              <span className="badge-3d px-2 py-0.5 text-3xs font-black bg-emerald-50 text-emerald-800 border border-emerald-200">
                10% Required
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-700">
              {formatInr(ownContribution)}
            </div>
            <p className="text-2xs text-slate-500 font-medium">
              Formula: <code>Project Cost × 10%</code>. Entrepreneur's required equity contribution.
            </p>
          </div>

          {/* Card B: Financing Required (90%) */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-3xs font-extrabold uppercase tracking-wider text-slate-400">
                🏦 Financing Required
              </span>
              <span className="badge-3d px-2 py-0.5 text-3xs font-black bg-teal-50 text-teal-800 border border-teal-200">
                90% Share
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
              {formatInr(financingRequired)}
            </div>
            <p className="text-2xs text-slate-500 font-medium">
              Formula: <code>Project Cost − Own Contribution</code>. Total debt required before scheme limits.
            </p>
          </div>

          {/* Card C: Eligible Financing */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-3xs font-extrabold uppercase tracking-wider text-slate-400">
                🏛️ Eligible Scheme Financing
              </span>
              <span className="badge-3d px-2 py-0.5 text-3xs font-black bg-blue-50 text-blue-800 border border-blue-200">
                Scheme Capped
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-blue-700">
              {formatInr(eligibleFinancing)}
            </div>
            <p className="text-2xs text-slate-500 font-medium">
              {activeScheme ? (
                <>Formula: <code>MIN(Required Financing, Scheme Max ₹{(activeScheme.maxLoan / 100000).toFixed(2)}L)</code>.</>
              ) : (
                'Evaluated upon project cost entry (Micro Finance up to ₹1.25L / Term Loan up to ₹45L).'
              )}
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* APPLICABLE SCHEME DETAIL CARD                                             */}
        {/* ========================================================================= */}
        {isOutsideLimit ? (
          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 space-y-2">
            <div className="flex items-center gap-2 font-black text-sm">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>Project Cost Outside Supported Range</span>
            </div>
            <p className="text-xs leading-relaxed font-medium">
              "The entered project cost of {formatInr(totalProjectCost)} is outside the supported financing range (up to ₹50 Lakh)."
            </p>
            <p className="text-2xs text-rose-700">
              Please adjust the project cost to ₹50,00,000 or lower to evaluate SIH 2026 Micro Finance and Term Loan schemes.
            </p>
          </div>
        ) : activeScheme ? (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-3xs font-black uppercase tracking-widest text-slate-500 block">
                  Applicable SIH Scheme
                </span>
                <h4 className="text-lg font-black text-slate-900">
                  {language === 'te' ? activeScheme.name_te : language === 'hi' ? activeScheme.name_hi : activeScheme.name_en}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="badge-3d px-3 py-1 text-xs font-black bg-emerald-100 text-emerald-950 border border-emerald-300">
                  6.5% p.a. Concessional Interest
                </span>
              </div>
            </div>

            {/* Scheme Parameter Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-3xs uppercase font-extrabold text-slate-400 block">Project Cost Range</span>
                <span className="text-sm font-black text-slate-900">{activeScheme.rangeLabel}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-3xs uppercase font-extrabold text-slate-400 block">Maximum Financing</span>
                <span className="text-sm font-black text-slate-900">{formatInr(activeScheme.maxLoan)}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-3xs uppercase font-extrabold text-slate-400 block">Repayment Tenure</span>
                <span className="text-sm font-black text-slate-900">{activeScheme.tenureYears} Years</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-3xs uppercase font-extrabold text-slate-400 block">Moratorium Period</span>
                <span className="text-sm font-black text-slate-900">{activeScheme.moratoriumMonths} Months</span>
              </div>
            </div>

            {/* Funding Gap Notice */}
            {fundingGap === 0 ? (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>🟢 No Funding Gap: The required financing fits completely within the {activeScheme.name_en} limit.</span>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 space-y-1">
                <div className="flex items-center gap-2 font-black text-sm text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>⚠️ Funding Gap Identified: {formatInr(fundingGap)}</span>
                </div>
                <p className="text-xs leading-relaxed font-medium">
                  "The project requirement exceeds the maximum financing available under the applicable scheme ({formatInr(activeScheme.maxLoan)}). Additional own contribution of {formatInr(fundingGap)} or another eligible funding arrangement may be required."
                </p>
              </div>
            )}
          </div>
        ) : null}

        {/* ========================================================================= */}
        {/* FINANCIAL STRUCTURE VISUAL DIAGRAM                                        */}
        {/* ========================================================================= */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-black text-slate-800 uppercase tracking-wide block">
            📊 Capital Structure Flow Diagram
          </span>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            {/* Visual stacked bar */}
            {totalProjectCost > 0 ? (
              <div className="h-6 w-full rounded-full overflow-hidden flex bg-slate-100 shadow-inner">
                <div
                  style={{ width: `${(ownContribution / totalProjectCost) * 100}%` }}
                  className="bg-emerald-600 h-full transition-all duration-300"
                  title={`Own Contribution: ${formatInr(ownContribution)} (10%)`}
                />
                <div
                  style={{ width: `${(eligibleFinancing / totalProjectCost) * 100}%` }}
                  className="bg-blue-600 h-full transition-all duration-300"
                  title={`Eligible Scheme Loan: ${formatInr(eligibleFinancing)}`}
                />
                {fundingGap > 0 && (
                  <div
                    style={{ width: `${(fundingGap / totalProjectCost) * 100}%` }}
                    className="bg-amber-500 h-full transition-all duration-300"
                    title={`Funding Gap: ${formatInr(fundingGap)}`}
                  />
                )}
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center text-xs text-slate-500 font-medium">
                💡 Enter an estimated project cost above to visualize equity, loan allocation, and funding gap.
              </div>
            )}

            {/* Visual Legend & Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="flex items-center gap-1.5 text-2xs font-extrabold text-emerald-800 uppercase">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> 👤 Your Contribution (10%)
                </span>
                <span className="text-lg font-black font-mono text-emerald-950 block mt-1">
                  {formatInr(ownContribution)}
                </span>
                <span className="text-3xs text-emerald-700">Entrepreneur's equity</span>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                <span className="flex items-center gap-1.5 text-2xs font-extrabold text-blue-800 uppercase">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> 🏦 Eligible Scheme Financing
                </span>
                <span className="text-lg font-black font-mono text-blue-950 block mt-1">
                  {formatInr(eligibleFinancing)}
                </span>
                <span className="text-3xs text-blue-700">Concessional 6.5% p.a.</span>
              </div>

              <div className={`p-3 rounded-xl border ${fundingGap > 0 ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'}`}>
                <span className="flex items-center gap-1.5 text-2xs font-extrabold text-slate-700 uppercase">
                  <span className={`w-2.5 h-2.5 rounded-full ${fundingGap > 0 ? 'bg-amber-500' : 'bg-slate-400'}`}></span> ⚠️ Funding Gap
                </span>
                <span className={`text-lg font-black font-mono block mt-1 ${fundingGap > 0 ? 'text-amber-950' : 'text-slate-500'}`}>
                  {formatInr(fundingGap)}
                </span>
                <span className="text-3xs text-slate-500">
                  {fundingGap > 0 ? 'Additional equity needed' : 'Fully funded by scheme'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: REPAYMENT STRUCTURE & SCHEDULE                                  */}
      {/* ========================================================================= */}
      <section className="card-3d-surface p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-3xs font-black uppercase tracking-widest text-blue-700">Amortization Model</span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">3. Illustrative Repayment Estimate</h3>
            </div>
          </div>

          <span className="badge-3d px-3 py-1 text-xs font-black bg-blue-50 text-blue-950 border border-blue-300">
            Reducing Balance Method
          </span>
        </div>

        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-950 text-2xs font-medium leading-relaxed">
          ℹ️ <strong>Methodology Note:</strong> "This is an illustrative calculation based on the available interest ({interestRatePa * 100}%) and tenure ({tenureYears} years) parameters using standard reducing-balance amortization. Actual repayment schedule and terms are determined by the concerned financing agency."
        </div>

        {/* Repayment Key Indicator Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block">💰 Financing Amount</span>
            <span className="text-base sm:text-lg font-black font-mono text-slate-900 mt-1 block">
              {formatInr(eligibleFinancing)}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block">📈 Interest Rate</span>
            <span className="text-base sm:text-lg font-black font-mono text-emerald-700 mt-1 block">
              {(interestRatePa * 100).toFixed(1)}% p.a.
            </span>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block">⏳ Loan Tenure</span>
            <span className="text-base sm:text-lg font-black font-mono text-slate-900 mt-1 block">
              {tenureYears} Years
            </span>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block">🕒 Moratorium</span>
            <span className="text-base sm:text-lg font-black font-mono text-teal-700 mt-1 block">
              {moratoriumMonths} Months
            </span>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 shadow-2xs col-span-2 sm:col-span-1">
            <span className="text-3xs uppercase font-extrabold text-emerald-800 block">💳 Monthly EMI</span>
            <span className="text-base sm:text-lg font-black font-mono text-emerald-950 mt-1 block">
              {formatInr(illustrativeMonthlyEmi)}
            </span>
          </div>
        </div>

        {/* Schedule Table Toggle Button */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Detailed Amortization Schedule:</span>
            <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-slate-100 text-2xs">
              <button
                onClick={() => setScheduleView('quarterly')}
                className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                  scheduleView === 'quarterly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Quarterly
              </button>
              <button
                onClick={() => setScheduleView('monthly')}
                className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                  scheduleView === 'monthly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowScheduleTable(!showScheduleTable)}
            className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <span>{showScheduleTable ? 'Hide Schedule' : 'View Schedule Table'}</span>
            {showScheduleTable ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Repayment Schedule Table */}
        {showScheduleTable && (
          <div className="overflow-x-auto rounded-xl border border-slate-200 mt-3 animate-in fade-in duration-200">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-3xs uppercase font-black text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-3">{scheduleView === 'quarterly' ? 'Quarter' : 'Month'}</th>
                  <th className="p-3 text-right">Opening Balance</th>
                  <th className="p-3 text-right">Principal Paid</th>
                  <th className="p-3 text-right">Interest</th>
                  <th className="p-3 text-right">Total Installment</th>
                  <th className="p-3 text-right">Closing Balance</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-2xs">
                {repaymentSchedule.map((row) => (
                  <tr
                    key={row.period}
                    className={`transition-colors ${row.isMoratorium ? 'bg-teal-50/50 text-teal-900 font-bold' : 'hover:bg-slate-50'}`}
                  >
                    <td className="p-3 font-sans font-bold">{row.periodLabel}</td>
                    <td className="p-3 text-right">{formatInr(row.openingPrincipal)}</td>
                    <td className="p-3 text-right">{formatInr(row.principalRepaid)}</td>
                    <td className="p-3 text-right">{formatInr(row.interest)}</td>
                    <td className="p-3 text-right font-black text-slate-900">{formatInr(row.totalRepayment)}</td>
                    <td className="p-3 text-right">{formatInr(row.closingPrincipal)}</td>
                    <td className="p-3 font-sans">
                      {row.isMoratorium ? (
                        <span className="badge-3d px-2 py-0.5 text-3xs font-black bg-teal-100 text-teal-950 border border-teal-300">
                          Moratorium Grace
                        </span>
                      ) : (
                        <span className="text-slate-500">Regular</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: USE FEASIBILITY RISKS & OPPORTUNITIES                          */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risks & Financial Planning Considerations */}
        <div className="card-3d-surface p-6 shadow-lg space-y-3 border border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-3xs uppercase font-extrabold text-amber-700 block tracking-wider">
                Feasibility Risk Integration
              </span>
              <h4 className="text-base font-black text-slate-900">⚠️ Financial Planning Considerations</h4>
            </div>
          </div>

          <div className="space-y-2.5 pt-1 text-xs">
            {transportThreat && (
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
                <span className="font-bold text-amber-900 block">🚚 Transportation Risk Identified in Phase 4</span>
                <p className="text-2xs text-slate-700 leading-relaxed">
                  "Transportation may increase operating costs. Consider including appropriate working capital/setup costs (allocated {formatInr(components.find((c) => c.id === 'transport')?.amount || 5000)}) to absorb freight variations."
                </p>
              </div>
            )}

            {seasonalThreat && (
              <div className="p-3 rounded-xl bg-teal-50/80 border border-teal-200 space-y-1">
                <span className="font-bold text-teal-900 block">🌦️ Seasonal Risk Identified in Phase 4</span>
                <p className="text-2xs text-slate-700 leading-relaxed">
                  "Consider seasonal working-capital requirements. Maintain at least 1–2 months of operational cash buffer to handle monsoon and seasonal sales dips."
                </p>
              </div>
            )}

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">💼 Working Capital Discipline</span>
              <p className="text-2xs text-slate-600 leading-relaxed">
                Ensure customer credit does not exceed 15 days of trade turnover. Timely collection protects monthly loan repayment obligations.
              </p>
            </div>
          </div>
        </div>

        {/* Opportunity Context (Feasibility Integration) */}
        <div className="card-3d-surface p-6 shadow-lg space-y-3 border border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-3xs uppercase font-extrabold text-emerald-700 block tracking-wider">
                Feasibility Opportunity Integration
              </span>
              <h4 className="text-base font-black text-slate-900">💡 Why This Structure is Evaluated</h4>
            </div>
          </div>

          <div className="space-y-2.5 pt-1 text-xs text-slate-700 leading-relaxed">
            <p>
              This financial structure is formulated specifically because the feasibility analysis identified:
            </p>
            <ul className="space-y-2 text-2xs pl-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Market Reach:</strong> ~{analysisResult.market_reach?.estimated_households?.toLocaleString('en-IN') || 'N/A'} households in {radiusKm} km radius provide immediate consumer base.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Demand-to-Competition:</strong> {analysisResult.market_gap?.market_gap_level || 'Moderate'} unmet demand with {analysisResult.competitors?.total_count || 0} mapped competitor units.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Opportunity Index:</strong> {opp?.opportunity_score?.toFixed(0) || 'N/A'}/100 ({m1FeasibilityLabel}) justifies capital outlay under concessional SIH parameters.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: FINAL FINANCIAL STRUCTURING SUMMARY & ADVICE                   */}
      {/* ========================================================================= */}
      <section className="card-3d-surface p-6 sm:p-8 shadow-xl border border-slate-300 space-y-6 bg-gradient-to-r from-white via-slate-50 to-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-3xs font-black uppercase tracking-widest text-emerald-700">Synthesized Plan</span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">🎯 Final Financial Structuring Summary</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Structuring Status:</span>
            {isOutsideLimit ? (
              <span className="badge-3d px-3 py-1 text-xs font-black bg-rose-100 text-rose-950 border border-rose-300">
                ⚪ Limit Exceeded
              </span>
            ) : fundingGap > 0 ? (
              <span className="badge-3d px-3 py-1 text-xs font-black bg-amber-100 text-amber-950 border border-amber-300">
                🟡 Additional Contribution Required
              </span>
            ) : totalProjectCost > 0 ? (
              <span className="badge-3d px-3 py-1 text-xs font-black bg-emerald-100 text-emerald-950 border border-emerald-300">
                🟢 Financially Structured
              </span>
            ) : (
              <span className="badge-3d px-3 py-1 text-xs font-black bg-slate-100 text-slate-700 border border-slate-300">
                ⚪ More Information Required
              </span>
            )}
          </div>
        </div>

        {/* 12-Point Master Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block">Proposed Business</span>
            <span className="font-bold text-slate-900 truncate block" title={businessName}>{businessName}</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block">Location</span>
            <span className="font-bold text-slate-900 truncate block" title={locationName}>{locationName}</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block">Feasibility Assessment</span>
            <span className="font-bold text-emerald-800 block">{m1FeasibilityLabel} ({opp?.opportunity_score?.toFixed(0)}/100)</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block">Total Project Cost</span>
            <span className="font-black font-mono text-slate-900 block">{formatInr(totalProjectCost)}</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block">Your Contribution (10%)</span>
            <span className="font-black font-mono text-emerald-700 block">{formatInr(ownContribution)}</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block">Financing Required</span>
            <span className="font-black font-mono text-slate-900 block">{formatInr(financingRequired)}</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block">Applicable Scheme</span>
            <span className="font-bold text-blue-800 truncate block" title={activeScheme ? activeScheme.name_en : isOutsideLimit ? 'Outside Range (> ₹50L)' : 'Pending Cost Entry'}>
              {activeScheme ? activeScheme.name_en : isOutsideLimit ? 'Outside Range (> ₹50L)' : 'Pending Cost Entry'}
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block">Eligible Financing</span>
            <span className="font-black font-mono text-blue-700 block">{formatInr(eligibleFinancing)}</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block">Funding Gap</span>
            <span className={`font-black font-mono block ${fundingGap > 0 ? 'text-amber-800' : 'text-slate-500'}`}>
              {formatInr(fundingGap)}
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block">Interest Rate</span>
            <span className="font-black font-mono text-slate-900 block">{(interestRatePa * 100).toFixed(1)}% p.a.</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block">Tenure / Moratorium</span>
            <span className="font-bold text-slate-900 block">{tenureYears} Years / {moratoriumMonths} Mo</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block">Illustrative Monthly EMI</span>
            <span className="font-black font-mono text-emerald-800 block">{formatInr(illustrativeMonthlyEmi)}</span>
          </div>
        </div>

        {/* Short Conclusion / Final Advice */}
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-1">
          <span className="text-3xs uppercase font-black tracking-wide text-slate-600 block">
            Final Structuring Conclusion
          </span>
          {isOutsideLimit ? (
            <p className="text-xs font-bold text-rose-900">
              ⚪ <strong>Limit Exceeded:</strong> "The entered project cost is outside the supported financing range. Reduce project scale to under ₹50 Lakh."
            </p>
          ) : fundingGap > 0 ? (
            <p className="text-xs font-bold text-amber-900">
              🟡 <strong>Additional Contribution Required:</strong> "The proposed project has a funding gap of {formatInr(fundingGap)} because the required financing exceeds the applicable scheme limit ({formatInr(activeScheme?.maxLoan)})."
            </p>
          ) : totalProjectCost > 0 ? (
            <p className="text-xs font-bold text-emerald-900">
              🟢 <strong>Financially Structured:</strong> "The project cost of {formatInr(totalProjectCost)} fits completely within the applicable {activeScheme?.name_en} financing limit ({formatInr(eligibleFinancing)}) based on the current scheme parameters."
            </p>
          ) : (
            <p className="text-xs font-bold text-slate-700">
              ⚪ <strong>More Information Required:</strong> "Reliable project-cost information is unavailable. Enter the expected project cost to continue."
            </p>
          )}
        </div>

        {/* Important Statutory Disclaimer */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 text-2xs leading-relaxed font-medium">
          ⚖️ <strong>Official Advisory Disclaimer:</strong> "This financial structure is an informational estimate based on the available scheme parameters and entered/project data. Final eligibility, sanction amount, interest terms, repayment schedule and approval are determined by the concerned financing agency and applicable government guidelines."
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
          <button
            onClick={onBackToModule1}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-emerald-500 text-slate-800 hover:text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Review Feasibility Report</span>
          </button>

          <button
            onClick={onModifySearch}
            className="btn-3d-primary w-full sm:w-auto text-xs py-2.5 px-6 flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>Analyze Another Location / Business</span>
          </button>
        </div>
      </section>

    </div>
  );
};

export default Module2FinancialStructuring;
