import React, { useState } from 'react';
import {
  AnalysisResponse,
  Language
} from '../../types';
import { translations } from '../../i18n/translations';
import { MapSection } from './MapSection';
import { resolveExactLocation } from '../../services/locationDescriptor';
import {
  MapPin,
  Briefcase,
  ArrowLeft,
  Users,
  Store,
  Navigation,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  ShieldAlert,
  Tag,
  Info,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  Activity,
  Target,
  Printer,
  HelpCircle,
  CloudRain,
  ArrowRight
} from 'lucide-react';


interface Module1FeasibilityReportProps {
  language: Language;
  analysisResult: AnalysisResponse;
  locationName: string;
  businessName: string;
  radiusKm: number;
  marginCapital?: number;
  onModifySearch: () => void;
  onOpenContributeModal?: () => void;
  onProceedToModule2?: () => void;
}

export const Module1FeasibilityReport: React.FC<Module1FeasibilityReportProps> = ({
  language,
  analysisResult,
  locationName,
  businessName,
  radiusKm,
  marginCapital,
  onModifySearch,
  onOpenContributeModal,
  onProceedToModule2
}) => {
  const t = translations[language];

  // Accordion / Details Toggles
  const [showSettlementsList, setShowSettlementsList] = useState(false);
  const [showCompetitorsTable, setShowCompetitorsTable] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Audio Speech synthesis for rural accessibility
  const explanationText =
    language === 'te'
      ? (analysisResult.ai_explanation.te || analysisResult.ai_explanation.selected_language_text)
      : language === 'hi'
      ? (analysisResult.ai_explanation.hi || analysisResult.ai_explanation.selected_language_text)
      : (analysisResult.ai_explanation.en || analysisResult.ai_explanation.selected_language_text);

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert("Speech synthesis is not supported on this browser.");
      return;
    }
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(explanationText);
    utterance.lang = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.92;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  // Helper extraction
  const reach = analysisResult.market_reach;
  const census = reach?.census_baseline;
  const comp = analysisResult.competitors;
  const gap = analysisResult.market_gap;
  const access = analysisResult.accessibility;
  const oppScore = analysisResult.opportunity_score;
  const swot = analysisResult.swot;
  const budgetFeasibility = analysisResult.budget_feasibility;
  const threats = analysisResult.threats || [];
  const prices = analysisResult.price_indicators || [];
  const suggestedValuation = analysisResult.suggested_price_valuation;
  const operatingCosts = analysisResult.operating_cost_indicators;
  const landscape = analysisResult.business_landscape;
  const weather = analysisResult.weather;

  // Sector identification for dynamic data source selection logic
  const catSlug = (analysisResult.business.category_slug || '').toLowerCase();
  const bNameLower = (businessName || '').toLowerCase();
  const isAgri = catSlug === 'agriculture_farming' || bNameLower.includes('farm') || bNameLower.includes('crop') || bNameLower.includes('organic') || bNameLower.includes('seed') || bNameLower.includes('fertilizer');
  const isDairy = catSlug === 'dairy_livestock' || bNameLower.includes('milk') || bNameLower.includes('dairy') || bNameLower.includes('cattle') || bNameLower.includes('poultry') || bNameLower.includes('cow') || bNameLower.includes('buffalo');
  const isFisheries = bNameLower.includes('fish') || bNameLower.includes('prawn') || bNameLower.includes('shrimp') || bNameLower.includes('aqua');
  const isFood = catSlug === 'food_beverages' || bNameLower.includes('restaurant') || bNameLower.includes('hotel') || bNameLower.includes('food') || bNameLower.includes('bakery') || bNameLower.includes('tiffin');
  const isWeatherRelevant = isAgri || isDairy || isFisheries || isFood || catSlug === 'environment_sustainability';

  // Potential customer segments fallback by category if not present
  const customerSegments = analysisResult.business.customer_segments?.length
    ? analysisResult.business.customer_segments
    : [
        "Local village & mandal households (daily essentials)",
        "Weekly shandy (santalu) buyers & surrounding hamlets",
        "Small commercial shops, tea stalls & local retailers",
        "Agricultural & artisan workforce"
      ];

  // Local distribution channels
  const distributionChannels = [
    {
      title_en: "Direct Village Retail & Doorstep Delivery",
      title_te: "గ్రామ రిటైల్ విక్రయం మరియు డోర్‌స్టెప్ సేవలు",
      desc_en: "Immediate walk-in customers and morning/evening recurring transactions.",
      desc_te: "రోజూ నడిచివచ్చే గ్రామీణ వినియోగదారులు మరియు ప్రత్యక్ష అమ్మకాలు."
    },
    {
      title_en: "Weekly Village Markets (Shandies / Santalu)",
      title_te: "వారపు గ్రామీణ సంతలు (Shandies / Santalu)",
      desc_en: "High volume weekly cash turnover connecting surrounding 5–10 km habitations.",
      desc_te: "చుట్టుపక్కల 5-10 కి.మీ గ్రామాల నుండి వచ్చే భారీ ప్రజాసమూహం."
    },
    {
      title_en: "Rythu Bharosa Kendras (RBKs) & APMC Mandis",
      title_te: "రైతు భరోసా కేంద్రాలు (RBKs) & మార్కెట్ యార్డులు",
      desc_en: "Institutional aggregation and agricultural/dairy input-output linkages.",
      desc_te: "ప్రభుత్వ మరియు సహకార సంస్థాగత అనుసంధాన కేంద్రాలు."
    },
    {
      title_en: "Mandal Commercial Nodes & Road Junctions",
      title_te: "మండల వాణిజ్య కేంద్రాలు మరియు బస్ స్టాండ్ కూడళ్లు",
      desc_en: "Transit footfall and wholesale supply connection to nearby towns.",
      desc_te: "రవాణా కూడళ్లు మరియు పట్టణ హోల్‌సేల్ వ్యాపారులతో అనుసంధానం."
    }
  ];

  // Pricing Strategy determination
  const directCount = comp.direct_count;
  const density = comp.competitor_density;
  let pricingStrategyTitle = "Competitive Value Pricing";
  let pricingStrategyBadge = "bg-emerald-100 text-emerald-950 border-emerald-300";
  let pricingStrategyBasis = `Balanced competitor presence (${directCount} direct units identified) supports matching prevailing AP market benchmarks while differentiating on quality, freshness, and reliable doorstep service.`;

  if (directCount >= 5 || density > 2.0) {
    pricingStrategyTitle = "Penetration Pricing";
    pricingStrategyBadge = "bg-amber-100 text-amber-950 border-amber-300";
    pricingStrategyBasis = `Higher local competitor density (${directCount} direct sellers detected in records) recommends introductory promotional pricing or loyalty bundling to capture local market share.`;
  } else if (directCount === 0) {
    pricingStrategyTitle = "Quality / Early-Mover Pricing";
    pricingStrategyBadge = "bg-teal-100 text-teal-950 border-teal-300";
    pricingStrategyBasis = `Zero direct competitors identified in digital records within ${radiusKm} km creates a first-mover advantage to command sustainable operating margins.`;
  }

  // Formatting helpers
  const formatNum = (val?: number | null) => (val !== undefined && val !== null ? val.toLocaleString('en-IN') : 'N/A');

  // =========================================================================
  // STEP 0 — BUSINESS FEASIBILITY CALCULATION (Deterministic - NO Math.random())
  // =========================================================================
  const hasPopulationData = reach?.estimated_population != null && reach.estimated_population > 0;
  const hasCompetitorData = comp != null;
  const isDataSufficient = hasPopulationData && hasCompetitorData;
  const feasibilityScore = oppScore?.opportunity_score ?? 0;

  let feasibilityBadge = "⚪ Insufficient Verified Data";
  let feasibilityBadgeClass = "bg-slate-100 text-slate-800 border-slate-300";
  let feasibilityCardBg = "from-slate-50 via-white to-slate-100 border-slate-300";
  let feasibilityDotClass = "bg-slate-400";
  let feasibilityExplanation = "Insufficient verified data to determine business feasibility.";

  if (!isDataSufficient) {
    feasibilityBadge = "⚪ Insufficient Verified Data";
    feasibilityExplanation = "Insufficient verified data to determine business feasibility.";
  } else if (feasibilityScore >= 70) {
    feasibilityBadge = "🟢 Good Potential";
    feasibilityBadgeClass = "bg-emerald-100 text-emerald-950 border-emerald-400";
    feasibilityCardBg = "from-emerald-50 via-teal-50/40 to-white border-emerald-300";
    feasibilityDotClass = "bg-emerald-500";
    feasibilityExplanation = `Based on the available local market, demographic, competition (${comp.direct_count} direct units) and business data (~${formatNum(reach?.estimated_households)} households within ${radiusKm} km), this location shows good potential for the selected business.`;
  } else if (feasibilityScore >= 45) {
    feasibilityBadge = "🟡 Moderate Potential";
    feasibilityBadgeClass = "bg-amber-100 text-amber-950 border-amber-400";
    feasibilityCardBg = "from-amber-50 via-orange-50/30 to-white border-amber-300";
    feasibilityDotClass = "bg-amber-500";
    feasibilityExplanation = `Based on the available local population (${formatNum(reach?.estimated_population)}) and competitor density (${comp.competitor_density}/km²), this location shows moderate potential for the selected business. Differentiation and cost discipline are advised.`;
  } else {
    feasibilityBadge = "🔴 Low Potential";
    feasibilityBadgeClass = "bg-rose-100 text-rose-950 border-rose-400";
    feasibilityCardBg = "from-rose-50 via-red-50/30 to-white border-rose-300";
    feasibilityDotClass = "bg-rose-500";
    feasibilityExplanation = `High competitor concentration (${comp.direct_count} direct units) or constrained immediate catchment population within ${radiusKm} km limits immediate unserved demand for the selected business.`;
  }

  // Final Advice Recommendation
  let finalRecommendation: 'Suitable' | 'Needs Further Validation' | 'Insufficient Data' = 'Needs Further Validation';
  let finalRecommendationBadge = 'bg-amber-100 text-amber-950 border-amber-300';
  let advicePoints: { label: string; text: string }[] = [];

  if (!isDataSufficient) {
    finalRecommendation = 'Insufficient Data';
    finalRecommendationBadge = 'bg-slate-100 text-slate-800 border-slate-300';
    advicePoints = [
      { label: "Market Reach", text: "Census demographic baseline could not be verified for this exact coordinate." },
      { label: "Competition", text: "Physical field survey required to verify unmapped local sellers." },
      { label: "Main Risk", text: "Committing capital without verified customer catchment data." }
    ];
  } else if (feasibilityScore >= 70) {
    finalRecommendation = 'Suitable';
    finalRecommendationBadge = 'bg-emerald-100 text-emerald-950 border-emerald-400';
    advicePoints = [
      { label: "Market Reach", text: `Strong: Catchment of ~${formatNum(reach?.estimated_households)} households provides sustained daily demand within ${radiusKm} km.` },
      { label: "Competition", text: `Manageable: ${comp.direct_count} direct competitors detected (${comp.competitor_density}/km²), supporting healthy operating margins.` },
      { label: "Main Risk", text: threats.length > 0 ? `${threats[0].title}: ${threats[0].reason}` : "Ensure reliable local working capital and raw material sourcing." }
    ];
  } else if (feasibilityScore >= 45) {
    finalRecommendation = 'Needs Further Validation';
    finalRecommendationBadge = 'bg-amber-100 text-amber-950 border-amber-400';
    advicePoints = [
      { label: "Market Reach", text: `Moderate: ${formatNum(reach?.estimated_population)} persons in catchment area (${radiusKm} km radius).` },
      { label: "Competition", text: `Active: ${comp.direct_count} direct competitors serving this catchment (${comp.competitor_density}/km²).` },
      { label: "Main Risk", text: "Customer acquisition requires differentiation (e.g. doorstep service, freshness, flexible hours)." }
    ];
  } else {
    finalRecommendation = 'Needs Further Validation';
    finalRecommendationBadge = 'bg-rose-100 text-rose-950 border-rose-400';
    advicePoints = [
      { label: "Market Reach", text: "Constrained relative to existing commercial density." },
      { label: "Competition", text: `High: ${comp.direct_count} direct competitors are currently active in this catchment.` },
      { label: "Main Risk", text: "Margin compression from intense local price competition." }
    ];
  }

  // Clean market gap label helper (prevents "High Market Gap Market Gap" stutter)
  const cleanMarketGap = gap?.market_gap_level
    ? gap.market_gap_level.replace(/\s*market\s*gap\s*$/i, '').trim() + ' Gap'
    : 'Moderate Gap';

  // Threats segregation helper: Separates strictly verified local risks from general sector business risks
  const isLocalThreat = (th: any) => {
    const cat = (th.category || '').toLowerCase();
    return (
      cat.includes('competition') ||
      cat.includes('transport') ||
      cat.includes('logistics') ||
      cat.includes('climate') ||
      cat.includes('weather') ||
      cat.includes('environment') ||
      cat.includes('seasonal') ||
      cat.includes('infrastructure') ||
      cat.includes('local') ||
      cat.includes('road')
    );
  };
  const verifiedLocalThreats = threats.filter(th => isLocalThreat(th));
  const generalBusinessThreats = threats.filter(th => !isLocalThreat(th));

  // Print helper
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-7 animate-in fade-in duration-300">

      {/* ========================================================================= */}
      {/* REPORT HEADER & INPUT CONFIRMATION                                        */}
      {/* ========================================================================= */}
      <div className="card-3d-hero p-6 sm:p-8 text-white relative shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="badge-3d px-3 py-1 bg-white/20 text-white text-2xs font-black uppercase tracking-wider">
                SIH 2026
              </span>
              <span className="badge-3d px-3 py-1 bg-emerald-500/40 text-emerald-100 text-2xs font-extrabold border border-emerald-400/40">
                Andhra Pradesh Only
              </span>
            </div>

            {/* Quick Actions: Print & Audio Advisory */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handlePrint}
                className="badge-3d px-3.5 py-1.5 bg-white/15 hover:bg-white/25 active:bg-white/30 text-white font-extrabold border border-white/30 text-xs flex items-center gap-1.5 cursor-pointer backdrop-blur-xs transition-all shadow-xs"
                title="Print or Save PDF"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-200" />
                <span>Print Report</span>
              </button>

              <button
                onClick={handleToggleAudio}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md ${
                  isPlayingAudio
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-white text-emerald-900 hover:bg-emerald-50'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>{t.audioStop || "Stop Audio"}</span>
                    <Activity className="w-3.5 h-3.5 animate-pulse" />
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-700" />
                    <span>{language === 'te' ? "వ్యాపార సలహా వినండి" : language === 'hi' ? "ऑडियो सलाह सुनें" : "Listen to Advisory"}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-sm">
            Hyper-Local Business Feasibility Analysis
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-3xl font-medium leading-relaxed">
            {language === 'te'
              ? 'ఆంధ్రప్రదేశ్‌లోని ఎంపిక చేసిన ప్రాంతం కోసం 6 అధికారిక విశ్లేషణ దశలతో కూడిన ఖచ్చితమైన సాధ్యాసాధ్యాల నివేదిక.'
              : language === 'hi'
              ? 'आंध्र प्रदेश में चयनित स्थान के लिए 6 आधिकारिक विश्लेषण चरणों पर आधारित सटीक व्यवहार्यता रिपोर्ट।'
              : 'Empirical data-driven feasibility analysis covering all six SIH-mandated phases: Market Reach, Opportunity Analysis, SWOT, Threat Identification, Competitor Mapping, and Product Market Value.'}
          </p>

          {/* User Input Confirmation Summary Grid */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-3xs font-extrabold text-emerald-200 uppercase tracking-wider block">
                1. 📍 Selected Location
              </span>
              <span className="text-sm font-black text-white flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="truncate">{locationName}</span>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-3xs font-extrabold text-emerald-200 uppercase tracking-wider block">
                2. 🏪 Selected Business
              </span>
              <span className="text-sm font-black text-white flex items-center gap-1.5 mt-0.5">
                <Briefcase className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="truncate">{businessName}</span>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-3xs font-extrabold text-emerald-200 uppercase tracking-wider block">
                3. 📏 Analysis Radius
              </span>
              <span className="text-sm font-black text-white flex items-center gap-1.5 mt-0.5">
                <Navigation className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>{radiusKm} KM Catchment</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 0 — BUSINESS FEASIBILITY SNAPSHOT                                     */}
      {/* ========================================================================= */}
      <section className={`card-3d-surface p-6 sm:p-7 shadow-xl border bg-gradient-to-r ${feasibilityCardBg} space-y-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white text-slate-900 flex items-center justify-center border border-slate-200 shrink-0 shadow-xs">
              <Store className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <span className="text-3xs font-black uppercase tracking-widest text-slate-500 block">
                Overall Feasibility Snapshot
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>🏪 Business Feasibility</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className={`badge-3d px-3.5 py-1 text-xs font-black border flex items-center gap-1.5 ${feasibilityBadgeClass}`}>
              <span className={`w-2 h-2 rounded-full ${feasibilityDotClass} animate-pulse`} />
              <span>{feasibilityBadge}</span>
            </span>
            {isDataSufficient && (
              <span className="badge-3d px-2.5 py-1 bg-white text-slate-700 font-mono font-black text-xs border border-slate-200">
                {feasibilityScore.toFixed(1)} / 100
              </span>
            )}
          </div>
        </div>

        {/* Short Plain-Language Explanation */}
        <div className="p-4 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs">
          <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
            &ldquo;{feasibilityExplanation}&rdquo;
          </p>
          <div className="mt-2.5 flex items-center gap-3 text-2xs text-slate-500 font-semibold flex-wrap">
            <span>• Calculation: Deterministic opportunity index derived from Census 2011 demographics & OSM competitor density</span>
            <span>• No randomized guessing</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* QUICK SUMMARY (4 COMPACT CARDS)                                           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Card 1: Market Reach */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-all">
          <div className="flex items-start justify-between gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <Users className="w-5 h-5" />
            </div>
            <span className="badge-3d text-3xs font-black px-2 py-0.5 bg-emerald-50 text-emerald-950 border border-emerald-300">
              {hasPopulationData ? '🟢 Verified Data' : '⚪ Data Unavailable'}
            </span>
          </div>
          <div className="mt-3">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block tracking-wider">
              👥 Market Reach
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-0.5 block">
              {formatNum(reach?.estimated_population)}
            </span>
            <p className="text-xs text-slate-600 font-medium mt-1">
              ~{formatNum(reach?.estimated_households)} households • {reach?.identified_settlements_count || 1} settlements in {radiusKm} km
            </p>
          </div>
        </div>

        {/* Card 2: Competition */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-rose-300 transition-all">
          <div className="flex items-start justify-between gap-2">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-200">
              <Store className="w-5 h-5" />
            </div>
            <span className="badge-3d text-3xs font-black px-2 py-0.5 bg-rose-50 text-rose-950 border border-rose-300">
              🟢 Verified Data
            </span>
          </div>
          <div className="mt-3">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block tracking-wider">
              🏪 Competition
            </span>
            <span className="text-xl sm:text-2xl font-black text-rose-700 font-mono mt-0.5 block">
              {comp.direct_count} Direct {comp.indirect_count > 0 ? `• ${comp.indirect_count} Indirect` : 'Units'}
            </span>
            <p className="text-xs text-slate-600 font-medium mt-1">
              {comp.total_count > 0
                ? `${comp.total_count} mapped (${comp.competitor_density} units/km² • Nearest ${comp.nearest_competitor_km?.toFixed(1) || '0'} km)`
                : `0 direct units mapped in ${radiusKm} km radius`}
            </p>
          </div>
        </div>

        {/* Card 3: Opportunity */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-teal-300 transition-all">
          <div className="flex items-start justify-between gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="badge-3d text-3xs font-black px-2 py-0.5 bg-teal-50 text-teal-950 border border-teal-300">
              🟡 Estimated
            </span>
          </div>
          <div className="mt-3">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block tracking-wider">
              💡 Opportunity
            </span>
            <span className="text-xl sm:text-2xl font-black text-teal-700 font-mono mt-0.5 block">
              {oppScore?.opportunity_score != null ? `${oppScore.opportunity_score.toFixed(0)}/100` : 'N/A'}
            </span>
            <p className="text-xs text-slate-600 font-medium mt-1 truncate" title={gap?.reason || `${cleanMarketGap} Level`}>
              {cleanMarketGap} • {gap?.households_per_competitor_ratio != null ? `${formatNum(gap.households_per_competitor_ratio)}:1 ratio` : 'Early mover potential'}
            </p>
          </div>
        </div>

        {/* Card 4: Market Value (Consistent with Phase 6 - NO Paddy price shown for non-paddy businesses!) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-amber-300 transition-all">
          <div className="flex items-start justify-between gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
              <Tag className="w-5 h-5" />
            </div>
            <span className="badge-3d text-3xs font-black px-2 py-0.5 bg-amber-50 text-amber-950 border border-amber-300">
              {suggestedValuation?.is_calculable && suggestedValuation.suggested_range
                ? '🟢 Verified Data'
                : '⚪ Data Unavailable'}
            </span>
          </div>
          <div className="mt-3">
            <span className="text-3xs uppercase font-extrabold text-slate-400 block tracking-wider">
              💰 Market Value
            </span>
            <span className="text-xl sm:text-2xl font-black text-amber-700 font-mono mt-0.5 block truncate">
              {suggestedValuation?.is_calculable && suggestedValuation.suggested_range
                ? suggestedValuation.suggested_range
                : "Data Unavailable"}
            </span>
            <p className="text-xs text-slate-600 font-medium mt-1 truncate" title={suggestedValuation?.item || `Insufficient verified price data for ${businessName}`}>
              {suggestedValuation?.is_calculable && suggestedValuation.item
                ? `Benchmark: ${suggestedValuation.item}`
                : `Insufficient verified price data for ${businessName}`}
            </p>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* PHASE 1 — MARKET REACH                                                    */}
      {/* ========================================================================= */}
      <section className="card-3d-surface p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-300 shrink-0 shadow-2xs">
              <Users className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">1. Market Reach</h3>
            </div>
          </div>
          <span className="badge-3d px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-black self-start sm:self-auto">
            {radiusKm} km Radius Catchment
          </span>
        </div>

        {/* Purpose Question */}
        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
          <span><strong>Purpose:</strong> Answers &quot;Who can potentially buy from this business?&quot;</span>
        </div>


        {/* Visual Catchment Summary Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-3xs font-extrabold uppercase text-slate-400 block">📍 Selected Location</span>
            <span className="text-sm font-black text-slate-900 block mt-0.5 truncate">{locationName}</span>
            <span className="text-3xs text-slate-500 font-medium block">{analysisResult.location.district} District</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-3xs font-extrabold uppercase text-slate-400 block">⭕ Selected Radius</span>
            <span className="text-sm font-black text-slate-900 block mt-0.5">{radiusKm} km Circle</span>
            <span className="text-3xs text-emerald-700 font-bold block">{reach?.area_sq_km} km² Area</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-3xs font-extrabold uppercase text-slate-400 block">👥 Catchment Population</span>
            <span className="text-sm font-black text-slate-900 font-mono block mt-0.5">{formatNum(reach?.estimated_population)}</span>
            <span className="text-3xs text-slate-500 font-medium block">~{formatNum(reach?.estimated_households)} Households</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-3xs font-extrabold uppercase text-slate-400 block">🏘️ Nearby Settlements</span>
            <span className="text-sm font-black text-slate-900 font-mono block mt-0.5">
              {reach?.settlement_samples?.length || 0} Habitations
            </span>
            <span className="text-3xs text-slate-500 font-medium block">Within {radiusKm} km bounds</span>
          </div>
        </div>

        {/* Population / Customer Data Integrity Notice */}
        <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300 text-xs text-slate-700 flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-500 shrink-0" />
          <span>
            Verified customer-level data is unavailable. Population/household data is shown as a market-reach indicator.
          </span>
        </div>

        {/* Nearby Settlements / Habitations (Actual geographic coordinates) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-emerald-600" />
              <span>Nearby Settlements ({reach?.settlement_samples?.length || 0} Mapped from Geographic Data)</span>
            </h4>
            {reach?.settlement_samples && reach.settlement_samples.length > 4 && (
              <button
                onClick={() => setShowSettlementsList(!showSettlementsList)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                <span>{showSettlementsList ? "Show Less" : `View All (${reach.settlement_samples.length})`}</span>
                {showSettlementsList ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {reach?.settlement_samples && reach.settlement_samples.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {(showSettlementsList ? reach.settlement_samples : reach.settlement_samples.slice(0, 4)).map((s, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                  <div className="truncate">
                    <span className="text-xs font-black text-slate-800 block truncate">{s.name}</span>
                    <span className="text-3xs uppercase text-slate-500 font-extrabold">{s.type || "Village"}</span>
                  </div>
                  <span className="badge-3d text-3xs font-mono font-black px-2 py-0.5 bg-emerald-100 text-emerald-950 border border-emerald-300 shrink-0">
                    {s.distance_km.toFixed(1)} km
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
              <Info className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Settlement boundary samples are aggregated from Census district coverage.</span>
            </div>
          )}
        </div>

        {/* Customer Segments & Distribution Channels Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200">
            <h5 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-teal-600" />
              <span>Relevant Customer Segments</span>
            </h5>
            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              {customerSegments.map((seg, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{seg}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200">
            <h5 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
              <Store className="w-4 h-4 text-emerald-600" />
              <span>Potential Distribution & Reach Area</span>
            </h5>
            <ul className="space-y-2 text-xs text-slate-700 font-semibold">
              {distributionChannels.map((ch, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                  <div>
                    <strong className="text-slate-900 block font-bold">
                      {language === 'te' ? ch.title_te : ch.title_en}
                    </strong>
                    <span className="text-3xs text-slate-500 font-medium block">
                      {language === 'te' ? ch.desc_te : ch.desc_en}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Road Transit & Accessibility */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 border border-teal-300">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <span className="text-3xs font-extrabold uppercase text-slate-500 block">Accessibility & Transit Connectivity</span>
              <span className="font-black text-slate-900 text-sm">
                Score: {access?.accessibility_score != null ? `${access.accessibility_score.toFixed(0)}/100` : "Data unavailable"} • {access?.accessibility_level || "Moderate Connectivity"}
              </span>
            </div>
          </div>
          <div className="text-2xs text-slate-600 max-w-sm sm:text-right">
            Evaluated via OpenStreetMap arterial highway proximity, APSRTC transit nodes, and PMGSY rural road connectivity.
          </div>
        </div>


      </section>

      {/* ========================================================================= */}
      {/* PHASE 2 — OPPORTUNITY ANALYSIS                                            */}
      {/* ========================================================================= */}
      <section className="card-3d-surface p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center border border-teal-300 shrink-0 shadow-2xs">
              <TrendingUp className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">2. Opportunity Analysis</h3>
            </div>
          </div>
          <span className="badge-3d px-3 py-1 bg-teal-50 text-teal-900 border border-teal-300 text-xs font-black self-start sm:self-auto">
            Score: {oppScore?.opportunity_score?.toFixed(0) || 'N/A'}/100
          </span>
        </div>

        {/* Purpose Question */}
        <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 text-xs font-bold text-teal-950 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-teal-700 shrink-0" />
          <span><strong>Purpose:</strong> Answers &quot;Is there a market opportunity for this business in this location?&quot;</span>
        </div>

        {/* 4 Strong Evidence-Based Opportunity Points (Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Point 1: Customer Availability */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase tracking-wider mb-2">
              <Users className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>👥 Customer Availability</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              ~{formatNum(reach?.estimated_households)} households ({formatNum(reach?.estimated_population)} persons) within {radiusKm} km radius.
            </p>
            <p className="text-2xs text-slate-500 font-medium mt-1.5">
              Verified by Census 2011 demographic density in {analysisResult.location.district} district.
            </p>
          </div>

          {/* Point 2: Competition Level */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-rose-800 font-black text-xs uppercase tracking-wider mb-2">
              <Store className="w-4 h-4 text-rose-600 shrink-0" />
              <span>🏪 Competition</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              {comp.direct_count <= 2
                ? `Low Competition: Only ${comp.direct_count} direct competitor(s) identified within ${radiusKm} km.`
                : comp.direct_count <= 6
                ? `Moderate Competition: ${comp.direct_count} direct competitors detected in this catchment.`
                : `Active Competition: ${comp.direct_count} direct competitors detected (${comp.competitor_density}/km²).`}
            </p>
            <p className="text-2xs text-slate-500 font-medium mt-1.5">
              Verified by OpenStreetMap live node querying within {radiusKm} km radius.
            </p>
          </div>

          {/* Point 3: Local Reach */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-teal-800 font-black text-xs uppercase tracking-wider mb-2">
              <Navigation className="w-4 h-4 text-teal-600 shrink-0" />
              <span>📍 Local Reach</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              {reach?.area_sq_km} km² geographic catchment connecting {reach?.settlement_samples?.length || 0} mapped habitations.
            </p>
            <p className="text-2xs text-slate-500 font-medium mt-1.5">
              Accessibility score of {access?.accessibility_score != null ? `${access.accessibility_score.toFixed(0)}/100` : "moderate"} enables reliable logistics.
            </p>
          </div>

          {/* Point 4: Market Gap */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-amber-800 font-black text-xs uppercase tracking-wider mb-2">
              <TrendingUp className="w-4 h-4 text-amber-600 shrink-0" />
              <span>📈 Market Gap</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              {gap?.households_per_competitor_ratio != null
                ? `~${formatNum(gap.households_per_competitor_ratio)} households per competitor (${cleanMarketGap}).`
                : "Zero direct competitors found in digital records, indicating early-mover opportunity."}
            </p>
            <p className="text-2xs text-slate-500 font-medium mt-1.5">
              Derived from catchment population-to-competitor ratio.
            </p>
          </div>

        </div>


      </section>

      {/* ========================================================================= */}
      {/* PHASE 3 — SWOT ANALYSIS                                                   */}
      {/* ========================================================================= */}
      <section className="card-3d-surface p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-300 shrink-0 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">3. SWOT Analysis</h3>
            </div>
          </div>
          {budgetFeasibility && (
            <span className="badge-3d px-3 py-1 bg-emerald-50 text-emerald-950 border border-emerald-300 text-xs font-black self-start sm:self-auto">
              Scale: {budgetFeasibility.scale_classification} (₹{formatNum(budgetFeasibility.margin_capital)})
            </span>
          )}
        </div>

        {/* Purpose Note */}
        <p className="text-xs text-slate-600 font-medium">
          Visual four-quadrant analysis specific to <strong>{businessName}</strong> + <strong>{locationName}</strong> within a <strong>{radiusKm} km radius</strong>:
        </p>

        {/* 4 Quadrants Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Strengths */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-emerald-50/70 border border-emerald-300 border-b-[3.5px] border-b-emerald-400 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-950 font-black text-sm mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>🟢 Strengths (బలాలు)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 font-semibold">
              {swot.strengths?.slice(0, 4).map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-amber-50/70 border border-amber-300 border-b-[3.5px] border-b-amber-400 shadow-sm">
            <div className="flex items-center gap-2 text-amber-950 font-black text-sm mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>🟡 Weaknesses (బలహీనతలు)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 font-semibold">
              {swot.weaknesses?.slice(0, 4).map((w, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 shrink-0" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-teal-50/70 border border-teal-300 border-b-[3.5px] border-b-teal-400 shadow-sm">
            <div className="flex items-center gap-2 text-teal-950 font-black text-sm mb-3">
              <Lightbulb className="w-4 h-4 text-teal-700 shrink-0" />
              <span>🔵 Opportunities (అవకాశాలు)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 font-semibold">
              {swot.opportunities?.slice(0, 4).map((o, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-600 mt-1 shrink-0" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Threats */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-rose-50/70 border border-rose-300 border-b-[3.5px] border-b-rose-400 shadow-sm">
            <div className="flex items-center gap-2 text-rose-950 font-black text-sm mb-3">
              <ShieldAlert className="w-4 h-4 text-rose-700 shrink-0" />
              <span>🔴 Threats (సవాళ్లు & ముప్పులు)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 font-semibold">
              {swot.threats?.slice(0, 4).map((t, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-600 mt-1 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Budget Allocation Guide (if available) */}
        {budgetFeasibility && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50/70 via-teal-50/50 to-white border border-emerald-200/80 shadow-2xs space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-black text-slate-900">
              <span>Budget Allocation Feasibility Guide:</span>
              <span className="text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-md font-bold text-2xs">
                Working Capital Runway: {budgetFeasibility.working_capital_runway}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-400 block text-3xs uppercase font-extrabold">Equipment & Setup</span>
                <span className="text-slate-900 font-black text-sm font-mono">
                  {budgetFeasibility.recommended_allocation?.fixed_setup_equipment_pct}%
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-400 block text-3xs uppercase font-extrabold">Initial Stock</span>
                <span className="text-emerald-700 font-black text-sm font-mono">
                  {budgetFeasibility.recommended_allocation?.initial_inventory_stock_pct}%
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-400 block text-3xs uppercase font-extrabold">Operating Buffer</span>
                <span className="text-teal-700 font-black text-sm font-mono">
                  {budgetFeasibility.recommended_allocation?.working_capital_buffer_pct}%
                </span>
              </div>
            </div>
            <p className="text-2xs text-slate-600 font-medium pt-1">
              💡 {budgetFeasibility.capital_assessment}
            </p>
          </div>
        )}


      </section>

      {/* ========================================================================= */}
      {/* PHASE 4 — THREAT IDENTIFICATION                                           */}
      {/* ========================================================================= */}
      <section className="card-3d-surface p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center border border-rose-300 shrink-0 shadow-2xs">
              <ShieldAlert className="w-5 h-5 text-rose-700" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">4. Threat Identification</h3>
            </div>
          </div>
          <span className="badge-3d px-3 py-1 bg-rose-50 text-rose-900 border border-rose-300 text-xs font-black self-start sm:self-auto">
            Risk & Vulnerability Assessment
          </span>
        </div>

        {/* Purpose Question */}
        <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 text-xs font-bold text-rose-950 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-rose-700 shrink-0" />
          <span><strong>Purpose:</strong> Answers &quot;What could make this business difficult or risky here?&quot;</span>
        </div>

        {/* Separation: Verified Local Risks vs General Business Risks */}
        <div className="space-y-5">
          
          {/* Sub-section A: Verified Local Risks */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>📍 Verified Local Risk (Grounded in Location & Climatic Evidence)</span>
              </h4>
              <span className="badge-3d text-3xs font-black px-2 py-0.5 bg-emerald-100 text-emerald-950 border border-emerald-300">
                Data Backed
              </span>
            </div>

            {verifiedLocalThreats.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {verifiedLocalThreats.map((th, idx) => {
                  const badgeColor =
                    th.level === "High"
                      ? "bg-rose-100 text-rose-900 border-rose-300"
                      : th.level === "Medium"
                      ? "bg-amber-100 text-amber-900 border-amber-300"
                      : "bg-emerald-100 text-emerald-900 border-emerald-300";

                  return (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                          <AlertTriangle className={`w-3.5 h-3.5 ${th.level === 'High' ? 'text-rose-600' : 'text-amber-600'}`} />
                          <span>{th.title}</span>
                        </span>
                        <span className={`badge-3d text-3xs font-black px-2 py-0.5 border ${badgeColor}`}>
                          {th.level} Risk
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {th.reason}
                      </p>
                      {th.metric_label && (
                        <div className="text-3xs font-mono font-semibold text-slate-700 bg-white px-2 py-1 rounded border border-slate-200">
                          📊 {th.metric_label}
                        </div>
                      )}
                      <div className="pt-1 border-t border-slate-200/60 text-3xs font-bold text-emerald-800">
                        ✓ Verified Local Risk {th.data_source ? `(${th.data_source})` : ''}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>No acute local geographic or infrastructure risks detected within this {radiusKm} km radius.</span>
              </div>
            )}
          </div>

          {/* Sub-section B: General Business / Sector Risks */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-slate-500" />
                <span>🌐 General Business Risk (Sector Operating Context)</span>
              </h4>
              <span className="badge-3d text-3xs font-black px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-300">
                General Context
              </span>
            </div>

            {generalBusinessThreats.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {generalBusinessThreats.map((th, idx) => {
                  const badgeColor =
                    th.level === "High"
                      ? "bg-rose-100 text-rose-900 border-rose-300"
                      : th.level === "Medium"
                      ? "bg-amber-100 text-amber-900 border-amber-300"
                      : "bg-emerald-100 text-emerald-900 border-emerald-300";

                  return (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                          <AlertTriangle className={`w-3.5 h-3.5 ${th.level === 'High' ? 'text-rose-600' : 'text-amber-600'}`} />
                          <span>{th.title}</span>
                        </span>
                        <span className={`badge-3d text-3xs font-black px-2 py-0.5 border ${badgeColor}`}>
                          {th.level} Risk
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {th.reason}
                      </p>
                      <div className="pt-1 border-t border-slate-200/60 text-3xs font-semibold text-slate-500">
                        • General Business Risk (Sector baseline)
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium">
                No critical sector-level operational risks noted.
              </div>
            )}
          </div>

          {/* Climate & Weather Risk Snapshot (Open-Meteo) - Only shown if weather is relevant */}
          {isWeatherRelevant && weather && (
            <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2.5">
                <CloudRain className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-black text-slate-800">
                  Open-Meteo Weather Model Data: {weather.seasonal_risk || "Normal"} ({weather.avg_temp_c}°C avg)
                </span>
              </div>
              <span className="text-2xs text-slate-500 font-semibold">
                Source: {weather.source || "Open-Meteo Weather Forecast Model"}
              </span>
            </div>
          )}

        </div>


      </section>

      {/* ========================================================================= */}
      {/* PHASE 5 — COMPETITOR MAPPING                                              */}
      {/* ========================================================================= */}
      <section className="card-3d-surface p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center border border-rose-300 shrink-0 shadow-2xs">
              <Store className="w-5 h-5 text-rose-700" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">5. Competitor Mapping</h3>
            </div>
          </div>
          <span className="badge-3d px-3 py-1 bg-rose-50 text-rose-900 border border-rose-300 text-xs font-black self-start sm:self-auto">
            {comp.total_count} Verified Businesses Identified
          </span>
        </div>

        {/* Purpose Question */}
        <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 text-xs font-bold text-rose-950 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-rose-700 shrink-0" />
          <span><strong>Purpose:</strong> Answers &quot;Which businesses are already operating around this location?&quot;</span>
        </div>

        {/* Competitor Summary Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-3xs uppercase text-slate-500 font-bold block">Total Verified Competitors</span>
            <span className="text-lg sm:text-xl font-black text-rose-600 font-mono mt-0.5 block">
              {comp.total_count}
            </span>
            <span className="text-3xs text-slate-500 block">{comp.direct_count} Direct • {comp.indirect_count} Indirect</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-3xs uppercase text-slate-500 font-bold block">Nearest Competitor</span>
            <span className="text-lg sm:text-xl font-black text-slate-900 font-mono mt-0.5 block">
              {comp.nearest_competitor_km !== null && comp.nearest_competitor_km !== undefined
                ? `${comp.nearest_competitor_km.toFixed(1)} km`
                : "None in radius"}
            </span>
            <span className="text-3xs text-slate-500 block">Radial distance</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-3xs uppercase text-slate-500 font-bold block">Competition Density</span>
            <span className="text-lg sm:text-xl font-black text-slate-900 font-mono mt-0.5 block">
              {comp.competitor_density}
            </span>
            <span className="text-3xs text-slate-500 block">Units / km²</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-3xs uppercase text-slate-500 font-bold block">Analysis Radius</span>
            <span className="text-lg sm:text-xl font-black text-emerald-700 font-mono mt-0.5 block">
              {radiusKm} km
            </span>
            <span className="text-3xs text-slate-500 block">{reach?.area_sq_km} km² Catchment</span>
          </div>
        </div>


        {/* Unavailable Notice when total_count === 0 */}
        {comp.total_count === 0 && (
          <div className="p-4 rounded-xl bg-slate-100/90 border border-slate-300 text-slate-800 space-y-1.5">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="font-black text-sm text-slate-900">
                Verified competitor data is currently unavailable for this location.
              </span>
            </div>
            <p className="text-xs text-slate-600 pl-6 leading-relaxed">
              0 direct competitors were identified in verified digital open-data records within this {radiusKm} km radius. Unmapped informal village sellers, local street stalls, or weekly shandy traders may exist. We do NOT fabricate fake competitor names.
            </p>
            {onOpenContributeModal && (
              <div className="pl-6 pt-1">
                <button
                  onClick={onOpenContributeModal}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline cursor-pointer"
                >
                  Know an active business in this village? Add it via Community Contribution.
                </button>
              </div>
            )}
          </div>
        )}

        {/* Interactive Leaflet Map Visualization */}
        <div className="rounded-2xl overflow-hidden border border-slate-300 shadow-sm">
          <MapSection
            language={language}
            location={analysisResult.location}
            radiusKm={radiusKm}
            competitors={comp}
          />
        </div>

        {/* Verified Competitor Records Table */}
        {comp.total_count > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide">
                Verified Business Location Records ({comp.total_count})
              </h4>
              <button
                onClick={() => setShowCompetitorsTable(!showCompetitorsTable)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                <span>{showCompetitorsTable ? "Hide Table" : "Show Table"}</span>
                {showCompetitorsTable ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showCompetitorsTable && (
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100 text-3xs uppercase font-black text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="p-3 text-center w-12"># Pin</th>
                      <th className="p-3">Business Name</th>
                      <th className="p-3">Classification</th>
                      <th className="p-3">Exact Location / Area</th>
                      <th className="p-3">Distance (km)</th>
                      <th className="p-3">Coordinates (Lat, Lon)</th>
                      <th className="p-3">Data Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {[...comp.direct_competitors, ...comp.indirect_competitors].map((c, idx) => {
                      const isDirect = c.classification === 'direct';
                      const tag = isDirect
                        ? `D${idx + 1}`
                        : `I${idx - comp.direct_competitors.length + 1}`;
                      const exactLoc = resolveExactLocation(c, analysisResult.location);
                      return (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 text-center">
                            <span
                              className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-3xs font-black text-white shadow-2xs ${
                                isDirect ? 'bg-rose-600' : 'bg-amber-500'
                              }`}
                              title={`Map Marker ${tag}`}
                            >
                              {tag}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-slate-900">{c.name}</td>
                          <td className="p-3">
                            <span
                              className={`badge-3d text-3xs font-black px-2 py-0.5 border ${
                                isDirect
                                  ? 'bg-rose-50 text-rose-900 border-rose-300'
                                  : 'bg-amber-50 text-amber-900 border-amber-300'
                              }`}
                            >
                              {isDirect ? 'Direct Competitor' : 'Indirect Substitute'}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-slate-900 text-xs flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                              <span>{exactLoc.area}</span>
                            </div>
                            <div className="text-3xs text-slate-500 pl-4">{exactLoc.landmark}</div>
                          </td>
                          <td className="p-3 font-mono font-bold text-slate-800">{c.distance_km.toFixed(2)} km</td>
                          <td className="p-3 font-mono text-3xs text-slate-500">
                            <a
                              href={`https://www.openstreetmap.org/?mlat=${c.latitude}&mlon=${c.longitude}#map=16/${c.latitude}/${c.longitude}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-700 hover:text-emerald-900 hover:underline inline-flex items-center gap-0.5 font-semibold"
                              title="Click to view exact pinpoint on OpenStreetMap"
                            >
                              {c.latitude?.toFixed(4)}, {c.longitude?.toFixed(4)} ↗
                            </a>
                          </td>
                          <td className="p-3 text-3xs text-slate-500">{c.source || "OpenStreetMap"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}


      </section>

      {/* ========================================================================= */}
      {/* PHASE 6 — PRODUCT MARKET VALUE                                            */}
      {/* ========================================================================= */}
      <section className="card-3d-surface p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-300 shrink-0 shadow-2xs">
              <Tag className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">6. Product Market Value</h3>
            </div>
          </div>
          <span className="badge-3d px-3 py-1 bg-amber-50 text-amber-900 border border-amber-300 text-xs font-black self-start sm:self-auto">
            Pricing Strategy & Purchasing Power
          </span>
        </div>

        {/* Purpose Question */}
        <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs font-bold text-amber-950 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span><strong>Purpose:</strong> Answers &quot;What is the available market-price/value information for this business?&quot;</span>
        </div>

        {/* 6.1 Suggested Price Range Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50/80 via-white to-amber-50/60 border border-amber-300 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center border border-amber-300 shrink-0">
                <Tag className="w-4 h-4 text-amber-700" />
              </div>
              <div>
                <span className="text-3xs font-extrabold uppercase tracking-wider text-amber-800 block">
                  Current Observed Price Range
                </span>
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  {suggestedValuation?.is_calculable ? "Calculated Suggested Price Range" : "Market Benchmark Rates"}
                </h4>
              </div>
            </div>
            {suggestedValuation?.is_calculable && (
              <span className="badge-3d text-3xs font-black px-2.5 py-0.5 bg-emerald-100 text-emerald-950 border border-emerald-300 self-start sm:self-auto">
                🟢 Verified Data
              </span>
            )}
          </div>

          {suggestedValuation?.is_calculable && suggestedValuation.suggested_range ? (
            <div className="space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
                  {suggestedValuation.suggested_range}
                </span>
                <span className="text-xs font-bold text-slate-600">
                  (Benchmark: {suggestedValuation.item})
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-2xs pt-1">
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="font-extrabold text-slate-900 block mb-0.5">Methodology & Margin Calculation:</span>
                  <span className="text-slate-600 font-medium">{suggestedValuation.calculation_methodology}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="font-extrabold text-slate-900 block mb-0.5">Statutory Data Source:</span>
                  <span className="text-slate-600 font-medium">
                    {suggestedValuation.basis_source}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-amber-100/70 border border-amber-300 text-amber-950 space-y-1">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-black text-xs">
                  {suggestedValuation?.unavailable_reason ||
                    "Insufficient verified market-price data for this business category/location."}
                </span>
              </div>
              <p className="text-2xs text-amber-900/80 pl-6 leading-relaxed">
                We do not invent arbitrary product prices when verified AP mandi, APDDCF or government rate schedules are absent for this specific sub-category.
              </p>
            </div>
          )}
        </div>

        {/* 6.2 Suggested Pricing Strategy & Purchasing Power */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wide">
                Suggested Pricing Strategy
              </span>
              <span className={`badge-3d text-2xs font-black px-2.5 py-0.5 border ${pricingStrategyBadge}`}>
                {pricingStrategyTitle}
              </span>
            </div>
            <p className="text-xs text-slate-700 font-semibold leading-relaxed">
              {pricingStrategyBasis}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wide">
                Local Purchasing Power Context
              </span>
              <span className="badge-3d text-2xs font-black px-2.5 py-0.5 bg-teal-50 text-teal-900 border border-teal-300">
                {analysisResult.location.district || "AP"} District Catchment
              </span>
            </div>
            <p className="text-xs text-slate-700 font-semibold leading-relaxed">
              <span className="text-slate-900 font-black">
                {reach?.census_baseline?.rural_population_pct && reach.census_baseline.rural_population_pct > 60
                  ? "Rural Agrarian / Steady Harvest Cash Flow"
                  : "Semi-Urban / Mixed Commercial Cash Flow"}
              </span>.
              Consumer willingness-to-pay is aligned with daily staple commodities and government benchmarked wage levels.
            </p>
          </div>
        </div>

        {/* 6.3 Reference Daily Labour Wages (Directorate of Economics & Statistics AP) */}
        {operatingCosts && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50/70 via-white to-emerald-50/70 border border-teal-200 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
              <span className="font-black text-slate-900">
                Official Rural Labour Wage Benchmarks (DES AP, 2023-24)
              </span>
              <span className="text-3xs text-teal-800 font-bold bg-teal-100/80 px-2.5 py-0.5 rounded-full">
                Operating Cost Baseline
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-3xs text-slate-500 uppercase font-bold block">Non-Agri Labour</span>
                <span className="font-mono font-black text-slate-900 text-sm">
                  {operatingCosts.non_agri_labour_daily_rs != null
                    ? `₹${operatingCosts.non_agri_labour_daily_rs} / day`
                    : "Official record unavailable"}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-3xs text-slate-500 uppercase font-bold block">Semi-Skilled Helper</span>
                <span className="font-mono font-black text-slate-900 text-sm">
                  {operatingCosts.semi_skilled_helper_daily_rs != null
                    ? `₹${operatingCosts.semi_skilled_helper_daily_rs} / day`
                    : "Official record unavailable"}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-3xs text-slate-500 uppercase font-bold block">Agri Labour (Male)</span>
                <span className="font-mono font-black text-slate-900 text-sm">
                  {operatingCosts.agri_labour_male_daily_rs != null
                    ? `₹${operatingCosts.agri_labour_male_daily_rs} / day`
                    : "Official record unavailable"}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-3xs text-slate-500 uppercase font-bold block">2-Worker Monthly Ref</span>
                <span className="font-mono font-black text-emerald-800 text-sm">
                  {operatingCosts.monthly_ref_labour_cost_2workers_rs != null
                    ? `~₹${formatNum(operatingCosts.monthly_ref_labour_cost_2workers_rs)} / mo`
                    : "Official record unavailable"}
                </span>
              </div>
            </div>
            <p className="text-2xs text-slate-500 font-medium">
              💡 {operatingCosts.cost_context_note}
            </p>
          </div>
        )}

        {/* 6.4 Sector-Specific Market Price Indicators (Dynamically Selected) */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide">
            Relevant Official AP Market Price Benchmarks ({isAgri ? 'APMC Mandis' : isDairy ? 'APDDCF & Animal Husbandry' : isFisheries ? 'AP Fisheries' : 'DES & Local Market Yard'})
          </h4>

          {prices && prices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {prices.map((p, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-black text-slate-900 block">{p.item}</span>
                    <span className="text-3xs text-slate-500 font-semibold block mt-0.5">
                      {p.source} • {p.year || "2024-25"}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-black text-emerald-700 font-mono block">{p.price}</span>
                    <span className="badge-3d text-3xs font-extrabold px-1.5 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-300">
                      {p.status || "Observed"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
              Insufficient verified market-price data for this business category/location.
            </div>
          )}
        </div>


      </section>

      {/* ========================================================================= */}
      {/* 🎯 FINAL BUSINESS ADVICE                                                   */}
      {/* ========================================================================= */}
      <section className="card-3d-surface p-6 sm:p-8 shadow-xl border border-slate-300 space-y-5 bg-gradient-to-r from-white via-slate-50 to-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-3xs font-black uppercase tracking-widest text-emerald-700">Synthesized Conclusion</span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">🎯 Final Business Advice</h3>
            </div>
          </div>
          
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-500">Recommendation:</span>
            <span className={`badge-3d px-3.5 py-1 text-xs font-black border ${finalRecommendationBadge}`}>
              {finalRecommendation}
            </span>
          </div>
        </div>

        {/* 2–3 Concise Takeaway Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {advicePoints.map((pt, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <span className="text-3xs font-extrabold uppercase text-slate-400 block tracking-wider">
                {pt.label}
              </span>
              <p className="text-xs font-bold text-slate-800 leading-relaxed">
                {pt.text}
              </p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
          <div>
            <p className="text-xs text-slate-600 font-medium">
              Based on empirical evidence across all 6 feasibility analysis phases for <strong className="text-slate-800">{locationName}</strong>.
            </p>
            <p className="text-3xs text-emerald-800 font-bold mt-0.5">
              Next Stage: Financial Structuring under SIH 2026 Schemes (Micro Finance / Term Loan) using these feasibility findings.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onModifySearch}
              className="btn-3d-secondary w-full sm:w-auto text-xs py-2.5 px-4 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.modifySearchBtn || "Modify Search"}</span>
            </button>

            {onProceedToModule2 && (
              <button
                onClick={onProceedToModule2}
                className="w-full sm:w-auto text-xs sm:text-sm py-2.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 active:from-emerald-800 active:to-teal-900 text-white font-black flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all"
              >
                <span>
                  {language === 'te'
                    ? 'ఫైనాన్షియల్ స్ట్రక్చరింగ్‌కు వెళ్లండి'
                    : language === 'hi'
                    ? 'वित्तीय संरचना पर आगे बढ़ें'
                    : 'Proceed to Financial Structuring'}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            )}
          </div>
        </div>
      </section>


    </div>
  );
};
